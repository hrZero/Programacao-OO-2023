import { PrismaBikeRepo } from "../../../src/external/database/prisma-bike-repo"
import { Bike } from "../../../src/bike"
import prisma from "../../../src/external/database/db"

describe('PrismabikeRepo', () => {
    beforeEach(async () => {
        await prisma.bike.deleteMany({})
    })

    afterAll(async () => {
        await prisma.bike.deleteMany({})
    })

    it('adds a bike in the database', async () => {
        const bikeToBePersisted = new Bike(
            "caloi mountain", "mountain bike", 1234, 1234, 100.0, "My bike", 5, []
        )
        const repo = new PrismaBikeRepo()
        const bikeId = await repo.add(bikeToBePersisted)
        expect(bikeId).toBeDefined()
        const persistedBike = await repo.find(bikeToBePersisted.id)
        expect(persistedBike.id).toEqual(bikeToBePersisted.id)
    })

    it('removes a bike from the database', async () => {
        const bikeToBePersisted = new Bike(
            "caloi mountain", "mountain bike", 1234, 1234, 100.0, "My bike", 5, []
        )
        const repo = new PrismaBikeRepo()
        await repo.add(bikeToBePersisted)
        await repo.remove(bikeToBePersisted.id)
        const removedBike = await repo.find(bikeToBePersisted.id)
        expect(removedBike).toBeNull()
    })

    it('lists bikes in the database', async () => {
        const bike1 = new Bike(
            "caloi mountain", "mountain bike", 1234, 1234, 100.0, "My bike", 5, []
        )
        const bike2 = new Bike(
            "oggi mountain", "mountain bike", 1234, 1234, 100.0, "My bike", 5, []
        )
        const repo = new PrismaBikeRepo()
        await repo.add(bike1)
        await repo.add(bike2)
        const bikeList = await repo.list()
        expect(bikeList.length).toEqual(2)
    })
    
    it('updates a bike in the database', async () => {
        const bike = new Bike(
            "caloi mountain", "mountain bike", 1234, 1234, 100.0, "My bike", 5, []
        )
        const updatedBike = new Bike(
            "oggi mountain", "mountain bike", 1234, 1234, 100.0, "My bike", 5, []
        )
        const repo = new PrismaBikeRepo()
        await repo.add(bike)
        await repo.update(bike.id, updatedBike)
        expect(bike).not.toEqual(updatedBike)
    })
})