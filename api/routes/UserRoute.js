var express = require('express');
var router = express.Router();

var auth=require('../middleware/auth');
var user = require("../Services/UserService");

//addrole
router.post("/addRole",user.addRole);

//get single user by username
router.get('/get/:username',user.getUser)
//get single user by id
router.get('/getUserById/:id',auth,user.getUserById)

//adduser
router.post("/add",user.addUser);

router.put("/edit/:id",auth,user.edit);

//login
router.post("/login",user.login);

//Change Password
router.put("/changePassword",auth,user.changePassword);

//Forget Password
router.post('/forgetPassword',user.forgetPassword);

//Update Password
router.post('/updatePassword/:id',user.updatePassword);

module.exports=router;