import { useState, useEffect } from "react"
import { format } from "date-fns"
import { ClockLoader } from "react-spinners"
import { Link } from "react-router-dom"
import { DevicePhoneMobileIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'
import './style.css'

function HomePage() {
   
    const [restaurants, setRestaurants] = useState([])   // МАССИВ ресторанов

    useEffect(() => {  // Подгрузка данных с бэкенда
        fetch(`https://www.bit-by-bit.ru/api/student-projects/restaurants`)
        .then(response => response.json())
        .then(data => setRestaurants(data))
    }, [])

    return (
        <div className="content">
            {restaurants.length === 0 ? (
                <ClockLoader
                    className="content"
                    color="rgb(250 204 21)"
                    size={100}
                    speedMultiplier={1}
                />  
            ) : (
                <main className="gap-10 grid justify-around grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
                    {restaurants.map((restaurant) => {
                        return (
                            <div key={restaurant.id} className="content_card">
                                <img className="h-60 w-30 rounded-2xl object-cover" src={restaurant.image} alt="Лого ресторана"/>
                                <p className="text-3xl text-center">{restaurant.name}</p>
                                <p className="text-rose-700 italic text-xl text-center">{restaurant.cuisine}</p>

                                <div className="flex flex-col justify-between gap-3">
                                    <p className="text-justify">{restaurant.description}</p>

                                    <div className="flex gap-1 text-2xl text-rose-700 italic">
                                        <p>Время работы:</p>
                                        <p>{format(restaurant.openAt, 'hh:mm')} - {format(restaurant.closeAt, 'hh:mm')}</p>
                                    </div>
                                
                                    <div className="text-justify text-sm md:text-xl">
                                        <div className="flex items-center gap-1 font-medium">
                                            <MapPinIcon className="h-6 w-6"/>
                                            <p>{restaurant.address}</p>
                                        </div>

                                        <a href="/" className="my-3 flex items-center gap-1">
                                            <EnvelopeIcon className="h-6 w-6"/>
                                            {restaurant.email}
                                        </a>

                                        <div className="flex items-center gap-1 font-medium ">
                                            <DevicePhoneMobileIcon className="h-6 w-6"/>
                                            <p className="text-2xl my-2">{restaurant.phone}</p>
                                        </div>
                                    </div>
                                </div>

                                <Link to={`/restaurant/${restaurant.slug}`}>
                                    <button className="p-3 w-full bg-yellow-400 text-xl rounded hover:bg-yellow-600 transition-all duration-300">
                                        Перейти для заказа
                                    </button>
                                </Link>
                            </div>
                        )}
                    )}
                </main>
            )}
        </div>
    )
}

export default HomePage