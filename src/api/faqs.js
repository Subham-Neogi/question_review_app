const express = require('express');
const monk = require('monk');
const db = monk(process.env.MONGO_URI);
// Test connection to MongoDB database
db.then(() =>{
    console.log("connection success");
  }).catch((e)=>{
    console.error("Error !",e);
});

//Get the required collection
const faqs = db.get('faqs');
const JoiBase = require('@hapi/joi');
const JoiDate = require('@hapi/joi-date');
const Joi = JoiBase.extend(JoiDate);
//requests schema
const schema = Joi.object({
    question: Joi.string().trim().required(),
    answer: Joi.string().trim().required(),
    date: Joi.date().format("DD/MM/YYYY").raw().required(),
    video_url: Joi.string().uri()
});

const router = express.Router();

//Create One
router.post('/', async (req, res, next) => {
    try {
        //console.log(req.body);
        const value = await schema.validateAsync(req.body);
        const inserted = await faqs.insert(value);
        res.json(inserted);
    }
    catch (error) {
        next(error);
    }
});

//READ ALL
router.get('/', async (req, res, next) => {
   try {
            const items = await faqs.find({});
            res.json(items);
    }
    catch(error) {
        next(error);
    }
});

//READ BY ID
router.get('/:id', async (req, res, next) => {
    try {
        //console.log(req.body);
        const { id } = req.params;
        const item = await faqs.findOne({
            _id: id,
        });
        if (!item) return next();
        res.json(item);
    }
    catch (error) {
        next(error);
    }
});

//Update One
router.put('/:id', async (req, res, next) => {
    try {
        //console.log(req.body);
        const { id } = req.params;
        const value = await schema.validateAsync(req.body);
        const item = await faqs.findOne({
            _id: id,
        });
        if (!item) return next();
        const updated = await faqs.update({
            _id: id
        }, {
            $set: value
        });
        res.json(updated);
    }
    catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await faqs.remove({_id: id});
        res.json({
        message: "Success"
        });
    } catch (error) {
    next(error);
    }
});

module.exports = router;

