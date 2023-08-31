import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from "crypto"

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    registerUser(user: User): void {
        if (this.users.some(rUser => rUser.email === user.email)) {
            throw new Error("User with same email already registered")
        }
        this.users.push(user)
        user.id = crypto.randomUUID()
    }

    removeUser(user: User): void {
        if (this.users.find(rUser => rUser.email === user.email)) {
            const index = this.users.findIndex(rUser => rUser.email === user.email)
            this.users.splice(index, 1)
        }
        else {
            throw new Error("This user does not exist")
        }
    }

    registerBike(bike: Bike): void {
        if (this.bikes.some(idBike => idBike.id === bike.id)) {
            throw new Error("This bike is already registered")
        }
        this.bikes.push(bike)
        bike.id = crypto.randomUUID()
    }

    findUser(email: string): User {
        return this.users.find(user => user.email === email)
    }

    rentBike(bike: Bike, user: User, startDate: Date, endDate: Date) {
        Rent.create(this.rents, bike, user, startDate, endDate)
    }

    returnBike(bike: Bike, rent: Rent) {
        const index = this.rents.findIndex(rRent => rRent.dateReturn === rent.dateReturn)
        this.rents.splice(index, 1)
    }
}