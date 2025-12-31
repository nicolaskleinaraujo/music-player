// Modules
import dbFetch from "../utils/axios"
import { Link } from "react-router-dom"
import { useState } from "react"

const SearchBox = () => {
    const [query, setQuery] = useState("")
    const [suggestedMusics, setSuggestedMusics] = useState([])

    const getMusicSuggestion = async(q: string) => {
        try {
            if (q === "") return
            const res = await dbFetch.get(`suggestmusic?query=${q}`)
            setSuggestedMusics(res.data.suggestions)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-40 bg-white">
                <input 
                    onChange={(e) => {
                        setQuery(e.target.value)
                        getMusicSuggestion(e.target.value)
                    }}
                    value={query}
                    className="bg-black w-32 text-white"
                />
            </div>
            {suggestedMusics && (
                <div>
                    <ul>
                        {suggestedMusics.map((suggestedMusic) => (
                            <li>
                                <Link to={`/search?${suggestedMusic[0]}`}>
                                    {suggestedMusic[0]}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SearchBox
