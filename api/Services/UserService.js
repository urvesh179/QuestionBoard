const user = require('../models/User');
const role = require("../models/Role");
const util = require('./utils');
const bcrypt = require("bcryptjs");

const nodemailer = require('nodemailer');
const Role = require('../models/Role');
const { default: validator } = require('validator');

exports.addUser = async (req, res) => {
    try {
        const u = new user(req.body);
        var token = await util.generateToken(u);
        if (!token) {
            return res.status(400).send("bad request");
        }
        var result = await u.save();
        if (!result) {
            return res.status(400).send("bad request");
        }
        return res.status(201).send({ "user": u, "token": token });

    } catch (err) {
        res.status(400).send(err);
    }
}

exports.addRole = async (req, res) => {
    try {
        const r = new role(req.body);

        var result = await r.save();

        if (!result) {
            return res.status(400).send("bad request");
        }
        return res.status(201).send("registered " + r);

    } catch (err) {
        res.status(400).send(err);
    }
}

exports.edit = async (req, res) => {
    try {
        await user.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }, (err) => {
            if (err) {
                return res.status(400).send(err)
            }
            else {
                return res.status(201).send("user Updated")
            }
        });
    } catch (e) {
        return res.status(400).send("Not Updated")
    }
}

exports.getUser = async (req, res) => {
    try {
        var username = req.params.username;
        const u = await user.findOne({ username: username });
        if (u) {
            return res.status(200).send(u);
        }
        return res.status(400).send("not found");

    } catch (err) {
        res.status(400).send(err);
    }
}

exports.getUserById = async (req, res) => {
    try {
        const u = await user.findOne({ _id: req.params.id, is_deleted: 0 }).populate("landmark_id");
        if (u) {
            return res.status(200).send({user:u});
        }
        return res.status(400).send("not found");

    } catch (err) {
        res.status(400).send(err);
    }
}

exports.login = async (req, res) => {

    try {
        var role_id = await Role.findOne({
            name: req.body.role
        })

        const u = await user.findOne({
            username: req.body.username,
            role_id: role_id._id,
            is_deleted: false
        }).populate("landmark_id");
        if (u == null) {
            return res.status(401).send("Invalid User");
        }
        let valid = await bcrypt.compare(req.body.password, u.password);
        if (!valid) {
            return res.status(401).send("Invalid Password");
        }
        const token = await util.generateToken(u);
        res.status(200).send({ "user": u, "token": token });
    }
    catch (e) {
        res.status(400).send(e);
    }

}

exports.changePassword = async (req, res) => {
    try {
        let validpass = await bcrypt.compare(req.body.oldpass, req.validUser.password)

        if (!validpass) {
            return res.status(401).send("Not Valid Old Password");
        }
        const password = await util.gethash(req.body.newpass);

        const User = await user.findByIdAndUpdate(req.validUser._id, {
            password: password
        }, { new: true, runValidators: true })

        if (User) {
            return res.status(201).send("Successfully Password Changed");
        }
        else {
            return res.status(400).send("Not Updated");
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
}

exports.forgetPassword = async (req, res) => {
    try {
        const email = req.body.email;
        const u = await user.find({
            email: req.body.email,
            is_deleted: 0
        })

        if (u.length == 0) {
            return res.status(401).send("User Not Found");
        }

        const result = await sendMail(email);
        if (result) {
            return res.status(200).send("Check Your Mail For New Password");
        }
        else {
            return res.status(400).send(result);
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
}

exports.updatePassword = async (req, res) => {
    try {
        const password = await util.gethash(req.body.newpass);

        const User = await user.findByIdAndUpdate(req.params.id, {
            password: password
        }, { new: true, runValidators: true })

        if (User) {
            return res.status(201).send("Successfully Password Changed");
        }
        else {
            return res.status(400).send("Not Updated");
        }

    }
    catch (error) {
        res.status(400).send(error);
    }
}

const sendMail = async function (email) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'zalahardik73@gmail.com',
            pass: 'Zala@2000'
        }
    });


    const u = await user.find({
        email: email,
        is_deleted: 0
    })

    const path = 'http://localhost:3000/updatepassword/' + u[0]._id
    let msg = '<html><body><a href=' + path + '>Click Here To Set Your New Password</a></body></htm>'

    var mailOptions = {
        from: 'zalahardik73@gmail.com',
        to: email,
        subject: 'Forget Password From ZeroHunger',
        text: 'Set Your New Password',
        html: msg
    };

    let sendmail = await transporter.sendMail(mailOptions);

    return sendmail;


}

