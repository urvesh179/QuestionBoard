var express = require('express');
var router = express.Router();

const Donation = require('../Services/DonationService');
var auth=require('../middleware/auth');


//get all Food Donations
router.get('/getAllFoodDonation',Donation.getAllFoodDonation)

//get all Money Donations
router.get('/getAllMoneyDonation',Donation.getAllMoneyDonation)

//get all delievered Food
router.get('/getAllDeliveredFood',Donation.getAllDeliveredFood)

//add Food Listing
router.post('/addFoodListing',auth,Donation.addFoodListing)

//add Donation
router.post('/addMoneyDonation',auth,Donation.addMoneyDonation)

//add Food Delievry
router.post('/addFoodDelivery',auth,Donation.addFoodDelivery)

//add Food Request
router.post('/addFoodRequest',auth,Donation.addFoodRequest)

//get All Food Request
router.get('/getAllFoodRequest',Donation.getAllFoodRequest)

//get Food Request by id
router.get('/getFoodRequestById/:id',Donation.getFoodRequestById)

//edit Food Request
router.put('/editFoodRequest/:id',auth,Donation.editFoodRequest)

//delete Food request
router.delete('/deleteFoodRequest/:id',auth,Donation.deleteFoodRequest)

//total food donation
router.get('/totalFood',Donation.totalFood);

router.get('/totalMoney',Donation.totalMoney);

router.get('/areaWiseTotalRequest/:id',Donation.areaWiseTotalRequest);

router.get('/areaWiseTotalDonation/:id',Donation.areaWiseTotalDonation);

router.get('/areaWiseRequest/:id',auth,Donation.areaWiseRequest);

router.get('/areaWiseFoodDonation/:id',auth,Donation.areaWiseFoodDonation);

router.get('/uncheckedquality/:id',auth,Donation.uncheckedQuality);

router.get('/checkedquality/:id',auth,Donation.checkedQuality);

router.put('/updatequality/:id',auth,Donation.updateQuality);

router.get('/pickupdeliver/:id',auth,Donation.pickupDeliver);

router.get('/getAllPendingFood/:id',Donation.getAllPendingFood);

router.put('/updatedeliverystatus/:id',auth,Donation.updateDeliverystatus);

router.put('/redirectfood/:id',auth,Donation.redirectfood)

module.exports = router;