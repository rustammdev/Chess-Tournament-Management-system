import roundModel from "../models/round.model.js";
import matchModel from "../models/match.model.js";
import tournamentModel from "../models/tournament.model.js";

class TournamentController {
    async CreateRound(req, res) {
        try {
            const id = req.params.id;
            const roundNumber = req.body.roundNumber
            await roundModel.create({tournamentId : id, roundNumber})
            res.status(201).json({status : "ok", code : "201", message : "Round successfully created"});
        }catch (e) {
            return res.status(400).json({code : 400, type : "error", message: e.message});
        }
    }

    async CreateMatch(req, res) {
        try {
            const id = req.params.id;
            const { result } = req.body;
            const round = await roundModel.findById({_id : id})
            const tournamentData = await tournamentModel.findById({_id : round.tournamentId})

            if(tournamentData.participants.length === 1){
                return res.status(400).json({code : "400", type : "fail", message : "Not enough players"})
            }
            const whitePlayer = tournamentData.participants[0]
            const blackPlayer = tournamentData.participants[1]


            const match = await matchModel.create({roundId : id, whitePlayer, blackPlayer, result});

            const roundResData = await roundModel.updateOne(
                { _id: id },
                { $push: { matches: match } }
            );
            if(roundResData.modifiedCount !== 1) {
                return res.status(400).json({code : "400", type : "fail", message : "Round not found or updated"})
            }

            await tournamentData.updateOne(
                { _id: round.tournamentId },
                { $push: { rounds: roundResData } }
            );
            res.status(201).json({status : "ok", code : "201", message : "Match successfully created"});
        }catch (e) {
            return res.status(400).json({code : 400, type : "error", message: e.message});
        }
    }
}

export default new TournamentController();