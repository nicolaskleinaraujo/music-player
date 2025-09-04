// Modules
import { Request, Response } from "express"
import prisma from "../config/prisma"
import { OAuth2Client } from "google-auth-library"

const client = new OAuth2Client(String(process.env.GOOGLE_CLIENT_ID))

const googleAuth = async(req: Request, res: Response) => {
    try {
        const { credential, userId } = req.body

        if (!credential || userId) {
            res.status(400).json({ msg: "Informações insuficientes" })
            return
        }

        const userExists = await prisma.user.findUnique({ where: { id: userId } })
        if (!userExists) {
            res.status(404).json({ msg: "Usuario não encontrado" })
            return
        }

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        })

        const payload = ticket.getPayload();
        if (!payload) {
            res.status(401).json({ msg: "Token invalido" })
            return
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: { email: payload.email },
        })

        res.status(200).json({ msg: "Logado com sucesso", user })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

export default googleAuth
