import roundModel from "../models/round.model.js";
import tournamentServices from "../services/tournament.services.js";
import Leaderboard from '../services/liderboard.services.js';

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

    async liderboard(req, res) {
        try {
            const tournamentId = req.params.id
            const leaderboard = new Leaderboard(tournamentId);
            const results = await leaderboard.generate();
            res.status(200).json({results : results});
        } catch (error) {
            res.status(500).json({ message: "Liderboard yaratishda xatolik yuz berdi", error: error.message });
        }
    }
}

export default new TournamentController();