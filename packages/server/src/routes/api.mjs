import express from 'express'

import planetsRouter from './planets/planets.router.mjs';
import launchesRouter from './launches/launches.router.mjs';

const api = express.Router();

api.use('/planets', planetsRouter);
api.use('/launches', launchesRouter);

export { api }