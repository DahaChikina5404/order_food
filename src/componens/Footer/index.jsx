import { DevicePhoneMobileIcon, EnvelopeIcon } from "@heroicons/react/24/outline"

function Footer() {
    return (
        <footer className="bg-yellow-100 mt-24">
            <div className="content py-10 flex flex-col justify-between items-center gap-2 text-lg md:text-2xl">
                <a href="/" className="flex items-center gap-1">
                    <EnvelopeIcon className="h-6 w-6"/>
                    example@mail.ru
                </a>
            
                <div className="flex items-center gap-1">
                    <DevicePhoneMobileIcon className="h-6 w-6"/>
                    <p>+7 (123) 456-77-89</p>
                </div>

                <p>630099 г. Новосибирск</p>
                <p>Красный проспект, 50</p>
            </div>
        </footer>   
    )
}

export default Footer