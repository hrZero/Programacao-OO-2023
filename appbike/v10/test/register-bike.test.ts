import request from 'supertest'
import server from '../src/server'
import prisma from '../src/external/database/db'

describe('Register bike route', () => {
    beforeEach(async () => {
        await prisma.bike.deleteMany({})
    })

    afterAll(async () => {
        await prisma.bike.deleteMany({})
    })

    it.only('registers a bike with valid data', async () => {
        await request(server)
            .post('/api/bikes')
            .send({
                name: "caloi mountain",
                type: "mountain bike",
                bodySize: 1234,
                maxLoad: 1234,
                rate: 100.0,
                description: "My bike",
                ratings: 5,
                imageUrls: []
            })
            .expect(201)
            .then((res) => {
                expect(res.body.id).toBeDefined()
            })
    })

    it('returns 400 when trying to register duplicate bike', async () => {
        await request(server)
            .post('/api/bikes')
            .send({
                name: "caloi mountain",
                type: "mountain bike",
                bodySize: 1234,
                maxLoad: 1234,
                rate: 100.0,
                description: "My bike",
                ratings: 5,
                imageUrls: []
            })
            .expect(201)

        await request(server)
            .post('/api/bikes')
            .send({
                name: "caloi mountain",
                type: "mountain bike",
                bodySize: 1234,
                maxLoad: 1234,
                rate: 100.0,
                description: "My bike",
                ratings: 5,
                imageUrls: []
            })
            .expect(400)
    }, 20000)
})