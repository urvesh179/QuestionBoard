var express = require('express');
var router = express.Router();

var auth=require('../middleware/auth');
const ReceiverCat=require("../Services/ReceiverCatService");

//get all receiver category
router.get('/getAll',ReceiverCat.getAll);

//get all receiver category by id
router.get("/getById/:id",ReceiverCat.getById);

//add receiver category
router.post("/add",auth,ReceiverCat.add);

//delete receiver category
router.delete("/delete/:id",auth,ReceiverCat.delete);

//edit receiver category
router.put("/edit/:id",auth,ReceiverCat.edit);

module.exports = router;