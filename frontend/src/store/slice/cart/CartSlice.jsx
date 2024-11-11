import { createSlice, current } from "@reduxjs/toolkit";

const loadCartItems = () => {
    const data = localStorage.getItem("cart");
    const cartItemsFromStorage = data ? JSON.parse(data) : [];
    return cartItemsFromStorage;
}

const cartSlice = createSlice({
  name:"Cart",
  initialState:{
    CartInfo: loadCartItems(),
    error: null,
  },
  reducers: {
    loadCart: (state, action) => {
        state.CartInfo = loadCartItems();
    },
    loadCartFail: (state, action) => {
        state.error = action.payload;
    },
    addToCart: (state, action) => {
        const product = action.payload;
        const existingProduct = state.CartInfo.find(item => item.product_id === product.product_id);
  
        if (existingProduct) {
          console.log("Cart Item quantity has been updated")
          existingProduct.quantity += 1;
          /*return {
            ...state,
            CartInfo: state.CartInfo.map((x) =>
              x.product_id === existingProduct.product_id ? product : x
            ),
          };*/
        } else {
          console.log("Item added to Cart")
          state.CartInfo.push({ ...product, quantity: 1 });
        }
    },
    SetCartLocalStorage: (state, action) => {
        localStorage.setItem(
            "cart", JSON.stringify(
                current(state.CartInfo)
            )
        );
    },

    updateCartItemQuantity: (state, action) => {
        const { productId, newQuantity } = action.payload;
        const product = state.CartInfo.find(item => item.product_id === productId);
        if (product && newQuantity > 0) {
            product.quantity = newQuantity;
        }
    },

    removeFromCart: (state, action) => {
        const productId = action.payload;
        state.CartInfo = state.CartInfo.filter(item => item.product_id !== productId);
    },

    resetCart: (state) => {
        state.CartInfo = [];
        localStorage.removeItem("cart");
    },    
  },
});

export const { loadCart, loadCartFail, addToCart, SetCartLocalStorage, updateCartItemQuantity, removeFromCart, resetCart} =
cartSlice.actions;
export default cartSlice.reducer;