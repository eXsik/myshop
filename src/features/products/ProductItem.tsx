import { useDispatch } from "react-redux";
import { Product } from "../../interfaces/Product";
import { addItemToCart } from "../cart/cartSlice";
import { decreaseQuantity } from "./productSlice";
import { memo } from 'react';

interface ProductItemProps {
  product: Product;
  onClick: () => void;
}

const ProductItem = memo(({ product, onClick }: ProductItemProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation();

    dispatch(addItemToCart({ ...product, quantity: 1 }));
    dispatch(decreaseQuantity({ productId: product.id, quantity: 1 }));
  };

  return (
    <div
      className="border rounded-lg p-4 flex flex-col items-center shadow hover:shadow-lg cursor-pointer transition-all"
      onClick={onClick}
    >
      <img
        src={product.image}
        alt={product.name + " image"}
        className="w-full h-40 object-cover mb-2"
      />
      <div className="flex items-center justify-between w-full">
        <div className="w-full">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">{product.price.toFixed(2)} zł</p>
        </div>
        <button
          className="bg-indigo-400 text-white px-3 py-0.5 shadow-md rounded-md hover:bg-indigo-500 transition-colors text-2xl"
          onClick={handleAddToCart}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="inline-block size-4 fill-white"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
          </svg>
        </button>
      </div>
    </div>
  );
});

export default ProductItem;
