const express = require('express');
const path = require('path');
const cors = require('cors');

const { PUBLIC_FOLDER_PATH } = require('./constants');

const planetsRouter = require('./routes/planets/planets.router');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.static(PUBLIC_FOLDER_PATH));
app.use(planetsRouter);
app.get('/', (_req, res) => {
    return res.sendFile(path.join(PUBLIC_FOLDER_PATH, 'index.html'))
});

module.exports = app;