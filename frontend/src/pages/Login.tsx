// Modules
import dbFetch from "../utils/axios"
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"

const Login = () => {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")

    const { setUserId } = useContext(UserContext)

    const handleLogin = async() => {
        try {
            const res = await dbFetch.post("/user/login", {
                user,
                password,
            })

            setUserId(res.data.searchUser.id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col h-screen items-center justify-center text-white">
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

            <button className="mt-5 border-2 border-white rounded-md p-1 hover:bg-white hover:text-black" onClick={() => handleLogin()}>Logar</button>
        </div>
    )
}

export default Login
