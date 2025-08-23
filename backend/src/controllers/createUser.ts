// Modules
import { Request, Response } from "express"
import prisma from "../config/prisma"

interface UserDTO {
    user: string,
    password: string
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

        const newUser = await prisma.user.create({
            data: {
                user,
                password,
            }
        })

        res.status(201).json({ msg: "Usuario criado com sucesso", newUser })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}