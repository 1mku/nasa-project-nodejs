import { env } from 'node:process';
import mongoose from 'mongoose';

const MONGO_URL = env.NODE_ENV === 'test' ? env.VITE_MONGO_URL : env.MONGO_URL;

mongoose.connection.once('connected', () => console.log('db:connected'));
mongoose.connection.on('error', (err) => console.log('db:error', err));

export async function mongoConnect() {
	return mongoose.connect(MONGO_URL);
}
export async function mongoDisconnect() {
	await mongoose.disconnect();
}
