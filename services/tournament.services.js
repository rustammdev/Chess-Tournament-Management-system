import TournamentModel from "../models/tournament.model.js";

class TournamentServices{
    async createTournament(data){
        try{
            const tournament = TournamentModel.create(data);
            return {status : 'ok', code:200, message:"Tournament created" };
        }catch(e){
            return { code:500, type : "error", message: "Error creating Tournament", error : e.message };
        }
    }
}

export  default  new TournamentServices()