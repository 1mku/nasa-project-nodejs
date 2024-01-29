import mongoose from 'mongoose';

const planetsSchema = new mongoose.Schema({
	kepler_name: {
		required: true,
		type: String,
	},
});

export const Planet = mongoose.model('Planet', planetsSchema);
