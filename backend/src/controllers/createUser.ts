// Modules
import { Request, Response } from "express"
import prisma from "../config/prisma"
import bcrypt from "bcryptjs"

interface UserDTO {
    user: string,
    password: string,
}

const createUser = async(req: Request, res: Response) => {
    try {
        const { user, password }: UserDTO = req.body

        if (!user || !password) {
            res.status(400).json("Dados invalidos")
            return
        }

        const checkUser = await prisma.user.findUnique({ where: { user } })
        if (checkUser) {
            res.status(400).json({ msg: "Usuario já existe" })
            return
        }

        // Hashes the password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const newUser = await prisma.user.create({
            data: {
                user,
                password: hash,
            }
        })

        res.status(201).json({ msg: "Usuario criado com sucesso", newUser })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

export default createUser
