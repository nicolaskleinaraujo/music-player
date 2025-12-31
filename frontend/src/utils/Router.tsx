// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserRoute from "./UserRoute"

// Pages
import Login from "../pages/Login"
import Home from "../pages/Home"
import Search from "../pages/Search"

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={ <Login /> } />
                    
                    <Route element={ <UserRoute /> }>
                        <Route path="/" element={ <Home /> } />
                        <Route path="/search" element={ <Search /> } />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router
