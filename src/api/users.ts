import { Request, Response } from "express";
import { getDb } from "../config/db";
import { User } from "../models/user.model";
import { Collection } from "mongodb";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const db = getDb();
    const usersCollection: Collection<User> = db.collection("users");

    const user = await usersCollection.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Return only public user data, NEVER return the password hash
    const publicProfile = {
      _id: user._id,
      username: user.username,
      name: user.name,
      createdAt: user.createdAt,
    };

    res.status(200).json(publicProfile);

  } catch (error) {
    console.error("Failed to get user profile:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};
