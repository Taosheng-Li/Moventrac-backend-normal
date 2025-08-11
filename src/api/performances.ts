import { Request, Response } from "express";
import { Collection } from "mongodb";
import { getDb } from "../config/db";
import { ExercisePerformance } from "../models/performance.model";

export const createPerformance = async (req: Request, res: Response) => {
  try {
    // The auth middleware should have attached the user payload to the request.
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated. No user data found." });
    }

    const { username } = req.user;
    const performanceBody = req.body;

    if (
      !performanceBody ||
      !performanceBody.name ||
      !performanceBody.date ||
      performanceBody.repetitions == null
    ) {
      return res.status(400).json({
        error:
          "Invalid performance data. Name, date, and repetitions are required.",
      });
    }

    const db = getDb();
    const performancesCollection: Collection<ExercisePerformance> =
      db.collection("exercise_performances");

    // Combine user data with performance data
    const performanceData: ExercisePerformance = {
      username: username,
      ...performanceBody
    };

    console.log("Received new performance data for user:", performanceData);

    const result = await performancesCollection.insertOne(performanceData);

    res.status(201).json({
      message: "Performance saved successfully!",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Failed to save performance:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

// Get all performances for a specific user
export const getPerformancesByUsername = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const db = getDb();
        const performancesCollection: Collection<ExercisePerformance> =
            db.collection("exercise_performances");

        const performances = await performancesCollection.find({ username }).sort({ date: -1 }).toArray();

        res.status(200).json(performances);

    } catch (error) {
        console.error("Failed to get performances:", error);
        res.status(500).json({ error: "An internal server error occurred." });
    }
};
