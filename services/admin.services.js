import PlayerModel from "../models/player.model.js";

class AdminServices {
    async getPlayers() {
        try {
            const players = await PlayerModel.find();
            return {
                status: "ok",
                code: 200,
                players
            };
        } catch (e) {
            return { code: 403, message: "Failed to find players", error: e.message  };
        }
    }

    async getPlayer(id) {
        try {
            const player = await PlayerModel.findById({_id: id});

            if (!player) {
                return {
                    code: 404,
                    message: "Player not found"
                };
            }
            return {
                status: "ok",
                code: 200,
                player
            };
        } catch (e) {
            return { code: 403, message: "Failed to find users", error: e.message };
        }
    }

    async addPlayer(data) {
        try {
            const player = await PlayerModel.findOne({name : data.name})
            if (player) {
                return {
                    code: 400,
                    message: "A player with this name already exists",
                    existPlayer : player
                };
            }

            const create = await PlayerModel.create(data);
            return {
                status: "ok",
                code: 201,
                message : "New player is added successfully",
                create,
            };
        } catch (e) {
            return { code: 500, message: "Failed to find users", error: e.message };
        }
    }

    async updatePlayer(id, updateData) {
        try {
            const result = await PlayerModel.updateOne({ _id : id },  { $set : updateData });

            if (result.matchedCount === 0) {
                return { code: 200, message: "Player not found." };
            }
            return { status: "ok", code: 200, message: "Player updated successfully." };
        } catch (e) {
            return { code: 400, message: "Some error", error: e.message  };
        }
    }

    async deletePlayer(name) {
        try {
            const result = await PlayerModel.deleteOne({ name });
            if (result.deletedCount === 0) {
                return { code: 404, message: "Player not found." };
            }
            return { status: "ok", code: 200, message: "Player deleted successfully." };
        } catch (e) {
            return { code: 400, message: "Some error", error: e.message  };
        }
    }
}

export default new AdminServices();
