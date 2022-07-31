const CharityEvent = require('../models/Charity_event');

exports.getAllEvent = async (req, res) => {
    try {
        const data = await CharityEvent.find({
            is_deleted: 0
        })

        return res.status(200).send(data)


    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.getEventById = async (req, res) => {
    try {
        const data = await CharityEvent.findOne({
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
        return res.status(400).send("Event Not Found");
    }
}

exports.addEvent = async (req, res) => {
    const event = new CharityEvent({
        ...req.body,
        banner: req.files.banner[0].filename
    })

    try {
        await event.save();
        return res.status(201).send("Event Inserted")
    } catch (e) {
        return res.status(400).send(e)
    }

}


exports.editEvent = async (req, res) => {
    try {
        let event={};
        if(req.files.banner)
        {
            event = {
                ...req.body,
                banner:  req.files.banner[0].filename  
            }
        }
        else
        {
            event = {
                ...req.body
            }

        }

        await CharityEvent.findByIdAndUpdate(req.params.id, event, { new: true, runValidators: true }, (err) => {
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

exports.deleteEvent = async (req, res) => {
    try {
        await CharityEvent.findByIdAndUpdate(req.params.id, {
            is_deleted: 1
        }, (err) => {
            if (err) {
                return res.status(400).send(err)
            }
            else {
                return res.status(201).send("Event Deleted")
            }
        });
    } catch (e) {
        return res.status(400).send("Not Deleted")
    }
}

exports.total = async (req, res) => {
    try {
        var total = await CharityEvent.where({ is_deleted: false }).count();

        if (total == 0) {
            return res.status(200).send({total:0});
        }
        return res.status(200).send({total});

    } catch (err) {
        return res.status(400).send("bad request");
    }
}