const mongoose=require("mongoose");
const validator=require("validator");

const fooddeliverySchema=mongoose.Schema({
   
   
    food_listing_id:
    {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Food_listing',
        unique:true
    },
    volunteer_id:
    {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Volunteer'
    },
    status:
    {
        type:String,
        required:true,
        default:"Pending"
    },
    landmark_id:
    {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Landmark',
        unique:true
    },
    is_deleted:
    {
        type:Boolean,
        required:true,
        default:false
    }
},
{
    timestamps: true,
  });

const Food_delivery = mongoose.model("Food_delivery", fooddeliverySchema);

module.exports = Food_delivery;