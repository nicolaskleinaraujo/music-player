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
            const chunkSize = 320 * 1024
            const end = Math.min(chunkSize - 1, fileSize - 1)

            res.writeHead(206, {
                "Content-Range": `bytes 0-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "content-length": chunkSize,
                "content-type": "audio/mpeg",
                "X-Total-Size": fileSize,
            })

            return fs.createReadStream(musicPath, { start: 0, end }).pipe(res)
        }

        const parts = range.replace(/bytes=/, "").split("-")
        const start = Number(parts[0])
        const end = parts[1] ? Number(parts[1]) : fileSize - 1

        const chunkSize = end - start + 1

        res.writeHead(206, {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunkSize,
            "Content-Type": "audio/mpeg",
        })

        fs.createReadStream(musicPath, { start, end }).pipe(res)
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

export default streamMusic
