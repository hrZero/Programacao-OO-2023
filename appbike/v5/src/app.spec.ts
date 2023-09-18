import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import { Location } from "./location";
import sinon from "sinon"

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
        
    })
})