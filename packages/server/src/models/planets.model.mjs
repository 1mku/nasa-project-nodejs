import fs from 'fs';
import { parse } from 'csv-parse';

import { Planet } from './planets.mongo.mjs';

import { DATA_CSV_PATH } from '../constants.mjs';

function isHabitablePlanet(planet) {
	return (
		planet.koi_disposition === 'CONFIRMED' &&
		planet.koi_insol > 0.36 &&
		planet.koi_insol < 1.11 &&
		planet.koi_prad < 1.6
	);
}

export function loadPlanetsData() {
	return new Promise((resolve, reject) => {
		fs.createReadStream(DATA_CSV_PATH)
			.pipe(
				parse({
					comment: '#',
					columns: true,
				}),
			)
			.on('data', async (data) => {
				if (isHabitablePlanet(data)) {
					await savePlanet(data);
				}
			})
			.on('error', (err) => {
				console.log(err);
				reject(err);
			})
			.on('end', async () => {
				const countPlanets = (await getAllPlanets()).length;
				console.log(`${countPlanets} habitable planets found!`);
				resolve();
			});
	});
}

async function savePlanet(planet) {
	try {
		await Planet.findOneAndUpdate(
			{
				kepler_name: planet.kepler_name
			},
			{
				kepler_name: planet.kepler_name
			},
			{ upsert: true })
	} catch (error) {
		console.log('Could not save planet', error);
	}
}

async function getAllPlanets() {
	return await Planet.find({}, {
		__v: 0
	});
}

export { loadPlanetsData, getAllPlanets };
