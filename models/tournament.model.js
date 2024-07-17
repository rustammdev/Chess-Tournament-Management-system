import { model, Schema } from "mongoose";

const TournamentSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        startDate: {
            type: String,
            required: true
        },
        endDate: {
            type: String,
            required: true
        },
        participants: [{ type: Schema.Types.ObjectId, ref: "Players" }],
    },
    { timestamps: true }
);

export default model("Tournament", TournamentSchema);
