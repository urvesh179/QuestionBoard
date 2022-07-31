const mongoose = require("mongoose");
const donorSchema = mongoose.Schema(
    {
        donor_category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Donor_category'
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
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
donorSchema.virtual('Food_listing', {
    ref: 'Food_listing',
    localField: '_id',
    foreignField: 'donor_id'
})
const Donor = mongoose.model("Donor", donorSchema);

module.exports = Donor;
