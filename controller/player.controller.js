import AdminServices from '../services/admins.services.js';
import {validationResult} from "express-validator";
import adminsServices from "../services/admins.services.js";


class AdminController {


    // Get users
    async getUsers(req, res) {
        try {
            const  users = await AdminServices.getUsers();
            res.status(users.code).json(users);
        }catch (e) {
            return res.status(400).json({code : 400, type : "error", message: e.message});
        }
    }




}

export default new AdminController();
