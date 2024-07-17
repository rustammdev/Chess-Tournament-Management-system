import { Router } from "express";
import AdminsController from "../controller/admin.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

import { body } from "express-validator";
const route = Router();
const validatePlayer = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required'),

    body('age')
        .isInt({ min: 0 })
        .withMessage('Age must be a non-negative integer')
        .notEmpty()
        .withMessage('Age is required'),

    body('rating')
        .isFloat({ min: 0, max: 3000 })
        .withMessage('Rating must be a number between 0 and 3000')
        .notEmpty()
        .withMessage('Rating is required'),

    body('country')
        .isString()
        .withMessage('Country must be a string')
        .notEmpty()
        .withMessage('Country is required')
];

const validateEmail = [
    body("email")
        .isEmail()
        .withMessage("Please enter a valid email address"),
];

// @desc Welcome
// @route GET '/api/admin'
// @access Private
route.get("/admin", authMiddleware, adminMiddleware, AdminsController.welcome);

// @desc Get players
// @route GET '/api/admin/user'
// @access Private
route.get("/admin/players", authMiddleware, adminMiddleware, AdminsController.getPlayers);

// @desc Get player
// @route GET '/api/admin/player/:id'
// @access Private
route.get("/admin/player/:id", authMiddleware, adminMiddleware, AdminsController.getPlayer);

// @desc Add players
// @route Post '/api/admin/player'
// @access Public
route.post("/admin/player", validatePlayer, authMiddleware, adminMiddleware, AdminsController.addPlayer);

// @desc Delete Users
// @route Post '/api/admin/player'
// @access Public
route.delete("/admin/player", validateEmail, authMiddleware, adminMiddleware, AdminsController.deletePlayer);

// @desc Update Player
// @route Post '/api/admin/player'
// @access Only users
route.put("/admin/player/:id", authMiddleware, adminMiddleware, AdminsController.updateUser);

export default route;
