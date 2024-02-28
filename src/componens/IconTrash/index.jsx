import { ShoppingCartIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"

function IconTrash() {
    return (
        <Link to={`/cart`}>
            <button>
                <ShoppingCartIcon className="h-14 w-14 fixed bottom-7 right-7"/>
            </button>
        </Link>
    )
}

export default IconTrash