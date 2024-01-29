import { env } from 'node:process';
import http from 'http';

import app from './app.mjs';
import { mongoConnect } from './services/mongo.mjs';
import { loadPlanetsData } from './models/planets.model.mjs';
import { loadLaunchData } from './models/launches.model.mjs';

const PORT = env.PORT || 8000;

const server = http.createServer(app);
async function startServer() {
	try {
		await mongoConnect();
		await loadPlanetsData();
		await loadLaunchData();
		server.listen(PORT, () => {
			console.log(`Listening on port: ${PORT}`);
		});
	} catch (error) {
		console.log('db:error', error);
	}
}

startServer();
