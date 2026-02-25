import express from "express";
import * as userController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { sendEmail } from "../utils/mailer.js";
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/profile", authMiddleware, userController.getProfile);
router.put("/profile", authMiddleware, userController.updateProfile);
router.get("/dashboard", authMiddleware, userController.getProfileWithOrders);
router.post("/contact-us", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 🔒 Basic Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 📧 Send email to Admin
    await sendEmail({
      emailTo: process.env.SMTP_USER, // Admin email (your Gmail)
      subject: "New Contact Form Submission - Thekacustomz",
      htmlTemplate: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> {{name}}</p>
          <p><strong>Email:</strong> {{email}}</p>
          <p><strong>Message:</strong></p>
          <div style="background:#f4f4f4;padding:10px;border-radius:5px;">
            {{message}}
          </div>
        </div>
      `,
      variables: {
        name,
        email,
        message,
      },
    });

    // 📩 Send confirmation email to user
    await sendEmail({
      emailTo: email,
      subject: "We Received Your Message - Thekacustomz",
      htmlTemplate: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Hello {{name}},</h2>
          <p>Thank you for contacting Thekacustomz ❤️</p>
          <p>We have received your message and will get back to you shortly.</p>
          <br/>
          <p><strong>Your Message:</strong></p>
          <div style="background:#f4f4f4;padding:10px;border-radius:5px;">
            {{message}}
          </div>
          <br/>
          <p>Best Regards,</p>
          <p><strong>Thekacustomz Team</strong></p>
        </div>
      `,
      variables: {
        name,
        message,
      },
    });

    return res.status(200).json({
      message: "Message sent successfully",
      success: true,
    });

  } catch (error) {
    console.error("Contact route error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
});
export default router;