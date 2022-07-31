var donor=require("../models/Donor");
var donorCat=require('../models/Donor_category');

exports.addDonor=async(req,res)=>
{
    try
    {
        const r=new donor(req.body);
       
        var result=await r.save();
        if(!result)
        {
            return res.status(400).send("bad request");
        }
        return res.status(201).send(r);

    }catch(err)
    {
        res.status(400).send(err);
    }
}


exports.edit = async (req, res) => {
    try {
        await donor.findByIdAndUpdate(req.params.id, req.body,{new:true,runValidators:true}, (err) => {
            if (err) {
                return res.status(400).send(err)
            }
            else {
                return res.status(201).send("donor Updated")
            }
        });
    } catch (e) {
        return res.status(400).send("Not Updated")
    }
}

exports.addCat=async(req,res)=>
{
    try{
        const cat=new donorCat(req.body);
        const result=await cat.save();
        if(result)
        {
            return res.status(201).send(cat);
        }
        else
        {
            return res.status(400).send("bad request");
        }

    }catch(err)
    {
        res.status(400).send(err);
    }
}


exports.getAllCat = async (req, res) => {
    try {
        const data = await donorCat.find({is_deleted:false})
        res.status(200).send(data)

    } catch (err) {
        return res.status(400).send("bad request");
    }
}


exports.deleteCat = async (req, res) => {
    try {
        const data = await donorCat.findById(req.params.id);
        data.is_deleted=true;
        await data.save();
        res.status(200).send(data)

    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.editCat = async (req, res) => {
    try {
        await donorCat.findByIdAndUpdate(req.params.id, req.body,{new:true,runValidators:true}, (err) => {
            if (err) {
                return res.status(400).send(err)
            }
            else {
                return res.status(201).send("Event Updated")
            }
        });
    } catch (e) {
        return res.status(400).send("Not Updated")
    }
}
exports.totalDonor=async(req,res)=>
{
    try{
        var total=await donor.where({is_deleted:false}).count();          
        
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