import AdminServices from '../services/admins.services.js';
import {validationResult} from "express-validator";
import adminsServices from "../services/admins.services.js";


class AdminController {
  async welcome(req, res) {
    try {
      // const DataCookies = jwt.decode(req.cookies.accessToken, process.env.JWT_ACCES_SECRET);
      // // let  user = await userServices.registeration(email, password);
      res.status(200).json({status : "ok", code : 200, message : "You are welcome!"});
    }catch (e) {
      return res.status(400).json({status : "ok", code : 400, message: e.message});
    }
  }

  // Get users
  async getUsers(req, res) {
    try {
      const  users = await AdminServices.getUsers();
      res.status(users.code).json(users);
    }catch (e) {
      return res.status(400).json({code : 400, type : "error", message: e.message});
    }
  }

  // Get user
  async getUser(req, res) {
    try {
      const id = req.params.id;
      const users = await AdminServices.getUser(id);
      res.status(users.code).json(users);
    }catch (e) {
      return res.status(400).json({code : 400, type : "error", message: e.message});
    }
  }

  // Add user
  async addUser(req, res) {
    try {
      const {email, password, role} = req.body;
      const  errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({code : 400, message: errors.array()});
      }

      const  users = await AdminServices.addUser(email, password, role);
      res.status(users.code).json(users);
    }catch (e) {
      return res.status(400).json({code : 400, type : "error", message: e.message});
    }
  }

  async deleteUser(req, res) {
    try {
      const {email} = req.body;

      const  errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({code : 400, message: errors.array()});
      }

      const deleteUserData = await adminsServices.delUser(email)
      res.status(deleteUserData.code).json(deleteUserData);
    }catch (e) {
      return res.status(400).json({code : 400, type : "error", message: e.message});
    }
  }
}

export default new AdminController();
