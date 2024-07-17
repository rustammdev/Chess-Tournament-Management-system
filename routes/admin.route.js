import { Router } from "express";
import AdminsController from "../controller/admin.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

import { body } from "express-validator";
const route = Router();

// @desc Welcome
// @route GET '/api/admin'
// @access Private
route.get("/admin", authMiddleware, adminMiddleware, AdminsController.welcome);

const validateUser = [
    body("email")
        .isEmail()
        .withMessage("Please enter a valid email address"),
    body("password")
        .isLength({ min: 5 })
        .withMessage("Please enter a valid password"),
];
// @desc Get users
// @route GET '/api/admin/user'
// @access Private
route.get("/admin/user", validateUser, authMiddleware, adminMiddleware, AdminsController.getUsers);



// @desc Login
// @route Post '/api/register'
// @access Public
route.post("/admin/user", validateUser, authMiddleware, adminMiddleware, AdminsController.addUser);

// // @desc Login
// // @route Post '/api/login'
// // @access Public
// route.post("/login", validateUser, UserController.login);

// // @desc Login
// // @route Post '/api/login'
// // @access Only users
// route.post("/logout", authMiddleware, UserController.logout);

export default route;
