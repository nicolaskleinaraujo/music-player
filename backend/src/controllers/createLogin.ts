// Modules
import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import prisma from "../config/prisma"

interface UserDTO {
    user: string,
    password: string,
}

const createLogin = async (req: Request, res: Response) => {
    try {
        const { user, password }: UserDTO = req.body

        const searchUser = await prisma.user.findUnique({ 
            where: { user },
            include: { 
                playlists: { include: { musics: true } } 
            }
        })
        if (!searchUser) {
            res.status(400).json({ msg: "Usuario ou senha incorretos" })
            return
        }

        // Checks hash with password
        const checkPassword: boolean = await bcrypt.compare(password, searchUser.password)
        if (!checkPassword) {
            res.status(400).json({ msg: "Usuario ou senha incorretos" })
            return
        }

        res.status(200).json({ msg: "Logado com sucesso", searchUser })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

export default createLogin
