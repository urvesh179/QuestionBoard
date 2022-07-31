const mongoose = require("mongoose");
const CharityEventSchema = mongoose.Schema(
    {
        title : {
            type:String,
            required:true
        },
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            requird: true
        },
        location: {
            type: String,
            required: true
        },
        purpose : {
            type:String
        },
        description : {
            type:String
        },
        banner:{
            type:String
        },
        receivedFunds : {
            type:Number
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
const CharityEvent = mongoose.model("Charity_event", CharityEventSchema);

module.exports = CharityEvent;
