import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../interfaces/Cart";

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            existingItem ? existingItem.quantity += action.payload.quantity : state.items.push(action.payload);
        },
        removeItemFromCart: (state, action: PayloadAction<Number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number, quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);

            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});

export const { addItemToCart, removeItemFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectTotalAmount = (state: { cart: CartState }) => {
    return state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
};
export default cartSlice.reducer;