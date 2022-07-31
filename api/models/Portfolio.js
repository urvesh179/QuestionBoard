const mongoose = require("mongoose");

const portfolioSchema = mongoose.Schema(
    {
        
        image:{
            type : String,
            required:true
        },
        description:{
            type : String,
            required:true
            
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
const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
