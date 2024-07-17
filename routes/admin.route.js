import { Router } from "express";
import AdminsController from "../controller/admin.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

import { body } from "express-validator";
const route = Router();
const validateUser = [
    body("email")
        .isEmail()
        .withMessage("Please enter a valid email address"),
    body("password")
        .isLength({ min: 5 })
        .withMessage("Please enter a valid password"),
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

// @desc Get users
// @route GET '/api/admin/user'
// @access Private
route.get("/admin/user", authMiddleware, adminMiddleware, AdminsController.getUsers);

// @desc Get user
// @route GET '/api/admin/user/:id'
// @access Private
route.get("/admin/user/:id", authMiddleware, adminMiddleware, AdminsController.getUser);

// @desc Add users
// @route Post '/api/admin'
// @access Public
route.post("/admin/user", validateUser, authMiddleware, adminMiddleware, AdminsController.addUser);

// @desc Delete Users
// @route Post '/api/admin/user'
// @access Public
route.delete("/admin/user", validateEmail, authMiddleware, adminMiddleware, AdminsController.deleteUser);

// // @desc Login
// // @route Post '/api/login'
// // @access Only users
// route.post("/logout", authMiddleware, UserController.logout);

export default route;
