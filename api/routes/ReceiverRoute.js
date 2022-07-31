var express = require('express');
var router = express.Router();

var auth=require('../middleware/auth');
var receiver = require("../Services/ReceiverService");

router.post('/add',auth,receiver.addReceiver);

router.get('/total',receiver.totalReceiver);

router.get('/getAll',receiver.getAll);

router.get('/getById/:id',receiver.getById);

router.put('/edit/:id',auth,receiver.edit);

router.delete('/delete/:id',auth,receiver.delete);

router.get('/areaWiseTotal/:id',receiver.areaWiseTotal);

module.exports=router;