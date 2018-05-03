const { builtinModules } = require("module");

const Sequelize = require('Sequelize');
const db = new Sequelize(`postgres://postgres:moop@localhost:5432/tripplanner`, {logging:false});

const Place = db.define('place', {
    address: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    phone: Sequelize.STRING,
    location: Sequelize.ARRAY(Sequelize.FLOAT),
})

const Hotel = db.define('hotel', {
    name: Sequelize.STRING,
    num_stars: Sequelize.FLOAT,
    amenities: Sequelize.STRING,
})

const Activity = db.define ('activity', {
    name: Sequelize.STRING,
    age_range: Sequelize.STRING,
})

const Restaurant = db.define ('restaurant', {
    name: Sequelize.STRING,
    cuisine: Sequelize.STRING,
    price: Sequelize.INTEGER,
})

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

module.exports = {
    db,
    Place,
    Hotel,
    Restaurant,
    Activity
  }
