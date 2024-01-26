const express = require('express');
const { httpGetAllLaunches, httpAddNewLaunche } = require('./launches.controller')

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches)
launchesRouter.post('/', httpAddNewLaunche)

module.exports = launchesRouter;