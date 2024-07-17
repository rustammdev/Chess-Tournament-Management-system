import PlayersModel from "../models/players.model.js";

class PlayerServices {
    async getPlayers() {
        try {
            const players = await PlayersModel.find();
            return {
                status: "ok",
                code: 200,
                players
            };
        } catch (e) {
            console.log(e.message);
            return { code: 403, message: "Failed to find players" };
        }
    }

}

export default new PlayerServices();
