import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from "crypto";

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User {
        return this.users.find(user => user.email === email)
    }

    registerUser(user: User): string {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error("Duplicate user.")
            }
        }
        const newId = crypto.randomUUID()
        user.id = newId
        this.users.push(user)

        return newId
    }

    registerBike(bike: Bike): string {
        const newId = crypto.randomUUID()

        bike.id = newId
        this.bikes.push(bike)

        return newId
    }

    removeUser(email: string): void {
        const userIndex = this.users.findIndex(user => user.email === email)

        if (userIndex !== -1) {
            this.users.splice(userIndex, 1)
            return
        }

        throw new Error("User does not exist.")
    }
    
    rentBike(bikeId: string, userEmail: string, startDate: Date, endDate: Date): void {
        const bike = this.bikes.find(bike => bike.id === bikeId)

        if (!bike) {
            throw new Error("Bike not found.")
        }

        const user = this.findUser(userEmail)

        if (!user) {
            throw new Error("User not found.")
        }

        const bikeRents = this.rents.filter(rent =>
            rent.bike.id === bikeId && !rent.dateReturned
        )

        const newRent = Rent.create(bikeRents, bike, user, startDate, endDate)
        this.rents.push(newRent)
    }

    returnBike(bikeId: string, userEmail: string) {
        const today = new Date()
        const rent = this.rents.find(rent => 
            rent.bike.id === bikeId &&
            rent.user.email === userEmail &&
            rent.dateReturned === undefined &&
            rent.dateFrom <= today
        )

        if (rent) {
            rent.dateReturned = today
            return
        }

        throw new Error("Rent not found.")
    }

    listUsers() {
        let list = []
        
        this.users.map(({ name }) => {
            if (name) {
                list.push(name)
            }
        })

        console.log(list)
    }

    listBikes() {
        let list = []

        this.bikes.map(({ name }) => {
            if (name) {
                list.push(name)
            }
        })

        console.log(list)
    }

    listRents() {
        let listFrom = []
        let listTo = []
        let result = []

        this.rents.map(({ dateFrom }) => {
            if (dateFrom) {
                listFrom.push(dateFrom)
            }
        })

        this.rents.map(({ dateTo }) => {
            if (dateTo) {
                listTo.push(dateTo)
            }
        })

        result = [listFrom, listTo]
        .reduce((r, a) => (a.forEach((a, i) => (r[i] = r[i] || []).push(a)), r), [])
        .reduce((a, b) => a.concat(b))

        for (var i = 0; i < result.length; i++) {
            if (i === 0 || i % 2 === 0) {
                console.log("Rented From:", result[i])
            }
            else {
                console.log("To:", result[i])
            }
        }
    }

    userAuthenticator(userId: string, password: string) {
        let idList = []
        let passwordList = []
        var j: number = 0
        var flag: boolean

        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i]) {
                idList[j] = this.users[i].id
                passwordList[j] = this.users[i].password
                j++
            }
        }

        for (var i = 0; i < idList.length; i++) {
            if (userId === idList[i] && password === passwordList[i]) {
                flag = true
                break
            }
            else {
                flag = false
            }
        }
        
        if (flag) {
            console.log("User", userId, "logged in succesfully.")
            return
        }
        
        throw new Error("Invalid credentials.")
    }
}