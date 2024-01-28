import mongoose from 'mongoose';

export const launchesSchema = new mongoose.Schema({
	flightNumber: {
		type: Number,
		required: true,
	},
	launchDate: {
		type: Date,
		required: true
	},
	mission: {
		type: String,
		required: true,
	},
	rocket: {
		type: String,
		required: true,
	},
	upcoming: {
		type: Boolean,
		required: true
	},
	success: {
		type: Boolean,
		required: true,
		default: true,
	},
	target: {
		type: String,
		required: true
	},
	customers: [String]
});

export const Launch = mongoose.model('Launch', launchesSchema);
