import Tournament from '../models/tournament.model.js';

class Leaderboard {
    constructor(tournamentId) {
        this.tournamentId = tournamentId;
        this.playerScores = {};
    }

    async generate() {
        const tournament = await Tournament.findById(this.tournamentId)
            .populate({
                path: 'rounds',
                populate: {
                    path: 'matches',
                    populate: ['whitePlayer', 'blackPlayer']
                }
            });

        if (!tournament) {
            console.error("Tournament not found");
            return [];
        }

        if (!tournament.rounds || tournament.rounds.length === 0) {
            console.error("No rounds found in tournament");
            return [];
        }

        for (const round of tournament.rounds) {
            if (!round.matches || round.matches.length === 0) {
                console.error(`No matches found in round ${round._id}`);
                continue;
            }

            for (const match of round.matches) {
                if (!match.whitePlayer || !match.blackPlayer) {
                    console.error(`Match ${match._id} does not have valid players`);
                    continue;
                }
                this.updatePlayerScore(match.whitePlayer._id, match.blackPlayer._id, match.result);
            }
        }

        return this.sortLeaderboard();

    }

    updatePlayerScore(whitePlayerId, blackPlayerId, result) {
        this.initPlayerScore(whitePlayerId);
        this.initPlayerScore(blackPlayerId);

        switch (result) {
            case '1-0':
                this.playerScores[whitePlayerId].total += 1;
                this.playerScores[whitePlayerId].wins += 1;
                this.playerScores[blackPlayerId].losses += 1;
                break;
            case '0-1':
                this.playerScores[blackPlayerId].total += 1;
                this.playerScores[blackPlayerId].wins += 1;
                this.playerScores[whitePlayerId].losses += 1;
                break;
            case '1/2-1/2':
                this.playerScores[whitePlayerId].total += 0.5;
                this.playerScores[blackPlayerId].total += 0.5;
                this.playerScores[whitePlayerId].draws += 1;
                this.playerScores[blackPlayerId].draws += 1;
                break;
            default:
                console.error(`Invalid match result: ${result}`);
        }
    }

    initPlayerScore(playerId) {
        if (!this.playerScores[playerId]) {
            this.playerScores[playerId] = { total: 0, wins: 0, draws: 0, losses: 0 };
        }
    }

    sortLeaderboard() {
        return Object.entries(this.playerScores)
            .map(([playerId, score]) => ({
                player: playerId,
                score: score.total,
                wins: score.wins,
                draws: score.draws,
                losses: score.losses
            }))
            .sort((a, b) => b.score - a.score || b.wins - a.wins);
    }
}

export default Leaderboard;
