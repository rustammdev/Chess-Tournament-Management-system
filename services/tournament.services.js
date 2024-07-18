import TournamentModel from "../models/tournament.model.js";
import PlayerModel from "../models/player.model.js";
import mongoose from "mongoose";

class TournamentServices{
    async createTournament(data){
        try{
            const isExist = await TournamentModel.findOne({ name : data.name })
            if(isExist){
                return { code: 409, type : 'fail', message : "There is already a tournament under this name" };
            }
            const tournament = await TournamentModel.create(data);
            return {status : 'ok', code:201, message : "Tournament created", tournamentData : tournament};
        }catch(e){
            return { code:500, type : "error", message: "Error creating Tournament", error : e.message };
        }
    }

    async updatePlayer(id, playerId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(playerId)) {
                return { code: 409, type : 'error', message : "Player not found", error : 'Invalid participant ID format' };
            }

            const  data = await TournamentModel.findById({_id : id});
            if(!data){
                return { code: 409, type : 'fail', message : "Tournament not found" };
            }

            // Checking if the player is already participating in the tournament
            if (data.participants.includes(playerId)) {
                return { code: 409, type: 'fail', message: "Player is already participating in this tournament" };
            }

            // Checking the presence of a new participant in the list of participants
            const playerIsExist = await PlayerModel.findById({_id : playerId})
            if(!playerIsExist){
                return { code: 409, type : 'fail', message : "New participant is not available in the list of players" };
            }

            const result = await TournamentModel.findByIdAndUpdate(id,  { $push: { participants: playerId } }, {new : true})
            if (!result) {
                return { code: 409, type: 'fail', message: "Failed to update the tournament" };
            }
            return { status: "ok", code: 200, message: "Player added successfully.", tournament : result };
        } catch (e) {
            return { code: 400, type : 'error', message: "Some error", error: e.message  };
        }
    }

    async makePairs(id) {
        try {
            const data = await TournamentModel.findById({_id : id})
            return data
        }catch(e){
            return { code: 400, type : 'error', message: "Some error", error: e.message  };
        }
    }
}

export  default  new TournamentServices()