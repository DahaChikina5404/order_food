import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ClockLoader } from "react-spinners"
import uuid4 from "uuid4"
import Restaurant from "./Restaurant"
import ErrorModalWindow from "componens/ErrorModal"
import "../HomePage/style.css"

function Menu() {
  
    const [items, setItems] = useState([])   // МАССИВ блюд
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || [])  // массив блюд, добавленных в корзину
    const [error, setError] = useState(false)  // сообщение о добавлении блюда другого рестирана в корзину
    const { slug } = useParams()

    useEffect(() => {  // Подгрузка данных с бэкенда
        fetch(`https://www.bit-by-bit.ru/api/student-projects/restaurants/${slug}/items`)
        .then(response => response.json())
        .then(data => setItems(data))
    }, [slug])

    useEffect(() => {  //  записываем данные в Local Storage
		localStorage.setItem('cartItems', JSON.stringify(cartItems))
	}, [cartItems])

    const addOrder = (item, currentRestaurantId) => {   // функция добавляет заказ в корзину
        const currentCartItem = findCartItem(item)  // проверить, есть ли item в корзине cartItems

        if (!currentCartItem) {  // условие, чтобы добавлять блюдо ТОЛЬКО одного ресторана
            let itemFromOther = false  // блюда из другого ресторана

            for (let i = 0; i < cartItems.length; i++) { // проходим по всей корзине и проверяем является ли каждый эл-т клозины из одного и того же ресторана
                const cartItem = cartItems[i]
                if (cartItem.restaurantId !== currentRestaurantId && cartItem.quantity > 0) {
                    itemFromOther = true
                    break
                }
            }
            if (itemFromOther) {
                setError(true)
                return
            }
        } 

        if (currentCartItem) {   // изменить количество +1
            const newCartItem = {
                ...currentCartItem,
                quantity: currentCartItem.quantity + 1
            }
            // удалим старое
            let newItems = cartItems.map(cartItem => cartItem.itemId === currentCartItem.itemId ? newCartItem : cartItem)
            // заменяем старый на новый
            setCartItems(newItems)
        } else {
                const newCartItem = {  // добавить впервые
                    ...item,
                    id: uuid4(),
                    itemId: item.id,
                    quantity: 1,
                    restaurantId: item.restaurantId
                }
            setCartItems([...cartItems, newCartItem])
        }
    }

    const removeOrder = (item) => {   // уменьшение на 1 заказ из корзины
        const currentCartItem = findCartItem(item)  // проверить, есть ли item в корзине cartItems
            
        if (currentCartItem.quantity > 1) {   // изменить количество -1
            const newCartItem = {
                ...currentCartItem,
                quantity: currentCartItem.quantity - 1
            }
            // удалим старое
            let newItems = cartItems.map(cartItem => cartItem.itemId === currentCartItem.itemId ? newCartItem : cartItem)
            // заменяем старый элемент на новый
            setCartItems(newItems)
        } else {   // если количество меньше 1, то удалить товар из корзины
            let newItems = cartItems.filter(cartItem => cartItem.itemId !== currentCartItem.itemId)
            // заменяем старый на новый
            setCartItems(newItems)
        }
    }

    const findCartItem = (item) => {  // проверить, есть ли item в корзине cartItems
        return cartItems.find(c => c.itemId === item.id)
    } 

    const removeShoppingBasket = () => { // очистка корзины при добавлении блюда другого ресторана
        setCartItems([])
        setError(false)
    }

    const closeModalError = () => {  // закрытие сообщения об ошибки
        setError(false)
    }

    return (
        <div className="content min-h-screen">
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
                    {error && <ErrorModalWindow closeModalError={closeModalError} removeShoppingBasket={removeShoppingBasket}/>}
                    <div className="gap-10 grid justify-around grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
                        {items.map((item) => {
                            return (
                                <div key={item.id} className="content_card">
                                    <img className="h-60 w-30 rounded-2xl object-cover" src={item.image} alt="блюдо"/>
                                    <p className="text-3xl text-center">{item.name}</p>
                                    <p className="text-justify">{item.description}</p>
                                    <p className="flex gap-1 text-2xl text-rose-700 italic">Цена: {item.price} р.</p>

                                    {!findCartItem(item) ? (
                                    <button 
                                        className="p-3 w-full bg-yellow-400 text-xl rounded hover:bg-yellow-600 transition-all duration-3000"
                                        onClick={() => addOrder(item, item.restaurantId)}
                                    >
                                        Добавить в корзину
                                    </button>
                                    ) : (
                                        findCartItem(item) && 
                                        <div className="my-2 flex justify-around items-center gap-1">
                                            <button className="text-3xl" onClick={() => removeOrder(item)}> - </button>
                                            <p className="text-3xl">{findCartItem(item).quantity}</p>
                                            <button className="text-3xl" onClick={() => addOrder(item)}> + </button>
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