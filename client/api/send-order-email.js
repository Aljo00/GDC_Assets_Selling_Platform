import { Resend } from "resend";

// Initialize Resend with API key from environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

// Google Drive folder link for digital assets
const DRIVE_FOLDER_URL =
  "https://drive.google.com/drive/folders/15r3V4BvTqdC6WfQLtLGkEeZzGA8rpCHG";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { order } = req.body;

    if (!order || !order.email || order.payment_status !== "PAID") {
      return res.status(400).json({
        error: "Invalid request. Required: order with email and PAID status",
      });
    }

    // Format the date nicely
    const orderDate = new Date(order.created_at).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "GDC Assets <orders@gdc-assets.com>", // Update this with your verified domain
      to: [order.email],
      subject: "Your GDC Assets Purchase - Access Link Inside! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1E1E1E; text-align: center; margin-bottom: 30px;">
            Thank You for Your Purchase! 🎉
          </h1>

          <div style="background-color: #f9f9f9; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
            <h2 style="color: #FFC700; margin-top: 0;">Order Details</h2>
            <p><strong>Order ID:</strong> ${order.order_id}</p>
            <p><strong>Amount:</strong> ₹${order.amount}</p>
            <p><strong>Date:</strong> ${orderDate}</p>
          </div>

          <div style="background-color: #1E1E1E; color: white; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
            <h2 style="color: #FFC700; margin-top: 0;">Access Your Digital Assets</h2>
            <p>Your digital assets are ready for download! Click the button below to access your purchased content:</p>
            <a href="${DRIVE_FOLDER_URL}" 
               style="display: inline-block; background-color: #FFC700; color: #1E1E1E; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; margin-top: 15px;">
              Access Digital Assets
            </a>
          </div>

          <div style="border-top: 2px solid #eee; padding-top: 20px; margin-top: 30px; color: #666; font-size: 14px;">
            <p><strong>Important:</strong> Keep this email safe as it contains your access link.</p>
            <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Email send error:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }

    return res.status(200).json({
      message: "Order confirmation email sent successfully",
      emailId: data.id,
    });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
