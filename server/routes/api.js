const express = require('express');
const router = express.Router();
const { db,
    Place,
    Hotel,
    Restaurant,
    Activity } = require('../models/index.js');


async function populateAllPromises() {
    let output = [];
    output.push(Hotel.findAll({include: [{ all: true }]}))
    // output.push(Place.findAll({include: [{ all: true }]}))
    output.push(Restaurant.findAll({include: [{ all: true }]}))
    output.push(Activity.findAll({include: [{ all: true }]}))
    return Promise.all(output)
}

async function deepData() {
    let x = await Hotel.findAll({include: [{ all: true }]})
    let x2 = await Activity.findAll({include: [{ all: true }]})
    let x3 = await Place.findAll({include: [{ all: true }]})
    let x4 = await Restaurant.findAll({include: [{ all: true }]})
    let allAttractions = {}
    allAttractions.hotel = x;
    allAttractions.activity = x2;
    allAttractions.place = x3;
    allAttractions.restaurant = x4;
    return allAttractions   
} //deepData deprecated :)


router.get('/', async(req, res, next) => {
    try {
        let x = await populateAllPromises()
        res.json(x);
    } catch (e) { next(e) }
})

module.exports = router;