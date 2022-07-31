const mongoose = require("mongoose");
const donorcategorySchema = mongoose.Schema(
  {
  
    category: {
      type: String,
      required: true,
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

donorcategorySchema.virtual('Donor', {
  ref: 'Donor',
  localField: '_id',
  foreignField: 'donor_category_id'
})

const DonorCategory = mongoose.model("Donor_category", donorcategorySchema);


module.exports = DonorCategory;
