import http from 'http';
import mongoose from 'mongoose';
import app from './app.mjs';
import { env } from 'node:process'

const { MONGO_USERNAME, MONGO_PASSWORD, PORT = 8000 } = env;


const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}`
	+ '@nodedevcluster0.soi2yfw.mongodb.net/'
	+ '?retryWrites=true&w=majority';
mongoose.connection.once('connected', () => console.log('db:connected'))
mongoose.connection.on('error', (err) => console.log('db:error', err))

const server = http.createServer(app);
async function startServer() {
	try {
		await mongoose.connect(MONGO_URL)
		server.listen(PORT, () => {
			console.log(`Listening on port: ${PORT}`);
		});
	} catch (error) {
		console.log('db:error', err);
	}

}

startServer();
