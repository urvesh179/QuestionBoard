var app=require('../app');
var request=require('supertest');
var User=require('../models/User');
var Role=require('../models/Role');
var mongoose=require('mongoose');
var utils=require('../Services/utils');
const { response } = require('../app');


var rid=new mongoose.Types.ObjectId();

var User1={
    name:"user1",
    username:"user1",
    email:"user1@gmail.com",
    password:"user123",
    phone_number:"9000000000",
    address:"citylight",
    landmark_id:"5fb4f93e50a9a41abf1b5e9f",
    role_id:rid
}
var role={
    _id:rid,
    name:"Admin"
}

let token="";

beforeEach(async()=>
{
    await Role.deleteMany();
    await User.deleteMany();
    await new User(User1).save();
    await new Role(role).save();
})


test('add user',async()=>
{
    await request(app).post('/user/add')
    .send(
        {
            name:"user2",
            username:"user2",
            email:"user2@gmail.com",
            password:"user123",
            phone_number:"9000000000",
            address:"citylight",
            landmark_id:"5fb4f93e50a9a41abf1b5e9f",
            role_id:rid
        }
    ).expect(201);
})

test('login',async()=>
{
    await request(app).post('/user/login')
    .send({
        username:"user1",
        password:"user123",
        role:"Admin"
    }).expect(200)
})

test('edit user',async()=>
{
    const user = await  User.findOne({
        "email":"user1@gmail.com"
    });
    if(user)
    {   
        token =await utils.generateToken(user);
    }
    await request(app).put('/user/edit/'+user._id).
    set('Authorization',`Bearer ${token}`).
    send({
        name:"userrrrrr1"
    }).expect(201)
})

test('get user by username',async()=>
{
    var response=await request(app).get('/user/get/user1').
    expect(200)

    expect(response.body.username).toBe("user1")

})