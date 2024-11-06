import { useDispatch } from "react-redux";
import { Product } from "../../interfaces/Product";
import { useState } from "react";
import { addItemToCart } from "../cart/cartSlice";
import { decreaseQuantity } from "./productSlice";

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

const ProductDetails = ({ product, onClose }: ProductDetailsProps) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (quantity <= product.availableQuantity) {
      dispatch(addItemToCart({ ...product, quantity }));
      dispatch(decreaseQuantity({ productId: product.id, quantity }));
      onClose();
    } else {
      alert("Przepraszamy, nie ma tyle towaru w magazynie.");
    }
  };

  return (
    <div className="p-4">
      <div className="bg-white p-6 relative shadow-md">
        <button className=" text-indigo-500 my-2" onClick={onClose}>
          &laquo; Powrót do listy
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover mb-4"
        />
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="text-gray-700">{product.price} zł</p>
        <p className="text-sm text-gray-500 mt-2 mb-4">{product.description}</p>
        <p className="text-sm text-gray-600">
          Ilość: {product.availableQuantity}
        </p>
        <div className="flex items-center mt-4 justify-between">
          <input
            type="number"
            min="1"
            max={product.availableQuantity}
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
            className="w-16 border rounded p-1 mr-2"
          />
          <button
            className="bg-indigo-500 text-white py-2 px-4 rounded-md"
            onClick={handleAddToCart}
          >
            Dodaj do koszyka
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
