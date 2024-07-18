import { Router } from "express";
const route = Router();

// middleware
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

// controller
import tournamentController from "../controller/tournament.controller.js";

route
    // @desc Round Create
    // @route POST '/api/round/:id'
    // @access Private, only admins
    .post("/round/:id", authMiddleware, adminMiddleware, tournamentController.CreateRound);

route
    // @desc Match Create
    // @route POST '/api/match/:id'
    // @access Private, only admins
    .post("/match/:id", authMiddleware, adminMiddleware, tournamentController.CreateMatch)
    // @desc Liderboard
    // @route GET '/api/match/liderboard/:id'
    // @access Private, only admins
    .get('/match/liderboard/:id', authMiddleware, adminMiddleware, tournamentController.liderboard)


export default route;