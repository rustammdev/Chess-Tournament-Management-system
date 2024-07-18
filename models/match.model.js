import {Schema, model} from "mongoose";

const MatchSchema = new Schema({
    roundId: {
        type: Schema.Types.ObjectId,
        ref: 'Round',
        required: true
    },
    whitePlayer: {
        type: Schema.Types.ObjectId,
        ref: 'Players',
        required: true
    },
    blackPlayer: {
        type: Schema.Types.ObjectId,
        ref: 'Players',
        required: true
    },
    result: {
        type: String,
        enum: ['1-0', '0-1', '1/2-1/2', '*'],
        default: '*'
    },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

export default model("Match", MatchSchema);