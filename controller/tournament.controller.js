import roundModel from "../models/round.model.js";
import matchModel from "../models/match.model.js";
import tournamentModel from "../models/tournament.model.js";
import MatchModel from "../models/match.model.js";
import tournamentServices from "../services/tournament.services.js";

class TournamentController {
    async CreateRound(req, res) {
        try {
            const id = req.params.id;
            const roundNumber = req.body.roundNumber
            await roundModel.create({tournamentId : id, roundNumber})
            res.status(201).json({status : "ok", code : 201, message : "Round successfully created"});
        }catch (e) {
            return res.status(400).json({code : 400, type : "error", message: e.message});
        }
    }

    async CreateMatch(req, res) {
        try {
            const id = req.params.id;
            const { result } = req.body;

            const match = await tournamentServices.createMatch(id, result)
            res.status(match.code).json(match);
        }catch (e) {
            return res.status(400).json({code : 400, type : "error", message: e.message});
        }
    }
}

export default new TournamentController();