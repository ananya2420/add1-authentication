import { connectToDatabase } from "../../../lib/db";  
import nodemailer from "nodemailer";  
import crypto from "crypto";  

async function handler(req, res) {
  console.log("Received request:", req.body);  // Log the incoming request data

  if (req.method === "POST") {
    const { email, username } = req.body;

    // Input validation
    if (!email || !email.includes('@') || !username || username.trim().length < 3) {
      console.log("Invalid input:", { email, username });
      return res.status(422).json({
        message: "Invalid input. Please make sure the email and username are correct."
      });
    }

    try {
      const client = await connectToDatabase();
      const db = client.db();

      // Log database connection success
      console.log("Connected to database");

      // Check if the user exists in the database
      const existingUser = await db.collection("users").findOne({ email: email, username: username });
      if (!existingUser) {
        console.log("User not found in database:", { email, username });
        client.close();
        return res.status(404).json({ message: "User not found!" });
      }

      // Generate password reset token
      const resetToken = crypto.randomBytes(32).toString("hex");

      // Store the reset token in the database
      await db.collection("users").updateOne(
        { email: email, username: username },
        { $set: { resetToken: resetToken, resetTokenExpiration: Date.now() + 3600000 } }
      );
      client.close();

      // Create the reset link
      const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

      // Send reset link via email
      const transporter = nodemailer.createTransport({
        service: "gmail",  
        auth: {
          user: process.env.EMAIL_USER,  
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset Request",
        text: `You have requested a password reset. Please click the following link to reset your password: ${resetLink}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Failed to send email:", error);
          return res.status(500).json({ message: "Failed to send the email. Please try again later." });
        } else {
          console.log("Email sent successfully:", info);
          return res.status(200).json({ message: "✅ Password reset link sent! Check your email." });
        }
      });

    } catch (error) {
      console.error("Unexpected error:", error);
      return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
  } else {
    console.log("Method not allowed:", req.method);
    return res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler;
