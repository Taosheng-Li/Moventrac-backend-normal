import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToServer } from "./config/db";
import performancesRouter from "./routes/performances.routes";
import authRouter from "./routes/auth.routes";
import usersRouter from "./routes/users.routes"; // Import the new users router

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(cors());
app.use(express.json());

// Connect to the database and then start the server
connectToServer().then(() => {
  // Define API routes
  app.use("/api/auth", authRouter);
  app.use("/api/users", usersRouter); // Use the users router
  app.use("/api/performances", performancesRouter);

  // Health check route
  app.get("/api", (req: Request, res: Response) => {
    res.status(200).json({ message: "Welcome to the Moventrac API!" });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(error => {
    console.error("Failed to start server due to database connection error:", error);
    process.exit(1);
});