const mongoose = require("mongoose");
const foodRequestSchema = mongoose.Schema(
    {
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            requird: true
        },
        plates: {
            type: Number,
            required: true
        },
        receiver_id: {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Receiver'
        },
        is_deleted: {
            type: Boolean,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);
const FoodRequest = mongoose.model("Food_request", foodRequestSchema);

module.exports = FoodRequest;
