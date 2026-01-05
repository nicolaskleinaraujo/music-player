// Modules
import dbFetch from "../utils/axios"
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import type { FormEvent } from "react"

const Login = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")

    const { setUserId, setPlaylists } = useContext(UserContext)

    const handleLogin = async(e: FormEvent) => {
        e.preventDefault()

        try {
            const res = await dbFetch.post("/user/login", {
                user,
                password,
            })

            localStorage.setItem("userId", res.data.searchUser.id)

            setUserId(res.data.searchUser.id)
            setPlaylists(res.data.searchUser.playlists)

            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={(e) => handleLogin(e)} className="flex flex-col h-screen items-center justify-center text-white">
                <label className="mb-5">
                    <p>Usuario: </p>
                    <input 
                        type="text"
                        className="border-2 border-black rounded-md indent-1 mt-2" 
                        onChange={(e) => setUser(e.target.value)}
                    />
                </label>
                <label>
                    <p>Senha: </p>
                    <input 
                        type="password"
                        className="border-2 border-black rounded-md indent-1 mt-2" 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

            <input className="mt-5 border-2 border-white rounded-md p-1 hover:bg-white hover:text-black" type="submit" value="Logar" />
            </form>

        </div>
    )
}

export default Login
