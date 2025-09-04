// Modules
import { Request, Response } from "express"
import { OAuth2Client } from "google-auth-library"
import prisma from "../config/prisma"

const client = new OAuth2Client(
    String(process.env.GOOGLE_CLIENT_ID),
    String(process.env.GOOGLE_CLIENT_SECRET),
    String(process.env.ORIGIN_URL),
)

const googleToken = async(req: Request, res: Response) => {
    try {
        const { code, userId } = req.body

        if (!code || !userId) {
            res.status(400).json({ msg: "Informações insuficientes" })
            return
        }

        const userExists = await prisma.user.findUnique({ where: { id: userId } })
        if (!userExists) {
            res.status(404).json({ msg: "Usuario não encontrado" })
            return
        }

        const { tokens } = await client.getToken(code)
        if (!tokens.refresh_token) {
            res.status(400).json({ msg: "Não foi possivel gerar refresh token" })
            return
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: { refreshToken: tokens.refresh_token },
        })

        res.status(200).json({ msg: "Refresh token salvo com sucesso", user })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

export default googleToken
