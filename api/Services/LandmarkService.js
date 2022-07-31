const landmark=require('../models/Landmark');


exports.add=async(req,res)=>
{
    try
    {
        const l=new landmark(req.body);
        var result=await l.save();
        if(!result)
        {
            return res.status(400).send("bad request");
        }
        return res.status(201).send(l);

    }catch(err)
    {
        res.status(400).send(err);
    }
}

exports.getAll = async (req, res) => {
    try {
        const data = await landmark.find({is_deleted:false})
        res.status(200).send(data)

    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.getById = async (req, res) => {
    try {
        const data = await landmark.findOne({
            _id: req.params.id,
            is_deleted: 0
        })
        if (data) {
            return res.status(200).send(data)
        }
        else {
            return res.status(400).send("No Data Found")
        }

    } catch (err) {
        return res.status(400).send("Landmark Not Found");
    }
}


exports.delete = async (req, res) => {
    try {
        const data = await landmark.findById(req.params.id);
        data.is_deleted=true;
        await data.save();
        res.status(200).send(data)

    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.edit = async (req, res) => {
    try {
        await landmark.findByIdAndUpdate(req.params.id, req.body,{new:true,runValidators:true}, (err) => {
            if (err) {
                return res.status(400).send(err)
            }
            else {
                return res.status(201).send("landmark Updated")
            }
        });
    } catch (e) {
        return res.status(400).send("Not Updated")
    }
}