var volunteer = require('../models/Volunteer');
var landmarkManager = require('../models/Landmark_manager');
const User = require('../models/User');
const Role = require('../models/Role');

exports.signup = async (req, res) => {
    try {
        const v = new volunteer(req.body);
        var result = await v.save();
        if (!result) {
            return res.status(400).send("bad request");
        }
        return res.status(201).send("registered");

    } catch (err) {
        res.status(400).send(err);
    }
}

exports.getAll = async (req, res) => {
    try {
        var final = [];
        await volunteer.find({ is_deleted: false })
            .populate("user_id")
            .populate({
                path: 'user_id',
                populate: {
                    path: 'landmark_id',
                    model: 'Landmark'
                }
            })
            .exec()
            .then(async (data1) => {
                var i = 0;
                await data1.forEach(async (d) => {
                    var manager = "False";
                    await landmarkManager.findOne({ is_deleted: false, volunteer_id: d._id })
                        .exec()
                        .then((res) => {

                            if (res) {
                                manager = "True"
                            }
                            i++;
                            final.push({ volunteer: d, manager })
                        })
                    if (i == data1.length) {
                        res.status(200).send(final)
                    }
                })
            })

    } catch (err) {
        return res.status(400).send("bad request");
    }
}



exports.delete = async (req, res) => {
    try {
        const data = await volunteer.findById(req.params.id);
        data.is_deleted = true;
        await data.save();
        res.status(200).send(data)

    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.getVolunteerById = async (req, res) => {
    try {
        const u = await volunteer.findOne({ user_id: req.params.id, is_deleted: 0 })
            .populate("landmark_id")
            .populate("user_id");
        if (u) {
            return res.status(200).send({ volunteer: u });
        }
        return res.status(400).send("not found");

    } catch (err) {
        res.status(400).send(err);
    }
}

exports.edit = async (req, res) => {
    try {
        var v = await volunteer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!v) {
            return res.status(400).send(err)
        }
        else {
            var u = await User.findByIdAndUpdate(v.user_id, req.body, { new: true, runValidators: true })
            if (u)
                return res.status(201).send(v)
        }

    } catch (e) {
        return res.status(400).send("Not Updated")
    }
}

exports.total = async (req, res) => {
    try {
        var total = await volunteer.where({ is_deleted: false }).count();

        if (total == 0) {
            return res.status(200).send({ total: 0 });
        }
        return res.status(200).send({ total });

    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.areaWiseTotal = async (req, res) => {
    try {
        var role_id = await Role.findOne({
            name: "Volunteer"
        })
        var land_id = req.params.id;
        var total = await User.where({ is_deleted: false })
            .where({ role_id: role_id }) //role id for volunteer
            .where({ landmark_id: land_id })
            .countDocuments();

        if (total == 0) {
            return res.status(200).send({ total: 0 });
        }
        return res.status(200).send({ total: total });

    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.addLandmarkManager = async (req, res) => {
    try {
        const v = new landmarkManager(req.body);
        var result = await v.save();
        if (!result) {
            return res.status(400).send("bad request");
        }
        return res.status(201).send(result);

    } catch (err) {
        res.status(400).send(err);
    }
}




exports.getAllLandmarkManager = async (req, res) => {
    try {
        landmarkManager.find({ is_deleted: false })
            .populate("landmark_id")
            .populate({
                path: 'volunteer_id',
                populate: {
                    path: 'user_id',
                    model: 'User'
                }
            })
            .exec((err, v) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    return res.status(200).send(v);

                }
            })


    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.getLandmarkManagerByVolunteer = async (req, res) => {
    try {
        const data = await landmarkManager.findOne({ is_deleted: false, volunteer_id: req.params.id })
            .populate("landmark_id")
            .populate("volunteer_id");

        if (data) {
            return res.status(200).send("True");
        }
        else {
            return res.status(200).send("False");
        }



    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.deleteLandmarkManager = async (req, res) => {
    try {
        const data = await landmarkManager.findById(req.params.id);
        data.is_deleted = true;
        await data.save();
        res.status(200).send(data)

    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.areaWise=async(req,res)=>
{
    try{
    
        var land_id = req.params.id;
        volunteer.find({
            is_deleted:0
         })
        .populate('user_id')
        .exec(async (err, requests) => {
            if (err) {
                return res.status(400).send(err);
            }
            else {
                if(requests.length!=0)
                {
                 
                var userIds = requests.map((r) => { return r.user_id._id });
                User.find({ _id: { $in: userIds }, landmark_id: land_id }, async (err, users) => {
                    if (err) {

                        return res.status(400).send(err);
                    }
                    else {
                        if (users.length == 0) {
                            return res.status(200).send("");
                        }
                        var uids = users.map((u) => { return u._id.toString() })
                        var result = requests.filter(function (x) {
                            return uids.includes(x.user_id._id.toString());
                        })
                        res.status(200).send(result);
                    }
                })
                }
                else
                {
                    return res.status(200).send("");
                }
                

                //res.status(200).send(userIds);
            }
        })

    } catch (err) {
        return res.status(400).send("bad request");
    }
}

