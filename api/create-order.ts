// File: api/create-order.ts

// 1. Import 'Cashfree' and also the 'Environment' enum
import { Cashfree, CFEnvironment as Environment } from "cashfree-pg";
import { createClient } from "@supabase/supabase-js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

// 2. Initialize the Cashfree client by creating a NEW INSTANCE
// This is the main fix.
// Note: constructor expects (environment, appId, secretKey, apiVersion)
const cashfree = new Cashfree(
  Environment.SANDBOX, // Use the imported Environment enum (CFEnvironment)
  process.env.CASHFREE_APP_ID!,
  process.env.CASHFREE_SECRET_KEY!,
  process.env.CASHFREE_API_VERSION!,
);

// Init Supabase with the secure SERVICE KEY
const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, email, phone, address } = req.body;
    const amount = 1499; // The price from your Pricing.tsx
    const orderId = `GDC_ORDER_${Date.now()}`;

    // === "STORE" STEP ===
    // Save customer details to Supabase
    const { data: orderRecord, error: supabaseError } = await supabase
      .from("orders")
      .insert({
        order_id: orderId,
        name: name,
        email: email,
        phone: phone,
        address: address,
        amount: amount,
        payment_status: "PENDING",
      })
      .select()
      .single();

    if (supabaseError) {
      console.error("Supabase error:", supabaseError);
      return res.status(500).json({ error: "Failed to create order record" });
    }

    // === "TRANSFER" STEP ===
    // Create the Cashfree order request
    const orderRequest = {
      order_id: orderId,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: orderRecord.id.toString(), // Use the unique ID from Supabase
        customer_email: email,
        customer_phone: phone,
        customer_name: name,
      },
      order_meta: {
        // MUST update with your Vercel URL
        return_url: `https://assets.gomdigitalconsultancy.com/payment-status?order_id={order_id}`,
      },
      order_note: "0 to 50K YouTube Blueprint",
    };

    // 3. Use the 'cashfree' (lowercase) instance to call the API
    //    and use 'pg.orders.create' (lowercase)
    const response = await (cashfree as any).pg.orders.create(orderRequest);
    const orderData = response.data;

    if (orderData.order_status !== "ACTIVE") {
      throw new Error("Cashfree order creation failed");
    }

    // === "PROCEED" STEP (Part 1) ===
    // Send the session ID to the frontend
    res.status(200).json({ payment_session_id: orderData.payment_session_id });
  } catch (error: any) {
    console.error("Handler error:", error.response?.data || error.message);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
