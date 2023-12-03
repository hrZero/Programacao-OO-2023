import { App } from "../src/app"
import { Bike } from "../src/bike"
import { User } from "../src/user"
import { Location } from "../src/location";
import sinon from "sinon"
import { BikeNotFoundError } from "../src/errors/bike-not-found-error";
import { UnavailableBikeError } from "../src/errors/unavailable-bike-error";
import { UserNotFoundError } from "../src/errors/user-not-found-error";
import { DuplicateUserError } from "../src/errors/duplicate-user-error";
import { FakeUserRepo } from "./doubles/fake-user-repo";
import { FakeBikeRepo } from "./doubles/fake-bike-repo";
import { FakeRentRepo } from "./doubles/fake-rent-repo";
import { BikeRepo } from "../src/ports/bike-repo";
import { UserRepo } from "../src/ports/user-repo";
import { RentRepo } from "../src/ports/rent-repo";
import { RentNotFoundError } from "../src/errors/rent-not-found-error";
import { OpenRentsError } from "../src/errors/open-rents-error";

let userRepo: UserRepo
let bikeRepo: BikeRepo
let rentRepo: RentRepo

describe("App", () => {
    beforeEach(() => {
        userRepo = new FakeUserRepo()
        bikeRepo = new FakeBikeRepo()
        rentRepo = new FakeRentRepo()
    })
    it("should correctly calculate the rent amount", async () => {
        const clock = sinon.useFakeTimers()
        const hour = 1000 * 60 * 60
        const app = new App(userRepo, bikeRepo, rentRepo)
        const user = new User("Jose", "jose@email.com", "1234")
        const bike = new Bike("caloi mountain", "mountain bike",
            1234, 1234, 100.0, "My bike", 5, [])
        await app.registerUser(user)
        await app.registerBike(bike)
        await app.rentBike(bike.id, user.email)
        clock.tick(2 * hour)
        const rentAmount = await app.returnBike(bike.id, user.email)

        expect(rentAmount).toEqual(200.0)
    })

    it("should be able to move a bike to a specific location", async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)
        const bike = new Bike("caloi mountain", "mountain bike",
            1234, 1234, 100.0, "My bike", 5, [])
        const newYork = new Location(40.753056, -73.983056)
        await app.registerBike(bike)
        await app.moveBikeTo(bike.id, newYork)

        expect(bike.location.latitude).toEqual(newYork.latitude)
        expect(bike.location.longitude).toEqual(newYork.longitude)
    })

    it("should raise an exception when trying to move an unregistered bike", async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)
        const newYork = new Location(40.753056, -73.983056)

        await expect(app.moveBikeTo("fake-id", newYork)).rejects.toThrow(BikeNotFoundError)
    })

    it("should correctly handle a bike rent", async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)
        const user = new User("Jose", "jose@email.com", "1234")
        await app.registerUser(user)
        const bike = new Bike("caloi mountain", "mountain bike",
            1234, 1234, 100.0, "My bike", 5, [])
        await app.registerBike(bike)
        await app.rentBike(bike.id, user.email)
        const appRentRepo = app.rentRepo as FakeRentRepo
    
        expect(appRentRepo.rents.length).toEqual(1)
        expect(appRentRepo.rents[0].bike.id).toEqual(bike.id)
        expect(appRentRepo.rents[0].user.email).toEqual(user.email)
        expect(bike.available).toBeFalsy()
    })

    it("should throw unavailable bike when trying to rent with a unavailable bike", async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)
        const user = new User("Jose", "jose@email.com", "1234")
        await app.registerUser(user)
        const bike = new Bike("caloi mountain", "mountain bike",
            1234, 1234, 100.0, "My bike", 5, [])
        await app.registerBike(bike)
        await app.rentBike(bike.id, user.email)

        await expect(app.rentBike(bike.id, user.email)).rejects.toThrow(UnavailableBikeError)
    })

    it("should throw user not found error when user is not found", async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)

        await expect(app.findUser("fake@mail.com")).rejects.toThrow(UserNotFoundError)
    })

    it("should throw duplicate user when trying to register an already registered user", async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)
        const user1 = new User("Maria", "maria@email.com", "1234")
        await app.registerUser(user1)
        const user2 = new User("Ana Maria", "maria@email.com", "4321")

        await expect(app.registerUser(user2)).rejects.toThrow(DuplicateUserError)
    })

    it("should correctly authenticate user", async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)
        const user = new User("Jose", "jose@email.com", "1234")
        await app.registerUser(user)

        await expect(app.authenticate("jose@email.com", "1234")).resolves.toBeTruthy()
    })

    it("should throw user not found when trying to log with an unregistered user", async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)

        await expect(app.authenticate("fake@email", "9999")).rejects.toThrow(UserNotFoundError)
    })

    it("should throw user not found when trying to remove an unregistered user", async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)

        await expect(app.removeUser("fake@email")).rejects.toThrow(UserNotFoundError)
    })

    it("should correctly return bike", async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)
        const user = new User("Jose", "jose@email.com", "1234")
        await app.registerUser(user)
        const bike = new Bike("caloi mountain", "mountain bike",
            1234, 1234, 100.0, "My bike", 5, [])
        await app.registerBike(bike)
        await app.rentBike(bike.id, user.email)

        expect(app.returnBike(bike.id, user.email)).resolves.toBeTruthy
    })

    it("should throw rent not found when trying to return non rented bike", async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)
        const user = new User("Jose", "jose@email.com", "1234")
        await app.registerUser(user)
        const bike = new Bike("caloi mountain", "mountain bike",
            1234, 1234, 100.0, "My bike", 5, [])
        await app.registerBike(bike)

        await expect(app.returnBike(bike.id, user.email)).rejects.toThrow(RentNotFoundError)
    })

    it("should throw open rents error when trying to remove an user with open rents", async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)
        const user = new User("Jose", "jose@email.com", "1234")
        await app.registerUser(user)
        const bike = new Bike("caloi mountain", "mountain bike",
            1234, 1234, 100.0, "My bike", 5, [])
        await app.registerBike(bike)
        await app.rentBike(bike.id, user.email)

        await expect(app.removeUser(user.email)).rejects.toThrow(OpenRentsError)
    })
})