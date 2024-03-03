import Header from "componens/Header"
import HomePage from "componens/HomePage"
import RestaurantPage from "componens/RestaurantPage/Menu"
import ShoppingBasket from "componens/ShoppingBasket"
import IconTrash from "componens/IconTrash"
import Footer from "componens/Footer"
import { useState, useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
    const [restaurants, setRestaurants] = useState([])   // МАССИВ ресторанов

    useEffect(() => {  // Подгрузка данных с бэкенда
        fetch(`https://www.bit-by-bit.ru/api/student-projects/restaurants`)
        .then(response => response.json())
        .then(data => setRestaurants(data))
    }, [])

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage restaurants={restaurants} />}/>
                <Route path="/restaurant/:slug" element={<RestaurantPage />}/>
                <Route path="/cart" element={<ShoppingBasket restaurants={restaurants} />}/>
            </Routes>
            <IconTrash />
            <Footer />
        </BrowserRouter>
    )
}

export default App