// Modules
import { Request, Response } from "express"
import axios from "axios"

interface SuggestMusicDTO {
    query?: string,
}

const suggestMusic = async (req: Request, res: Response) => {
    try {
        const { query }: SuggestMusicDTO = req.query

        if (query === "") {
            res.status(400).json({ msg: "Informações insuficientes" })
            return
        }

        const musicTitles = await axios.get(`${String(process.env.QUERY_URL)}&q=${query}`)

        res.status(200).json({ msg: "Pesquisa feita com suceeso", suggestions: musicTitles.data[1] })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

export default suggestMusic
