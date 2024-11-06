import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../features/cart/cartSlice";
import CartModal from "../features/cart/CartModal";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      <h1 className="text-2xl font-bold">MyShop</h1>
      <button
        className={` text-white px-4 py-2 rounded-md  transition-colors shadow-md relative ${
          cartQuantity
            ? "bg-green-500 hover:bg-green-600"
            : "bg-slate-700 hover:bg-slate-800"
        }`}
        onClick={handleCartClick}
      >
        Koszyk {cartQuantity ? `(${cartQuantity})` : ""}
        {cartQuantity > 0 && (
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        )}
      </button>
      {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
    </header>
  );
};

export default Header;
