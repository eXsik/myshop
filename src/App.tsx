import { useState } from "react";
import Header from "./components/Header";
import ProductList from "./features/products/ProductList";
import "./index.css";
import { Product } from "./interfaces/Product";
import ProductDetails from "./features/products/ProductDetails";

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-4">
        {selectedProduct ? (
          <ProductDetails
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        ) : (
          <ProductList onSelectProduct={setSelectedProduct} />
        )}
      </main>
    </div>
  );
}

export default App;
