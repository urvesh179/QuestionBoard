const Receiver = require("../models/Receiver");
var receiver=require("../models/Receiver");
const Role = require("../models/Role");
var User=require('../models/User');

exports.addReceiver=async(req,res)=>
{
    try
    {
        var role_id=await Role.findOne({
            name:req.body.role
        })
        const r=new receiver({...req.body,role_id:role_id});
       
        var result=await r.save();
        if(!result)
        {
            return res.status(400).send("bad request");
        }
        return res.status(201).send("registered "+r);

    }catch(err)
    {
        res.status(400).send(err);
    }
}

exports.getAll = async (req, res) => {
    try {
        receiver.find({is_deleted:false})
        .populate("category_id")
        .populate("landmark_id")
        .exec((err,v)=>
        {
            
                if(err)
                {
                    return res.status(400).send(err);
                }
                else
                {
                    return res.status(200).send(v)
                }
          
        })
        

    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.getById = async (req, res) => {
    try {
        receiver.findOne({is_deleted:false,_id:req.params.id})
        .populate("category_id")
        .populate("landmark_id")
        .exec((err,v)=>
        {
            
                if(err)
                {
                    return res.status(400).send(err);
                }
                else
                {
                    return res.status(200).send(v)
                }
          
        })
        

    } catch (err) {
        return res.status(400).send("bad request");
    }
}


exports.edit = async (req, res) => {
    try {
        await receiver.findByIdAndUpdate(req.params.id, req.body,{new:true,runValidators:true}, (err) => {
            if (err) {
                return res.status(400).send(err)
            }
            else {
                return res.status(201).send("receiver Updated")
            }
        });
    } catch (e) {
        return res.status(400).send("Not Updated")
    }
}


exports.delete = async (req, res) => {
    try {
        const data = await receiver.findById(req.params.id);
        data.is_deleted=true;
        await data.save();
        res.status(200).send(data)

    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.totalReceiver=async(req,res)=>
{
    try{
        var total=await receiver.where({is_deleted:false}).countDocuments();          
        
        if(total == 0)
        {
            return res.status(200).send({total:0});
        }
        return res.status(200).send({total});

    }catch(err)
    {
        return res.status(400).send("bad request");
    }
}

exports.areaWiseTotal=async(req,res)=>
{
    try{
        var land_id=req.params.id;
        var total=await Receiver.where({is_deleted:false})
            .where({landmark_id:land_id})  //adajan
        .countDocuments();          
       
        if(total == 0)
        {
            return res.status(200).send({total:0});
        }
        
        return res.status(200).send({total:total});

    }catch(err)
    {
        return res.status(400).send("bad request");
    }
}