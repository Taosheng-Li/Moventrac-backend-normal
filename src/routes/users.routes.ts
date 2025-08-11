import { Router } from "express";
import { getUserProfile } from "../api/users";

const router = Router();

router.get("/:username", getUserProfile);

export default router;
