// Modules
import fs from "node:fs"
import https from "node:https"

const downloadMusic = (url: string, dir: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dir)

        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                return reject(new Error("Download failed"))
            }

            response.pipe(file)

            file.on("finish", () => {
                file.close()
                resolve()
            })

            file.on("error", reject)
            response.on("error", reject)
        }).on("error", reject)
    })
}

export default downloadMusic
