import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';

import { PUBLIC_FOLDER_PATH } from './constants.mjs';

import planetsRouter from './routes/planets/planets.router.mjs';
import launchesRouter from './routes/launches/launches.router.mjs';

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static(PUBLIC_FOLDER_PATH));

// Routes
app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);

app.get('/*', (_req, res) => {
    return res.sendFile(path.join(PUBLIC_FOLDER_PATH, 'index.html'))
});

export default app;