import { App } from "./app";
import { Bike } from "./bike";
import { User } from "./user";
import { Location } from "./location"
import sinon from "sinon"

async function main() {
    const clock = sinon.useFakeTimers()
    const app = new App()
    const user1 = new User("Jose", "jose@email.com", "1234")
    await app.registerUser(user1)
    const place = new Location(0.0, 0.0)

    const bike = new Bike("caloi mountain", "mountain bike",
        1234, 1234, 100.0, "My bike", 5, [])
    app.registerBike(bike)
    clock.tick(1000 * 60 * 60)
    app.moveBikeTo(bike.id, place)

    console.log(bike.location)
}

main()