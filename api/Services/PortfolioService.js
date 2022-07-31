const Portfolio = require('../models/Portfolio');


exports.getAllPortfolio = async (req, res) => {
    try {
        const data = await Portfolio.find({
            is_deleted: 0
        })

        return res.status(200).send(data)


    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.getPortfolioById = async (req, res) => {
    try {
        const data = await Portfolio.findOne({
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
        return res.status(400).send("Portfolio Not Found");
    }
}

exports.addPortfolio = async (req, res, next) => {

    //console.log(req.files.image[0].filename)
    const portfolio = new Portfolio({
        ...req.body,
        image: req.files.image[0].filename
        })

     try {
        await portfolio.save();
        return res.status(201).send(portfolio);
    } catch (e) {
        return res.status(400).send(e)
    }
}


exports.editPortfolio = async (req, res) => {
    try {
        let portfolio={};
        if(req.files.image)
        {
            portfolio = {
                ...req.body,
                image:  req.files.image[0].filename  
            }
        }
        else
        {
            portfolio = {
                ...req.body
            }

        }
        
       
        await Portfolio.findByIdAndUpdate(req.params.id, portfolio,{new:true,runValidators:true}, (err) => {
            if (err) {
                return res.status(400).send(err)
            }
            else {
                return res.status(201).send("Portfolio Updated")
            }
        });
    } catch (e) {
        return res.status(400).send("Not Updated")
    }
}

exports.deletePortfolio = async (req, res) => {
    try {
        await Portfolio.findByIdAndUpdate(req.params.id, {
            is_deleted: 1
        }, (err) => {
            if (err) {
                return res.status(400).send(err)
            }
            else {
                return res.status(201).send("Portfolio Deleted")
            }
        });
    } catch (e) {
        return res.status(400).send("Not Deleted")
    }
}