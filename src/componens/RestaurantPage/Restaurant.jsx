import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { DevicePhoneMobileIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'

function Restaurant() {
  
    const [restaurant, setRestaurant] = useState([])
    const { slug } = useParams()

    useEffect(() => {  // Подгрузка данных с бэкенда
        fetch(`https://www.bit-by-bit.ru/api/student-projects/restaurants/${slug}`)
        .then(response => response.json())
        .then(data => setRestaurant(data))
    }, [slug])

    return (
         <div className="flex flex-col lg:flex-row gap-2 justify-between items-center">  
            <p className="text-2xl md:text-3xl">{restaurant.name}</p>

            <div className="flex items-center gap-1">
                <MapPinIcon className="h-6 w-6"/>
                <p className="text-xl md:text-2xl">{restaurant.address}</p>
            </div>

            <a href="/" className="flex items-center gap-1 text-sm md:text-xl">
                <EnvelopeIcon className="h-6 w-6"/>
                {restaurant.email}
            </a>
                    
            <div className="flex items-center gap-1 text-xl">
                <DevicePhoneMobileIcon className="h-6 w-6"/>
                <p className="text-xl md:text-2xl my-2">{restaurant.phone}</p>
            </div>
        </div>   
    )
}

export default Restaurant