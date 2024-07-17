import UserModel from "../models/register.model.js";
import UserServices from "./user.services.js";

class AdminServices {
    async getUsers() {
        try {
            const users = await UserModel.find();
            console.log(users)
            return {
                status: "ok",
                code: 200,
                users
            };
        } catch (e) {
            console.log(e.message);
            return { code: 403, message: "Failed to find users" };
        }
    }

    async addUser(email, password, role) {
        try {
            return await UserServices.registeration(email, password, role);
        } catch (e) {
            console.log(e.message);
            return { code: 403, message: "Failed to find users" };
        }
    }
}

export default new AdminServices();
