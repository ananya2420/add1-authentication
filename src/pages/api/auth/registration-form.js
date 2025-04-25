import { connectToDatabase } from "../../../lib/db";  // Make sure this is where your DB connection logic is defined
import { hashPassword } from "../../../lib/auth";     // Utility for hashing passwords

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Input validation
    if (!email || !email.includes('@') || !password || password.trim().length < 7) {
      return res.status(422).json({
        message: "Invalid input. Please make sure the email is correct and the password is at least 7 characters long."
      });
    }

    try {
      const client = await connectToDatabase();  // Connect to the database
      const db = client.db();                    // Get the DB instance

      // Check if the user already exists in the database
      const existingUser = await db.collection("users").findOne({ email: email });

      if (existingUser) {
        client.close();  // Close the connection
        return res.status(422).json({ message: "User already exists!" });
      }

      // Hash the password
      const hashedPassword = await hashPassword(password);

      // Insert new user into the database
      const result = await db.collection("users").insertOne({
        email: email,
        password: hashedPassword,
      });

      client.close();  // Close the connection

      // Respond with success
      return res.status(201).json({ message: "User created successfully!" });

    } catch (error) {
      console.error("Database connection error:", error);
      return res.status(500).json({ message: "Something went wrong! Please try again." });
    }
  } else {
    // Method not allowed for anything other than POST
    return res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler;