import { Router } from "express";
import { createPerformance, getPerformancesByUsername } from "../api/performances";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Apply the authMiddleware to this route.
// Now, a user must be logged in (and provide a valid token) to post a performance.
router.post("/", authMiddleware, createPerformance);

// Add the new route to get performances by username.
// This is also protected to ensure a user can only fetch their own data.
// A check inside the handler could further refine this to ensure req.user.username matches req.params.username
router.get("/:username", authMiddleware, getPerformancesByUsername);


export default router;
