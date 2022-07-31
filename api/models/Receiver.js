const mongoose=require("mongoose");
const validator=require("validator");

const receiverSchema=mongoose.Schema({
   
    name:
    {
        type:String,
        required:true
    },
    phone_number:
    {
        type:Number,
        required:true,
        minlength:10,
        maxlength:10
    },
    address:{
        type:String,
        trim:true
    },
    landmark_id:
    {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Landmark'
    },
    category_id:
    {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Receiver_category'
    },
    population:
    {
        type:Number
    },
    role_id:
    {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Role'
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

receiverSchema.virtual('Donation', {
    ref: 'Donation',
    localField: '_id',
    foreignField: 'receiver_id'
}) 

receiverSchema.virtual('Food_listing', {
    ref: 'Food_listing',
    localField: '_id',
    foreignField: 'receiver_id'
}) 

receiverSchema.virtual('Food_request', {
    ref: 'Food_request',
    localField: '_id',
    foreignField: 'receiver_id'
}) 

const Receiver = mongoose.model("Receiver", receiverSchema);

module.exports = Receiver;