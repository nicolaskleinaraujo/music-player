// Modules
import { Request, Response } from "express"
import path from "node:path"
import fs from "node:fs"

interface MusicDTO {
    fileName?: string,
}

const streamMusic = async(req: Request, res: Response) => {
    try {
        if (req.method === "OPTIONS") {
            res.writeHead(204, {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Range",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Expose-Headers": "Content-Range, Content-Length",
            })
            return res.end()
        }

        const { fileName }: MusicDTO = req.query

        if (!fileName) {
            res.status(400)
            return
        }

        const musicPath = path.resolve(__dirname, "../../musics", fileName)

        if (!fs.existsSync(musicPath)) {
            res.status(404)
            return
        }

        const stat = fs.statSync(musicPath)
        const fileSize = stat.size
        const range = req.headers.range

        if (fileSize <= 0) {
            res.status(503)
            return
        }

        if (!range) {
            const chunkSize = 320 * 1024
            const end = Math.min(chunkSize - 1, fileSize - 1)

            if (0 > end) {
                res.status(416)
                return
            }

            res.writeHead(206, {
                "Content-Range": `bytes 0-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": end + 1,
                "Content-Type": "audio/mpeg",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Range",
                "Access-Control-Expose-Headers": "Content-Range, Content-Length",
            })

            return fs.createReadStream(musicPath, { start: 0, end }).pipe(res)
        }

        const parts = range.replace(/bytes=/, "").split("-")
        let start = Number(parts[0])
        let end = parts[1] ? Number(parts[1]) : fileSize - 1

        if (isNaN(start) || start < 0) start = 0
        if (isNaN(end) || end < start) end = fileSize - 1
        if (end >= fileSize) end = fileSize - 1

        const chunkSize = end - start + 1

        if (start > end) {
            res.status(416)
            return
        }

        res.writeHead(206, {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunkSize,
            "Content-Type": "audio/mpeg",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Range",
            "Access-Control-Expose-Headers": "Content-Range, Content-Length",
        })

        fs.createReadStream(musicPath, { start, end }).pipe(res)
    } catch (error) {
        res.status(500)
    }
}

export default streamMusic
