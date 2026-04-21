import {login,register} from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import * as authServices from "../services/auth.service.js";
import express from "express";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", verifyToken, async (req, res) => {
    try {
        const user = await authServices.findUserByEmail(req.user.email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ 
            user: { 
                id: user.id, 
                username: user.username, 
                email: user.email 
            } 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;