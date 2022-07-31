var express = require('express');
var router = express.Router();

var auth=require('../middleware/auth');
const Event = require('../Services/EventService');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/event')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 100)
        cb(null, file.fieldname + '-' + uniqueSuffix+"."+ file.originalname.split(".")[1])
    }
});
const cpUpload = multer({ storage: storage });
var upload = cpUpload.fields([{ name: 'banner', maxCount: 1 }])

//get all events
router.get('/getAllEvent',Event.getAllEvent)

//get event by id
router.get('/getEventById/:id',Event.getEventById)

//add event
router.post('/addEvent',auth,upload,Event.addEvent)

//edit event
router.put('/editEvent/:id',auth,upload,Event.editEvent)

//delete event
router.delete('/deleteEvent/:id',auth,Event.deleteEvent);

router.get('/total',Event.total);

module.exports = router;