// Modules
import "dotenv/config"
import express, { Application, Request, Response } from "express"
import cors from "cors"

// Controllers
import createUser from "./controllers/createUser"
import createLogin from "./controllers/createLogin"

const app: Application = express()
const port: number = Number(process.env.PORT) || 3000

app.use(express.json())
app.use(
    cors({
        origin: process.env.ORIGIN_URL,
        credentials: true,
    })
)

app.post("/user", (req: Request, res: Response) => createUser(req, res))
app.post("/user/login", (req: Request, res: Response) => createLogin(req, res))

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
