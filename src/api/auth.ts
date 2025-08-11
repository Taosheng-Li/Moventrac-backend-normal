import { Request, Response } from "express";
import { getDb } from "../config/db";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Collection } from "mongodb";

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// User Registration
export const register = async (req: Request, res: Response) => {
  try {
    const { username, name, email, password } = req.body;

    if (!username || !name || !email || !password) {
      return res.status(400).json({ error: "Username, name, email and password are required." });
    }

    const db = getDb();
    const usersCollection: Collection<User> = db.collection("users");

    // Check if username or email already exists
    const existingUser = await usersCollection.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ error: "User with this email or username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const newUser: User = {
      username,
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    await usersCollection.insertOne(newUser);

    // Respond in a format that matches ServiceResponseData (token is null on register)
    res.status(201).json({
      message: "User registered successfully!",
      token: null,
    });
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

// User Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const db = getDb();
    const usersCollection: Collection<User> = db.collection("users");

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." }); // User not found
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid credentials." }); // Password incorrect
    }

    // Generate JWT, now including username
    const token = jwt.sign(
      { userId: user._id, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Respond in a format that matches ServiceResponseData
    res.status(200).json({
        message: "Login successful!",
        token 
    });

  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};