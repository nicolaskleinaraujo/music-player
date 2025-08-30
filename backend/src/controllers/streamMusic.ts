// Modules
import { Request, Response } from "express"
import path from "node:path"
import fs from "node:fs"

interface MusicDTO {
    fileName?: string,
}

const streamMusic = async(req: Request, res: Response) => {
    try {
        const { fileName }: MusicDTO = req.query

        if (!fileName) {
            res.status(400).json({ msg: "Informações insuficientes" })
            return
        }

        const musicPath = path.resolve(__dirname, "../../musics", fileName)

        if (!fs.existsSync(musicPath)) {
            res.status(404).json({ msg: "Musica não encontrada" })
            return
        }

        const stat = fs.statSync(musicPath)
        const fileSize = stat.size
        const range = req.headers.range

        if (!range) {
            res.writeHead(200, {
                "content-length": fileSize,
                "content-type": "audio/mpeg",
            })

            return fs.createReadStream(musicPath).pipe(res)
        }

        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1

        const chunkSize = end - start + 1
        const file = fs.createReadStream(musicPath, { start, end })

        res.writeHead(206, {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunkSize,
            "Content-Type": "audio/mpeg",
        })

        file.pipe(res)
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

export default streamMusic
