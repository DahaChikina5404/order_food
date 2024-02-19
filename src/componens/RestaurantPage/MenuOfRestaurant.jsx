import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ClockLoader } from "react-spinners"
import Restaurant from "./Restaurant"
import '../HomePage/style.css'

function MenuOfRestaurant() {
  
    const [items, setItems] = useState([])   // МАССИВ блюд
    const { slug } = useParams()

    useEffect(() => {  // Подгрузка данных с бэкенда
        fetch(`https://www.bit-by-bit.ru/api/student-projects/restaurants/${slug}/items`)
        .then(response => response.json())
        .then(data => setItems(data))
    }, [slug])

    // const addOrder = (event) => {   // функция добавляет заказ в корзину
    //     event.preventDefault()  // предотвращаем загрузку страницы

    //     const cartItems = [
    //         id,
    //         image,
    //         name,
    //         price,
    //         count
    //     ]
    // }

    return (
        <div className="content">
            {items.length === 0 ? (
                <ClockLoader
                    className="content"
                    color="rgb(250 204 21)"
                    size={100}
                    speedMultiplier={1}
                />  
            ) : (
                <>
                    <Restaurant />
                    <div className="gap-10 grid justify-around grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
                        {items.map((item) => {
                            return (
                                <div key={item.id} className="content_card">
                                    <img className="h-60 w-30 rounded-2xl object-cover" src={item.image} alt="блюдо"/>
                                    <p className="text-3xl text-center">{item.name}</p>
                                    <p className="text-justify">{item.description}</p>
                                    <p className="flex gap-1 text-2xl text-rose-700 italic">Цена: {item.price} р.</p>

                                    <button 
                                        className="p-3 w-full bg-yellow-400 text-xl rounded hover:bg-yellow-600 transition-all duration-3000"
                                       // onClick={addOrder} items={items}
                                    >
                                        Добавить в корзину
                                    </button>   
                                </div>
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    )
}

export default MenuOfRestaurant