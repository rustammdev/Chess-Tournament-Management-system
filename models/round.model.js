import {Schema, model} from "mongoose";

const RoundSchema = new Schema({
    tournamentId: {
        type: Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true
    },
    roundNumber: {
        type: Number,
        required: true
    },
    matches: [{ type: Schema.Types.ObjectId, ref: 'Match' }]
}, { timestamps: true });

export default model("Round", RoundSchema);