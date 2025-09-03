// Modules
import { Request, Response } from "express"
import prisma from "../config/prisma"
import jwt from "jsonwebtoken"
import { OAuth2Client } from "google-auth-library"

const client = new OAuth2Client(String(process.env.GOOGLE_CLIENT_ID))

const googleAuth = async(req: Request, res: Response) => {
    try {
        const { credential } = req.body

        if (!credential) {
            res.status(400).json({ msg: "Informações insuficientes" })
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

        
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

export default googleAuth
