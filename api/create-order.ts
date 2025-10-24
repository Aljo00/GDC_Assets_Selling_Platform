// File: api/create-order.ts

// 1. Import 'Cashfree' and also the 'Environment' enum
import { Cashfree, CFEnvironment as Environment } from "cashfree-pg";
import { createClient } from "@supabase/supabase-js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

// Helper to create Cashfree instance at request-time and validate shape
// Note: For v5 SDK we need to set both static and instance properties
function createCashfreeClient() {
  const appId = process.env.CASHFREE_APP_ID;
  const secret = process.env.CASHFREE_SECRET_KEY;
  // Default to latest API version if not specified
  const apiVersion = process.env.CASHFREE_API_VERSION || "2023-08-01";

  console.log("Cashfree env vars present:", {
    CASHFREE_APP_ID: !!appId,
    CASHFREE_SECRET_KEY: !!secret,
    CASHFREE_API_VERSION: apiVersion,
  });

  if (!appId || !secret) {
    console.error(
      "Missing Cashfree credentials. Ensure CASHFREE_APP_ID and CASHFREE_SECRET_KEY are set."
    );
    return null;
  }

  try {
    // Set static properties first (v5 SDK needs these)
    (Cashfree as any).XClientId = appId;
    (Cashfree as any).XClientSecret = secret;
    (Cashfree as any).XEnvironment = Environment.SANDBOX;
    (Cashfree as any).XAPIVersion = apiVersion;

    // Create instance (some SDK versions need both)
    const cf = new Cashfree(Environment.SANDBOX, appId, secret, apiVersion);

    // Log initialization details (no secrets)
    console.log("Cashfree client initialized:", {
      hasStaticProps:
        !!(Cashfree as any).XClientId && !!(Cashfree as any).XClientSecret,
      apiVersion,
      environment: "SANDBOX",
    });

    return cf;
  } catch (err) {
    console.error("Error constructing Cashfree client:", err);
    return null;
  }
}

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

    // 3. Create and validate the Cashfree server client and call the API
    const cashfree = createCashfreeClient();
    if (!cashfree) {
      console.error("Cashfree client not initialized (null)");
      return res
        .status(500)
        .json({ error: "Cashfree client not initialized on server" });
    }

    // Try creating order using the cashfree instance directly
    let response;

    try {
      console.log("Attempting order creation via instance...");

      // Let's see what methods are available on the instance
      console.log("Available methods on Cashfree instance:", {
        hasCreateOrder: typeof (cashfree as any).createOrder === "function",
        hasOrders: typeof (cashfree as any).orders === "object",
        properties: Object.keys(cashfree || {}),
      });

      // First try direct createOrder method
      if (typeof (cashfree as any).createOrder === "function") {
        response = await (cashfree as any).createOrder(orderRequest);
      }
      // Then try orders.create
      else if ((cashfree as any).orders?.create) {
        response = await (cashfree as any).orders.create(orderRequest);
      }
      // Finally try order API
      else if ((cashfree as any).order) {
        const method = (cashfree as any).order;
        if (typeof method === "function") {
          response = await method(orderRequest);
        } else if (method.create) {
          response = await method.create(orderRequest);
        }
      } else {
        throw new Error(
          "No order creation method found on Cashfree instance. Available methods: " +
            Object.keys(cashfree || {}).join(", ")
        );
      }
    } catch (err: any) {
      // Log full error details for debugging
      console.error("Cashfree order creation failed:", {
        message: err.message,
        response: err.response?.data,
        code: err.code,
        stack: err.stack,
        availableMethods: Object.keys(cashfree || {}),
      });

      // Return a safe error message to the client
      return res.status(500).json({
        error: "Cashfree order creation failed",
        details: err.response?.data?.message || err.message,
      });
    }

    const orderData = response?.data;
    console.log("Cashfree order response:", {
      status: orderData?.order_status || orderData?.status,
      hasSessionId: !!orderData?.payment_session_id,
    });

    // Some SDK responses may return order_status or status; account for both
    const status = orderData?.order_status || orderData?.status;
    if (status !== "ACTIVE" && status !== "CREATED") {
      console.error(
        "Unexpected order status from Cashfree:",
        status,
        orderData
      );
      return res.status(500).json({
        error: "Cashfree order creation failed",
        details: `Unexpected order status: ${status}`,
      });
    }

    // === "PROCEED" STEP (Part 1) ===
    // Send the session ID to the frontend
    res.status(200).json({ payment_session_id: orderData.payment_session_id });
  } catch (error: any) {
    console.error("Handler error:", error.response?.data || error.message);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
