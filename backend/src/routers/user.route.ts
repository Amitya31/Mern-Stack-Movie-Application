import { Router } from "express";
import { Register, Login } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/auth/register", Register);
router.post("/auth/login", Login);

router.get("/auth/me", authMiddleware, (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});

export default router;
