// Modules
import { Request, Response } from "express"
import axios from "axios"

interface searchMusicDTO {
    query?: string,
}

const searchMusic = async (req: Request, res: Response) => {
    try {
        const { query }: searchMusicDTO = req.query

        if (query === "") {
            res.status(400).json({ msg: "Informações insuficientes" })
            return
        }

        const searchedMusics = await axios.get(`${String(process.env.SEARCH_URL)}?q=${query}`)

        res.status(200).json({ msg: "Musicas pesquisadas com sucesso", musics: searchedMusics.data.items })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

export default searchMusic
