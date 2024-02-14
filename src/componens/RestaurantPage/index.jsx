import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "../HomePage/style.css"

function RestaurantPage() {
  
    const [items, setItems] = useState([])   // МАССИВ блюд
    const { slug } = useParams()
    
    useEffect(() => {  // Подгрузка данных с бэкенда
        fetch(`https://www.bit-by-bit.ru/api/student-projects/restaurants/${slug}/items`)
        .then(response => response.json())
        .then(data => setItems(data))
    }, [slug])

    return (
        <div className="content">
            {/* <div className="text-xl font-semibold px-20 py-10 text-center">
                <p className="text-3xl text-center">{items.restaurantId}</p>
                <p className="text-3xl text-center">{item.restaurantId}</p>
            </div> */}

            <div className="gap-10 grid justify-around grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
                {items.map((item) => {
                    return (
                        <div key={item.id} className="content_card">
                            <img className="h-60 w-30 rounded-2xl object-cover" src={item.image} alt="блюдо"/>
                            <p className="text-3xl text-center">{item.name}</p>
                            <p className="text-justify">{item.description}</p>
                            <p className="flex gap-1 text-2xl text-rose-700 italic">Цена: {item.price} р.</p>

                            <button className="p-3 w-full bg-yellow-400 text-xl rounded hover:bg-yellow-600 transition-all duration-300">
                                Добавить в корзину
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
        

}

export default RestaurantPage