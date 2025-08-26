// Modules
import { Request, Response } from "express"
import prisma from "../config/prisma"
import path from "path"
import fs from "fs"
import youtubeDl from "youtube-dl-exec"
import getShortPath from "../config/getShortPath"

interface MusicDTO {
    url: string,
    playlistId: number,
}

const addMusic = async(req: Request, res: Response) => {
    try {
        const { url, playlistId }: MusicDTO = req.body

        if (!url || !playlistId) {
            res.status(400).json({ msg: "Informações insuficientes" })
            return
        }

        const musicDir = path.resolve(__dirname, "../../musics")
        if (!fs.existsSync(musicDir)) fs.mkdirSync(musicDir, { recursive: true })

        const musicName = `music_${Date.now()}`.replace(/[^\w\d_-]/g, "_") + ".mp3"
        const musicPath = path.join(musicDir, musicName)

        await youtubeDl(url, {
            extractAudio: true,
            audioFormat: "mp3",
            output: getShortPath(musicPath),
            noCheckCertificates: true,
            //quiet: true,
        })

        const music = await prisma.music.create({
            data: {
                title: path.basename(musicPath, ".mp3"),
                channel: "Youtube",
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
