import { Bike } from "./bike";
import { User } from "./user";

export class Rent {
    constructor(
        public bike: Bike,
        public user: User,
        public dateFrom: Date,
        public dateTo: Date,
        public dateReturn?: Date
    ) {}

    static create(rents: Rent[], bike: Bike, user: User, startDate: Date, endDate: Date): Rent {
        const canCreate = Rent.canRent(rents, startDate, endDate)
        if (canCreate) return new Rent(bike, user, startDate, endDate)
        throw new Error("Overlapping dates")
    }

    static canRent(rents: Rent[], startDate: Date, endDate: Date): boolean {
        for (const rent of rents) {
            if (startDate <= rent.dateTo && endDate >= rent.dateFrom) return false
        }

        /* Também pode ser implementado dessa forma
        return !rents.some(rent => {
            return startDate <= rent.dateTo && endDate >= rent.dateFrom
        })
        */

        return true
    }
}