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

        // Checks if the music is already downloaded
        const checksMusic = await prisma.music.findFirst({ where: { url } })
        if (checksMusic) {
            const music = await prisma.music.create({
                data: {
                    title: checksMusic.title,
                    channel: checksMusic.channel,
                    url,
                    filePath: checksMusic.filePath,
                    Playlist: { connect: { id: playlistId } }
                }
            })

            res.status(201).json({ msg: "Musica adicionada com sucesso", music })
            return
        }

        // Gets music infos and creates music instance on database
        const musicInfos = await axios.get(`https://www.youtube.com/oembed?url=${url}&format=json`)

        let music = await prisma.music.create({
            data: {
                title: musicInfos.data.title,
                channel: musicInfos.data.author_name,
                url,
                // FIXME remove this filepath placeholder
                filePath: "",
                Playlist: { connect: { id: playlistId } }
            }
        })

        const musicDir = path.resolve(__dirname, "../../musics")
        if (!fs.existsSync(musicDir)) fs.mkdirSync(musicDir, { recursive: true })

        const musicFile = path.join(musicDir, `${music.id}.mp3`)

        // Generetes the auth token
        const authGen = await axios.get(String(process.env.AUTH_GEN_URL), {
            headers: {
                "Origin": String(process.env.MUSIC_ORIGIN_URL),
                "User-Agent": "PostmanRuntime/7.49.1"
            },
        })

        // Generates the music download URL
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
                "Origin": String(process.env.MUSIC_ORIGIN_URL),
                "User-Agent": "PostmanRuntime/7.49.1",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Connection": "keep-alive"
            }
        })

        // Fetches the music download URL and saves it to internal storage 
        https.get(urlGen.data.url, (response) => {
            if (response.statusCode !== 200) {
                res.status(500).json({ msg: "Erro interno, tente novamente" })
                return
            }

            const fileStream = fs.createWriteStream(musicFile)
            response.pipe(fileStream)

            fileStream.on("finish", () => fileStream.close())
        })

        music = await prisma.music.update({
            where: { id: music.id },
            data: { filePath: musicFile }
        })

        res.status(201).json({ msg: "Musica adicionada com sucesso", music })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

export default addMusic
