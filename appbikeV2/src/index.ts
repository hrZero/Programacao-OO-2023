import { App } from "./app";
import { Bike } from "./bike";
import { User } from "./user";

const app = new App()
const bike1 = new Bike("Caloi", "mountain bike", 100, 200, 150.5, "My bike", 5, [])
const bike2 = new Bike("Oggi", "street bike", 100, 200, 150.5, "My bike", 5, [])
const user1 = new User("Jose", "jose@email.com", "1234")
const user2 = new User("Maria", "maria@email.com", "4321")
const user3 = new User("Joao", "joao@email.com", "5678")
const bikeId1 = app.registerBike(bike1)

const yesterday = new Date()
const today = new Date()
const tomorrow = new Date()
const dayAfterTomorrow = new Date()
const twoDaysFromToday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
tomorrow.setDate(tomorrow.getDate() + 1)
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 3)

app.registerUser(user1)
app.registerUser(user2)
app.rentBike(bikeId1, "jose@email.com", yesterday, tomorrow)

console.log("Before:")
app.listUsers()
app.listBikes()
app.listRents()
app.userAuthenticator(user1.id, user1.password)

app.registerUser(user3)
const bikeId2 = app.registerBike(bike2)
app.rentBike(bikeId2, "maria@email.com", today, twoDaysFromToday)

console.log("\nAfter:")
app.listUsers()
app.listBikes()
app.listRents()
app.userAuthenticator(user3.id, user3.password)