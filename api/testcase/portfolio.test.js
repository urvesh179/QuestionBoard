var app = require('../app');
var request = require('supertest');
var User = require('../models/User');
var Portfolio = require('../models/Portfolio');
var utils = require('../Services/utils');

let token = ""

beforeEach(async () => {
   // await Portfolio.deleteMany();
    const user = await User.findOne({
        "email": "user1@gmail.com"
    });
    token = await utils.generateToken(user);
})

test('Add Portfolio',async()=>{
    // const result=await request(app).
    // post('/portfolio/addPortfolio').
    // set('Authorization', `Bearer ${token}`).
    // attach('image','testcase/portfolio2.jpg',{ contentType: 'application/octet-stream' })
    // expect(201);

})