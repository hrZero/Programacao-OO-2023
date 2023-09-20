import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import { Location } from "./location";
import sinon from "sinon"
import { BikeNotFoundError } from "./errors/bike-not-found-error";
import { UnavailableBikeError } from "./errors/unavailable-bike-error";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { DuplicateUserError } from "./errors/duplicate-user-error";
import { RentNotFoundError } from "./errors/rent-not-found";

describe("App", () => {
    it("should correctly calculate the rent amount", async () => {
        const app = new App()
        const user = new User("Jose", "jose@email.com", "1234")
        await app.registerUser(user)
        const bike = new Bike("caloi mountain", "mountain bike",
            1234, 1234, 100.0, "My bike", 5, [])
        app.registerBike(bike)
        const clock = sinon.useFakeTimers()
        const hour = 1000 * 60 * 60
        app.rentBike(bike.id, user.email)
        clock.tick(2 * hour)
        const rentAmount = app.returnBike(bike.id, user.email)

        expect(rentAmount).toEqual(200.0)
    })

    it("should be able to move a bike to a specific location", () => {
        const app = new App()
        const bike = new Bike("caloi mountain", "mountain bike",
            1234, 1234, 100.0, "My bike", 5, [])
        app.registerBike(bike)
        const newYork = new Location(40.753056, -73.983056)
        app.moveBikeTo(bike.id, newYork)

        expect(bike.location.latitude).toEqual(newYork.latitude)
        expect(bike.location.longitude).toEqual(newYork.longitude)
    })

    it("should raise an exception when trying to move an unregistered bike", () => {
        const app = new App()
        const newYork = new Location(40.753056, -73.983056)

        expect(() => {
            app.moveBikeTo("fake-id", newYork)
        }).toThrow(BikeNotFoundError)
    })

    it("should correctly handle a bike rent", async () => {
        const app = new App()
        const user = new User("Jose", "jose@email.com", "1234")
        await app.registerUser(user)
        const bike = new Bike("caloi mountain", "mountain bike",
            1234, 1234, 100.0, "My bike", 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id, user.email)
    
        expect(app.rents.length).toEqual(1)
        expect(app.rents[0].bike.id).toEqual(bike.id)
        expect(app.rents[0].user.email).toEqual(user.email)
        expect(bike.available).toBeFalsy()
    })

    it("should throw unavailable bike when trying to rent with a unavailable bike", async () => {
        const app = new App()
        const user = new User("Jose", "jose@email.com", "1234")
        await app.registerUser(user)
        const bike = new Bike("caloi mountain", "mountain bike",
            1234, 1234, 100.0, "My bike", 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id, user.email)

        expect(() => {
            app.rentBike(bike.id, user.email)
        }).toThrow(UnavailableBikeError)
    })

    it("should throw user not found error when user is not found", () => {
        const app = new App()

        expect(() => {
            app.findUser("fake@mail.com")
        }).toThrow(UserNotFoundError)
    })

    it("should throw duplicate user when trying to register an already registered user", async () => {
        const app = new App()
        const user1 = new User("Maria", "maria@email.com", "1234")
        await app.registerUser(user1)
        const user2 = new User("Ana Maria", "maria@email.com", "4321")

        await expect(app.registerUser(user2)).rejects.toThrow(DuplicateUserError)
    })

    it("should throw incorrect password when trying to authenticate with incorrect password", async () => {
        const app = new App()

        await expect(app.authenticate("fake@email", "4321")).rejects.toThrow(UserNotFoundError)
    })

    it("should throw user not found when trying to remove a nonexistent user", () => {
        const app = new App()

        expect(() => {
            app.removeUser("fake@email")
        }).toThrow(UserNotFoundError)
    })
    
    it("should throw rent not found when trying to return non rented bike", async () => {
        const app = new App()
        const user = new User("Jose", "jose@email.com", "1234")
        await app.registerUser(user)
        const bike = new Bike("caloi mountain", "mountain bike",
            1234, 1234, 100.0, "My bike", 5, [])
        app.registerBike(bike)

        expect(() => {
            app.returnBike(bike.id, user.email)
        }).toThrow(RentNotFoundError)
    })
})