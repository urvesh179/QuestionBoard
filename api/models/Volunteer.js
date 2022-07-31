const mongoose=require("mongoose");
const validator=require("validator");

const volunteerSchema=mongoose.Schema({
    
    user_id:
    {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    DOB:
    {
        type:Date,
        required:true
    },
    gender:
    {
        type:String,
        required:true

    },
    profession:
    {
        type:String
    },
    skillset:
    {
        type:String
    },
    weekdays:
    {
        type:Array
    },
    weekends:
    {
        type:Array
    },
    vehicle_mode:
    {
        type:Array
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


volunteerSchema.virtual('Food_delivery', {
    ref: 'Food_delivery',
    localField: '_id',
    foreignField: 'volunteer_id'
})

volunteerSchema.virtual('Landmark_manager', {
    ref: 'Landmark_manager',
    localField: '_id',
    foreignField: 'volunteer_id'
})
const Volunteer = mongoose.model("Volunteer", volunteerSchema);

module.exports = Volunteer;