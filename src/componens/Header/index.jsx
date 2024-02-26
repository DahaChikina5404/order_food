import { Link } from "react-router-dom"

function Header() {
    return (
        <header className="bg-yellow-400 shadow-xl mb-20">
            <div className="content flex justify-between items-center gap-2 text-xl text-center md:text-3xl">

                <Link to='/'>
                    <img className="h-12 w-12 md:h-24 md:w-24 rounded-full" src="food_mini.jpg" alt="logo"/>
                </Link>

                <h1 className="pr-1">Все кухни МИРА не выходя из дома!</h1>
            </div>
        </header>
    )
}

export default Header