const mongoose=require("mongoose");
const validator=require("validator");

const recieverCatSchema=mongoose.Schema({
    
    
    name:
    {
        type:String,
        required:true
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

 recieverCatSchema.virtual('Receiver', {
    ref: 'Receiver',
    localField: '_id',
    foreignField: 'category_id'
})

const Receiver_category = mongoose.model("Receiver_category", recieverCatSchema);

module.exports = Receiver_category;