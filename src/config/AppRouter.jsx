import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/home/Home'
import List from '../pages/list/List'
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/list"} element={<List />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter