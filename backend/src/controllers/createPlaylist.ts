// Modules
import { Request, Response } from "express"
import prisma from "../config/prisma"

interface PlaylistDTO {
    name: string,
    userId: number,
}

const createPlaylist = async(req: Request, res: Response) => {
    try {
        const { name, userId }: PlaylistDTO = req.body

        if (!name || !userId) {
            res.status(400).json({ msg: "Dados insuificentes" })
            return
        }

        const searchUser = await prisma.user.findUnique({ where: { id: userId } })
        if (!searchUser) {
            res.status(404).json({ msg: "Usuario não encontrado" })
            return
        }

        const newPlaylist = await prisma.playlist.create({
            data: {
                name: name,
                user: { connect: { id: userId } }
            },
            include: { musics: true }
        })

        res.status(201).json({ msg: "Playlist criada com sucesso", newPlaylist })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

export default createPlaylist
