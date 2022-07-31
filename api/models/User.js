const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require('bcryptjs');

const UserSchema=mongoose.Schema({
   
    name:
    {
        type:String,
        required:true
    },
    username:
    {
        type:String,
        required:true,
        unique:true
    },
    email:
    {
        type:String,
        unique:true,
        required:true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("invalid email");
            }
        }
    
    },
    password:
    {
        type:String,
        required:true,
        minlength:6
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

UserSchema.virtual('Donor', {
    ref: 'Donor',
    localField: '_id',
    foreignField: 'user_id'
})

UserSchema.virtual('Volunteer', {
    ref: 'Volunteer',
    localField: '_id',
    foreignField: 'user_id'
})

UserSchema.pre('save',async function(next)
{
    const user=this;
    if(user.isModified("password"))
    {
        user.password=await bcrypt.hash(user.password,8);
    }
    next();
})

const User = mongoose.model("User", UserSchema);

module.exports = User;