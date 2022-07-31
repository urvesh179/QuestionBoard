var express = require('express');
var router = express.Router();

var auth=require('../middleware/auth');
var donor=require('../Services/DonorService');

router.post("/addDonor",donor.addDonor);

router.put('/edit/:id',auth,donor.edit);

router.get("/getDonorCat",auth,donor.getAllCat);

router.post("/addDonorCat",auth,donor.addCat);

router.put("/editDonorCat/:id",auth,donor.editCat);

router.delete("/deleteDonorCat/:id",auth,donor.deleteCat);

router.get("/totalDonor",donor.totalDonor)

module.exports = router;
