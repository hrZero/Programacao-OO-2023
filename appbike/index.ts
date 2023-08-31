import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

const bike = new Bike("mountain bike", "mountain", 123, 500, 100.5, "desc", 5, [])
const user1 = new User("Maria", "maria@email.com", "1234")
const user2 = new User("Joao", "joao@email.com", "3123")
const app = new App()
const today = new Date()
const tomorrow = new Date()
const twoDaysFromToday = new Date()
const sevenDaysFromToday = new Date()
var rent: Rent
const index = app.rents.findIndex(rRent => rRent.dateReturn === rent.dateReturn)

tomorrow.setDate(tomorrow.getDate() + 1)
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2)
sevenDaysFromToday.setDate(sevenDaysFromToday.getDate() + 7)

app.registerBike(bike)
app.registerUser(user1)
app.registerUser(user2)
app.removeUser(user2)
console.log(app.findUser(user2.email))
app.rentBike(bike, user1, today, twoDaysFromToday)
app.returnBike(bike, app.rents[index])