const mongoose = require("mongoose");
const donationSchema = mongoose.Schema(
    {
        date: {
            type: Date,
            required: true
        },
        amount: {
            type: Number,
            required: true,
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
const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
