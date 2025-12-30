// Modules
import { Request, Response } from "express"
import prisma from "../config/prisma"
import path from "node:path"
import fs from "node:fs"
import https from "node:https"
import axios from "axios"

interface MusicDTO {
    url: string,
    playlistId: number,
    userId: number,
}

const addMusic = async(req: Request, res: Response) => {
    try {
        const { url, playlistId, userId }: MusicDTO = req.body

        if (!url || !playlistId || !userId) {
            res.status(400).json({ msg: "Informações insuficientes" })
            return
        }

        const authGen = await axios.get(String(process.env.AUTH_GEN_URL), {
            headers: {
                "Origin": "https://frame.y2meta-uk.com",
                "User-Agent": "PostmanRuntime/7.49.1"
            },
        })

        const urlGen = await axios.post(String(process.env.URL_GEN), {
            "link": url,
            "format": "mp3",
            "audioBitrate": "320",
            "videoQuality": "720",
            "filenameStyle": "pretty",
            "vCodec": "h264"
        }, {
            headers: {
                "Key": authGen.data.key,
                "Origin": "https://frame.y2meta-uk.com",
                "User-Agent": "PostmanRuntime/7.49.1",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Connection": "keep-alive"
            }
        })

        const musicDir = path.resolve(__dirname, "../../musics")
        if (!fs.existsSync(musicDir)) fs.mkdirSync(musicDir, { recursive: true })

        const musicFile = path.join(musicDir, "musicTest.mp3")

        https.get(urlGen.data.url, (response) => {
            if (response.statusCode !== 200) {
                res.status(500).json({ msg: "Erro interno, tente novamente" })
                return
            }

            const fileStream = fs.createWriteStream(musicFile)
            response.pipe(fileStream)

            fileStream.on("finish", () => fileStream.close())
        })

        const music = await prisma.music.create({
            data: {
                title: urlGen.data.filename,
                channel: "placeholder",
                url,
                filePath: musicFile,
                Playlist: { connect: { id: playlistId } }
            }
        })

        res.status(201).json({ msg: "Musica adicionada com sucesso", music })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

export default addMusic
