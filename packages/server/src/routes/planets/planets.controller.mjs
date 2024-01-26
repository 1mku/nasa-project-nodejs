import { getAllPlanets } from '../../models/planets.model.mjs';

function httpGetAllPlanets(_req, res) {
	return res.status(200).json(getAllPlanets());
}

export { httpGetAllPlanets };
