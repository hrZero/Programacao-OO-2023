import { BikeRepo } from "../../ports/bike-repo";
import { Bike } from "../../bike";
import prisma from "./db";

export class PrismaBikeRepo implements BikeRepo {
    bikes: Bike[] = []

    async find(id: string): Promise<Bike> {
        return await prisma.bike.findFirst({
            where: { id }
        })
    }

    async add(bike: Bike): Promise<string> {
        const addedBike = await prisma.bike.create({
            data: { ...bike }
        })

        return addedBike.id
    }

    async remove(id: string): Promise<void> {
        await prisma.bike.delete({
            where: { id }
        })
    }

    async update(id: string, bike: Bike): Promise<void> {
        await prisma.bike.update({
            where: { id, bike }
        })
    }

    async list(): Promise<Bike[]> {
        return await prisma.bike.findMany({})
    }
}