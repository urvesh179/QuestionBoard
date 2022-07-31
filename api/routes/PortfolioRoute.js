var express = require('express');
var path = require('path');
var router = express.Router();

var auth=require('../middleware/auth');
const Portfolio = require('../Services/PortfolioService');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/portfolio')
    },
    filename: (req, file, cb) => {
        console.log(file)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 100)
        cb(null, file.fieldname + '-' + uniqueSuffix+"."+ file.originalname.split(".")[1])
    }
});
const cpUpload = multer({ storage: storage });
var upload = cpUpload.fields([{ name: 'image', maxCount: 1 }])

//get all portfolio
router.get('/getAllPortfolio',Portfolio.getAllPortfolio)

//get portfolio by id
router.get('/getPortfolioById/:id',Portfolio.getPortfolioById)

//add Portfolio
router.post('/addPortfolio',auth,upload,Portfolio.addPortfolio)

//edit Portfolio
router.put('/editPortfolio/:id',auth,upload,Portfolio.editPortfolio)

//delete Portfolio
router.delete('/deletePortfolio/:id',auth,Portfolio.deletePortfolio)

module.exports = router;