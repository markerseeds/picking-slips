const express = require('express');
const db = require('./models');
const pickingSlipRouter = require('./routes/pickingSlipRoutes');

const app = express();

app.use(express.json());

// Testing DB Connection
(async () => {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

app.use('/api/v1/pickingSlips', pickingSlipRouter);

app.all('*', (req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not defined',
    });
});

module.exports = app;
