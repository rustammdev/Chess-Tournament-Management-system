import AdminServices from '../services/admin.services.js';
import {validationResult} from "express-validator";
import adminsServices from "../services/admin.services.js";


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
  async getPlayers(req, res) {
    try {
      const  users = await AdminServices.getPlayers();
      res.status(users.code).json(users);
    }catch (e) {
      return res.status(400).json({code : 400, type : "error", message: e.message});
    }
  }

  // Get Player
  async getPlayer(req, res) {
    try {
      const id = req.params.id;
      const users = await AdminServices.getPlayer(id);
      res.status(users.code).json(users);
    }catch (e) {
      return res.status(400).json({code : 400, type : "error", message: e.message});
    }
  }

  // Add user
  async addPlayer(req, res) {
    try {
      // const {name, age, rating, country} = req.body;
      const  errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({code : 400, message: errors.array()});
      }

      const  users = await AdminServices.addPlayer(req.body);
      res.status(users.code).json(users);
    }catch (e) {
      return res.status(400).json({code : 400, type : "error", message: e.message});
    }
  }

  // Delete user
  async deletePlayer(req, res) {
    try {
      const {name} = req.body;
      const deleteUserData = await adminsServices.deletePlayer(name)
      res.status(deleteUserData.code).json(deleteUserData);
    }catch (e) {
      return res.status(400).json({code : 400, type : "error", message: e.message});
    }
  }

  async updateUser(req, res) {
    try {
      const id = req.params.id;
      const update = await adminsServices.updatePlayer(id, req.body)
      res.status(update.code).json(update);
    }catch (e) {
      return res.status(400).json({code : 400, type : "error", message: e.message});
    }
  }

}

export default new AdminController();
