// Modules
import "dotenv/config"
import express, { Application, Request, Response } from "express"
import cors from "cors"

// Controllers
import createUser from "./controllers/createUser"
import createLogin from "./controllers/createLogin"
import createPlaylist from "./controllers/createPlaylist"
import TryAuth from "./controllers/tryAuth"
import addMusic from "./controllers/addMusic"
import streamMusic from "./controllers/streamMusic"

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
app.post("/playlist", (req: Request, res: Response) => createPlaylist(req, res))
app.post("/tryauth", (req: Request, res: Response) => TryAuth(req, res))
app.post("/music", (req: Request, res: Response) => addMusic(req, res))
app.get("/music", (req: Request, res: Response) => streamMusic(req, res))

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
