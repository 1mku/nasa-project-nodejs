import { expect, it, describe, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../app.mjs';
import { mongoConnect, mongoDisconnect } from '../../services/mongo.mjs';
import { loadPlanetsData } from '../../models/planets.model.mjs'


describe('Launches API', () => {
	beforeAll(async () => {
		await mongoConnect();
		await loadPlanetsData();
	});

	afterAll(async () => {
		await mongoDisconnect();
	});

	describe('Test /GET launches', () => {
		it('should respond with 200', async () => {
			await request(app)
				.get('/v1/launches')
				.expect('Content-Type', /json/)
				.expect(200);
		});
	});

	describe('Test /POST launches', () => {
		const dataWithoutLaunchDate = {
			mission: 'USS Enterprise',
			target: 'Kepler-442 b',
			rocket: 'NCC 1771-D'
		}
		const dataWithLaunchDate = {
			...dataWithoutLaunchDate,
			launchDate: 'January 7, 2033',
		};

		const errorInvalidLaunchDateMsg = 'Missing required property';

		it('should respond with 201', async () => {
			const response = await request(app)
				.post('/v1/launches')
				.send(dataWithLaunchDate)
				.expect('Content-Type', /json/)
				.expect(201);
			expect(response.body).toMatchObject(dataWithoutLaunchDate);

			const requestDate = new Date(dataWithLaunchDate.launchDate).valueOf();
			const responseDate = new Date(response.body.launchDate).valueOf();
			expect(responseDate).toBe(requestDate);
		});

		it('should catch missing required properties with 400', async () => {
			const response = await request(app)
				.post('/v1/launches')
				.send(dataWithoutLaunchDate)
				.expect('Content-Type', /json/)
				.expect(400);

			expect(response.body.error).toBeTruthy();
			expect(response.body.error).toBe(errorInvalidLaunchDateMsg);
		});
	});
});