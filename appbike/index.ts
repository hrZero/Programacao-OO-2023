import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

const bike = new Bike("mountain bike", "mountain", 123, 500, 100.5, "desc", 5, [])
const user = new User("Maria", "maria@email.com", "1234")
const user2 = new User("Maria Clara", "maria@email.com", "3123")
const app = new App()
const today = new Date()
const tomorrow = new Date()
const twoDaysFromToday = new Date()
const sevenDaysFromToday = new Date()

tomorrow.setDate(tomorrow.getDate() + 1)
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2)
sevenDaysFromToday.setDate(sevenDaysFromToday.getDate() + 7)
app.registerUser(user)

const rent1 = Rent.create([], bike, user, today, twoDaysFromToday)

console.log(rent1)