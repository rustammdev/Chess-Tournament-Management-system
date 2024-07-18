import { Router } from "express";
import AdminsController from "../controller/admin.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import { validatePlayer, validateEmail, validateTournament, validateParticipants} from "../validations/validations.js"
const route = Router();

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
    // @access Private
    .post("/players", validatePlayer(), authMiddleware, adminMiddleware, AdminsController.addPlayer)
    // @desc Update Player
    // @route Post '/api/admin/player'
    // @access Only users
    .put("/players/:id", authMiddleware, adminMiddleware, AdminsController.updateUser)
    // @desc Delete Users
    // @route Post '/api/admin/player'
    // @access Private
    .delete("/players", validateEmail(), authMiddleware, adminMiddleware, AdminsController.deletePlayer);


// Tournaments
route
    // @desc Create Tournament
    // @route Post '/api/admin/tournaments'
    // @access Private
    .post("/tournaments", validateTournament(), authMiddleware, adminMiddleware, AdminsController.createTournament)
    // @desc Add players exist Tournament
    // @route Post '/api/admin/tournaments/:id'
    // @access Private
    .put("/tournaments/:id", validateParticipants(), authMiddleware, adminMiddleware, AdminsController.addPlayerTournament)


export default route;
