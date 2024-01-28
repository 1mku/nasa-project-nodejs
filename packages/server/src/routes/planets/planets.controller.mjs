import { getAllPlanets } from '../../models/planets.model.mjs';

async function httpGetAllPlanets(_req, res) {
	const planets = await getAllPlanets();
	return res.status(200).json(planets);
}

export { httpGetAllPlanets };
