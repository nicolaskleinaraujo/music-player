// Modules
import { Request, Response } from "express"
import prisma from "../config/prisma"

interface UserDTO {
    userId: number
}

const TryAuth = async(req: Request, res: Response) => {
    try {
        const { userId }: UserDTO = req.body

        if (!userId) {
            res.status(400).json({ msg: "Informações insuficientes" })
            return
        }

        const searchUser = await prisma.user.findUnique({ 
            where: { id: Number(userId) },
            include: { playlists: { include: { musics: true } } }
        })

        if (!searchUser) {
            res.status(404).json({ msg: "Usuario não encontrado" })
            return
        }

        res.status(200).json({ msg: "Logado com sucesso", searchUser })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

export default TryAuth
