// Modules
import { Request, Response } from "express"
import prisma from "../config/prisma"
import path from "path"
import fs from "fs"
import YTDlpWrap from "yt-dlp-wrap"

interface MusicDTO {
    url: string,
    playlistId: number,
}

const ytDlpPath = path.resolve(__dirname, String(process.env.YT_DLP_URL))
const ytDlp = new YTDlpWrap(ytDlpPath)

const addMusic = async(req: Request, res: Response) => {
    try {
        const { url, playlistId }: MusicDTO = req.body

        if (!url || !playlistId) {
            res.status(400).json({ msg: "Informações insuficientes" })
            return
        }

        const musicDir = path.resolve(__dirname, "../../musics")
        if (!fs.existsSync(musicDir)) fs.mkdirSync(musicDir, { recursive: true })

        const musicName = `music_${Date.now()}.mp3`
        const musicPath = path.join(musicDir, musicName)

        await ytDlp.execPromise([
            url,
            "-x",
            "--audio-format", "mp3",
            "-o", musicPath
        ])

        const musicInfo = await ytDlp.execPromise([url, "-j"])
        const parsedMusicInfo = JSON.parse(musicInfo)

        const music = await prisma.music.create({
            data: {
                title: parsedMusicInfo.title,
                channel: parsedMusicInfo.uploader,
                url,
                filePath: musicName,
                Playlist: { connect: { id: playlistId } }
            }
        })

        res.status(201).json({ msg: "Musica adicionada com sucesso", music })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

export default addMusic
