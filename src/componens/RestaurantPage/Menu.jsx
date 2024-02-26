import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ClockLoader } from "react-spinners"
import uuid4 from "uuid4"
import Restaurant from "./Restaurant"
import '../HomePage/style.css'

function Menu() {
  
    const [items, setItems] = useState([])   // МАССИВ блюд
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || [])  // массив блюд, добавленных в корзину
    const { slug } = useParams()

    useEffect(() => {  // Подгрузка данных с бэкенда
        fetch(`https://www.bit-by-bit.ru/api/student-projects/restaurants/${slug}/items`)
        .then(response => response.json())
        .then(data => setItems(data))
    }, [slug])

    useEffect(() => {  //  записываем данные в Local Storage
		localStorage.setItem('cartItems', JSON.stringify(cartItems))
	}, [cartItems])

    const addOrder = (item) => {   // функция добавляет заказ в корзину
        const currentCartItem = findCartItem(item)  // проверить, есть ли item в корзине cartItems
            
        if (currentCartItem) {   // изменить количество +1
            const newCartItem = {
                ...currentCartItem,
                quantity: currentCartItem.quantity + 1
            }
            // удалим старое
            let newItems = cartItems.filter(cartItem => cartItem.itemId !== currentCartItem.itemId)
            // заменяем старый на новый
            setCartItems([...newItems, newCartItem])
        } else {
            const newCartItem = {  // добавить впервые
                ...item,
                id: uuid4(),
                itemId: item.id,
                quantity: 1
            }
            setCartItems([...cartItems, newCartItem])
        }
    }

    const removeOrder = (item) => {   // уменьшение на 1 заказ из корзины
        const currentCartItem = findCartItem(item)  // проверить, есть ли item в корзине cartItems
            
        if (currentCartItem) {   // изменить количество -1
            const newCartItem = {
                ...currentCartItem,
                quantity: currentCartItem.quantity - 1
            }
            // удалим старое
            let newItems = cartItems.filter(cartItem => cartItem.itemId !== currentCartItem.itemId)
            // заменяем старый элемент на новый
            setCartItems([...newItems, newCartItem])
        }
    }


    // Мальвина, совсем запуталась с удалением из корзины.....
    const deleteOrderFromMenu = (item) => {  // удаление заказ из корзины если количество = 0
        const currentCartItem = findCartItem(item)  // проверить, есть ли item в корзине cartItems

        if (currentCartItem && currentCartItem.quantity < 1) {
            
            // удалим старое
            let newItems = cartItems.filter(cartItem => cartItem.itemId !== currentCartItem.itemId)
            // заменяем старый на новый
            setCartItems([...newItems])
        }
    }

    const findCartItem = (item) => {  // проверить, есть ли item в корзине cartItems
        return cartItems.find(c => c.itemId === item.id)
    } 

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

                                    {!findCartItem(item) ? (deleteOrderFromMenu() && // Хочу, чтобы при количестве м-е 1, кнопка "Добавить в корзину" опять показывалась
                                    <button 
                                        className="p-3 w-full bg-yellow-400 text-xl rounded hover:bg-yellow-600 transition-all duration-3000"
                                        onClick={() => addOrder(item)}
                                    >
                                        Добавить в корзину
                                    </button>
                                    ) : (
                                        findCartItem(item) && 
                                        <div className="my-5 flex justify-around items-center gap-1">
                                            <button className="text-6xl" onClick={() => removeOrder(item)}> - </button>
                                            <p className="text-3xl">{findCartItem(item).quantity}</p>
                                            <button className="text-6xl" onClick={() => addOrder(item)}> + </button>
                                        </div>
                                        )   
                                    }
                                </div>
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    )
}

export default Menu