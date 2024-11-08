const dbConfig = require('../config/db-config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
});

const db = {};
db.sequelize = sequelize;

// Placeholder to create PickingSlip Model
// db.models = {};
// db.models.PickingSlip = require('./pickingSlip')(
//     sequelize,
//     Sequelize.DataTypes
// );

module.exports = db;
