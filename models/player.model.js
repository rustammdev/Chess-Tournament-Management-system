import { model, Schema } from "mongoose";

const PlayerSchema = new Schema(
    {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        rating: { type: Number, required: true },
        country: { type: String, required: true },
    },
    { timestamps: true }
);

export default model("Players", PlayerSchema);
