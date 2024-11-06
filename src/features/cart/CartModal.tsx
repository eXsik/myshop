import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeItemFromCart,
  selectCartItems,
  selectTotalAmount,
  updateQuantity,
} from "./cartSlice";
import { CartItem } from "../../interfaces/Cart";
import { useEffect } from "react";

const CartModal = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);

  const handleRemoveItem = (id: number) => {
    dispatch(removeItemFromCart(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    onClose();
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80 sm:w-96 relative">
        <h2 className="text-xl font-bold mb-4">Twój koszyk</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Twój koszyk jest pusty</p>
        ) : (
          <div>
            {cartItems.map((item: CartItem) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex items-center justify-between w-full">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>{(item.price * item.quantity).toFixed(2)} zł</p>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(event) =>
                      handleQuantityChange(item.id, Number(event.target.value))
                    }
                    className="w-16 border p-1 mt-1"
                  />
                </div>
                <button
                  className="text-red-500 hover:text-red-700 ml-4"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Usuń
                </button>
              </div>
            ))}
            <div className="border-t pt-4">
              <p className="text-xl flex justify-between">
                W sumie:{" "}
                <span className="font-semibold">
                  {totalAmount.toFixed(2)} zł
                </span>
              </p>
            </div>
            <button
              className="w-full bg-green-500 hover:bg-green-600 transition-colors text-white py-2 rounded-md mt-4"
              onClick={handleClearCart}
            >
              Zapłać
            </button>
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 text-2xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default CartModal;
