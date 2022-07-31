const mongoose = require("mongoose");
const roleSchema = mongoose.Schema(
  {
    
    name: {
      type: String,
      required: true,
      unique:true
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

roleSchema.virtual('User', {
  ref: 'User',
  localField: '_id',
  foreignField: 'role_id'
}) 
roleSchema.virtual('Receiver', {
  ref: 'Receiver',
  localField: '_id',
  foreignField: 'role_id'
}) 

const Role = mongoose.model("role", roleSchema);

module.exports = Role;
