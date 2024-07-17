import { Router } from "express";
import AdminsController from "../controller/admin.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import mongoose from "mongoose";
import Player from "../models/player.model.js";

import { body } from "express-validator";
const route = Router();

// validations
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
const validateTournament = [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isString()
        .withMessage("Name must be a string"),
    body("startDate")
        .notEmpty()
        .withMessage("Start date is required")
        .isISO8601()
        .withMessage("Start date must be a valid date"),
    body("endDate")
        .notEmpty()
        .withMessage("End date is required")
        .isISO8601()
        .withMessage("End date must be a valid date"),
    body("participants")
        .isArray()
        .withMessage("Participants must be an array")
        .custom(async (participants) => {
            for (let id of participants) {
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    throw new Error("Invalid participant ID format");
                }
                const player = await Player.findById(id);
                if (!player) {
                    throw new Error(`Participant with ID ${id} does not exist`);
                }
            }
            return true;
        }),
];


route
    // @desc Welcome
    // @route GET '/api/admin'
    // @access Private
    .get("/", authMiddleware, adminMiddleware, AdminsController.welcome)
    // @desc Get players
    // @route GET '/api/admin/user'
    // @access Private
    // route
    .get("/players", authMiddleware, adminMiddleware, AdminsController.getPlayers)
    // @desc Get player
    // @route GET '/api/admin/player/:id'
    // @access Private
    .get("/players/:id", authMiddleware, adminMiddleware, AdminsController.getPlayer)
    // @desc Add players
    // @route Post '/api/admin/player'
    // @access Public
    .post("/players", validatePlayer, authMiddleware, adminMiddleware, AdminsController.addPlayer)
    // @desc Update Player
    // @route Post '/api/admin/player'
    // @access Only users
    .put("/players/:id", authMiddleware, adminMiddleware, AdminsController.updateUser)
    // @desc Delete Users
    // @route Post '/api/admin/player'
    // @access Public
    .delete("/players", validateEmail, authMiddleware, adminMiddleware, AdminsController.deletePlayer);

route
    // @desc Add players
    // @route Post '/api/admin/tournaments'
    // @access Public
    .post("/tournaments", validateTournament, authMiddleware, adminMiddleware, AdminsController.createTournament)


export default route;
