// Modules
import { google } from "googleapis"
import fs from "fs"
import path from "path"
import prisma from "../config/prisma"

const oauth2Client = new google.auth.OAuth2(
    String(process.env.GOOGLE_CLIENT_ID),
    String(process.env.GOOGLE_CLIENT_SECRET),
)

const generateCookies = async(userId: number) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: userId } })
        if (!user) {
            console.log("Usuario não existe")
            return
        }

        oauth2Client.setCredentials({
            refresh_token: user?.refreshToken,
        })

        const { token: accessToken } = await oauth2Client.getAccessToken()
        if (!accessToken) {
            console.log("Erro ao gerar acess token")
            return
        }

        const cookiesTxtPath = path.resolve(__dirname, `${String(process.env.COOKIES_PATH)}/${userId}.txt`)
        const cookieString = `# Netscape HTTP Cookie File.youtube.com\tTRUE\t/\tTRUE\t9999999999\tSAPISID\t${accessToken}`

        fs.writeFileSync(cookiesTxtPath, cookieString)

        return cookiesTxtPath
    } catch (error) {
        console.log(error)
    }
}

export default generateCookies
