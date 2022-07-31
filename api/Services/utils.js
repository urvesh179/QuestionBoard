var jwt=require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const secret=process.env.SECRET || "zerohungersecretkey";

exports.generateToken=async function(data)
{
    const token=await jwt.sign({_id:data._id.toString()},secret);
    return token;
}

exports.gethash = async function (password) {
    const h = await bcrypt.hash(password, 8);
    return h;
}