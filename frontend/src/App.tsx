// Modules
import Router from './utils/Router'
import dbFetch from './utils/axios'
import { useEffect, useContext } from 'react'
import { UserContext } from './context/UserContext'
import { LoadingContext } from "./context/LoadingContext"
import LoadingOverlay from './components/LoadingOverlay'

function App() {
  const { setUserId, setPlaylists } = useContext(UserContext)
  const { loading, setLoading } = useContext(LoadingContext)

  const tryAuth = async() => {
    try {
      setLoading(true)

      const res = await dbFetch.post("/tryauth", {
        userId: localStorage.getItem("userId")
      })

      setUserId(res.data.searchUser.id)
      setPlaylists(res.data.searchUser.playlists)

      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    tryAuth()
  }, []) 

  return (
    <>
      { loading && <LoadingOverlay /> }
      <Router />
    </>
  )
}

export default App
