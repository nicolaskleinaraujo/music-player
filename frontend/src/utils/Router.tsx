// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Pages
import Login from "../pages/Login"
import Home from "../pages/Home"

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router
