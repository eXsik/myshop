import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import { selectProducts } from "./productSlice";
import { Product } from "../../interfaces/Product";
import { useState } from "react";
import { Pagination } from "../../components/Pagination";

const ITEMS_PER_PAGE = 6;

interface ProcuctListProps {
  onSelectProduct: (product: Product) => void;
}

const ProductList = ({ onSelectProduct }: ProcuctListProps) => {
  const products = useSelector(selectProducts);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Produkty</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {selectedProducts.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onClick={() => onSelectProduct(product)}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductList;
