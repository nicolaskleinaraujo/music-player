// Modules
import { Request, Response } from "express"
import prisma from "../config/prisma"
import { exec } from "child_process"
import path from "path"
import fs from "fs"

interface MusicDTO {
    url: string,
    playlistId: number,
}

const addMusic = (req: Request, res:    Response) => {
    try {
        const { url, playlistId }: MusicDTO = req.body

        if (!url || !playlistId) {
            res.status(400).json({ msg: "Informações insuficientes" })
            return
        }

        const musicDir = path.join(__dirname, "../../musics")
        if (!fs.existsSync(musicDir)) fs.mkdirSync(musicDir)

        const musicName = `music_${Date.now()}.mp3`
        const musicPath = path.join(musicDir, musicName)

        const ytDlpCommand = `yt-dlp -x --audio-format mp3 -o "${musicPath}" "${url}"`

        exec(ytDlpCommand, async(error, stdout) => {
            if (error) {
                console.log(error)
                res.status(500).json({ msg: "Erro ao baixar musica" })
                return
            }

            const titleMatch = stdout.match(/Destination: (.+\.mp3)/)
            const title = titleMatch ? path.basename(titleMatch[1], ".mp3") : "Unknown"

            const music = await prisma.music.create({
                data: {
                    title,
                    channel: "teste",
                    url,
                    filePath: musicName,
                    Playlist: { connect: { id: Number(playlistId) } }
                }
            })

            res.status(201).json({ msg: "Musica criada com sucesso", music })
        })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

export default addMusic
