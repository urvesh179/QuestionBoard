const ReceiverCat=require("../models/Receiver_category");

exports.add=async(req,res)=>
{
    try{
        const cat=new ReceiverCat(req.body);
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


exports.getAll = async (req, res) => {
    try {
        const data = await ReceiverCat.find({is_deleted:false})
        res.status(200).send(data)

    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.getById = async (req, res) => {
    try {
        const data = await ReceiverCat.findOne({
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
        return res.status(400).send("Receiver Category Not Found");
    }
}


exports.delete = async (req, res) => {
    try {
        const data = await ReceiverCat.findById(req.params.id);
        data.is_deleted=true;
        await data.save();
        res.status(200).send(data)

    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.edit = async (req, res) => {
    try {
        await ReceiverCat.findByIdAndUpdate(req.params.id, req.body,{new:true,runValidators:true}, (err) => {
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
