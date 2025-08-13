import { createSlice } from "@reduxjs/toolkit";



const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        // addItem: (state, action) => {
        //     state.items.push(action.payload);
        // }

        addItem: (state, action) => {
            const product = action.payload;
            const itemFound = state.items.find(item => item.id === product.id);
            if (itemFound) {
                itemFound.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            const Id = action.payload;
            state.items = state.items.filter(item => item.id !== Id);
        },
        incrementQuantity: (state, action) => {
            const Id = action.payload;
            const itemFound = state.items.find(item => item.id === Id);
            if (itemFound) {
                itemFound.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const Id = action.payload;
            const item = state.items.find(item => item.id === Id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        calculateTotalPrice: (state) => {
            let total = 0;
            for (let i = 0; i < state.items.length; i++) {
                const item = state.items[i];
                const discountedPrice = item.price * (1 - item.discountPercentage / 100);
                total += discountedPrice * item.quantity;
            }
            state.totalPrice = total;
        }

    }
})



export const { addItem, removeItem, incrementQuantity, decrementQuantity, calculateTotalPrice } = cartSlice.actions;

export default cartSlice.reducer;