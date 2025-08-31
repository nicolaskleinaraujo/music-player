// Modules
import dbFetch from "../utils/axios"
import { useEffect, useState, useContext } from 'react'
import { UserContext } from "../context/UserContext"

const useAuth = () => {
    const { setUserId } = useContext(UserContext)

    const [authUserId, setAuthUserId] = useState(0)
    const [authLoading, setAuthLoading] = useState(true)

    const fetchData = async() => {
        try {
            const res = await dbFetch.post("/tryauth", {
                userId: localStorage.getItem("userId")
            })

            setAuthUserId(res.data.user.id)

            setUserId(res.data.user.id)
    
            setAuthLoading(false)
        } catch (error) {
            setAuthLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { authUserId, authLoading }
}

export default useAuth
