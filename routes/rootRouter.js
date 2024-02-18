const express = require('express');
const heroRouter = require('./heroRouter');
const superPowerRouter = require('./superpowerRouter');


const rootRouter = express.Router();


rootRouter.use('/heroes', heroRouter);
rootRouter.use('/superpowers', superPowerRouter);

module.exports = rootRouter;