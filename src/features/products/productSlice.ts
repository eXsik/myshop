import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../interfaces/Product";
import { products } from "../../data";

interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: products
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            const index = state.products.findIndex(product => product.id !== action.payload.id);

            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
        decreaseQuantity: (state, action: PayloadAction<{ productId: number, quantity: number }>) => {
            const { productId, quantity } = action.payload;
            const product = state.products.find(item => item.id === productId);

            if (product && product.availableQuantity >= quantity) {
                product.availableQuantity -= quantity;
            }
        }
    }
});

export const { setProducts, addProduct, updateProduct, removeProduct, decreaseQuantity } = productSlice.actions;
export const selectProducts = (state: { products: ProductState }) => state.products.products;

export default productSlice.reducer;