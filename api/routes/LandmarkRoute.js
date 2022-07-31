var express = require('express');
var router = express.Router();

var auth=require('../middleware/auth');
var landmark = require("../Services/LandmarkService");

router.post("/add",auth,landmark.add);

router.get("/getAll",landmark.getAll);

router.get("/getById/:id",landmark.getById);

router.put("/edit/:id",auth,landmark.edit);

router.delete("/delete/:id",auth,landmark.delete);

module.exports=router;