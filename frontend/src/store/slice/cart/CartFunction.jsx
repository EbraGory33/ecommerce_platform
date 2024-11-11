import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadCart, loadCartFail, addToCart, SetCartLocalStorage, resetCart, removeFromCart, updateCartItemQuantity } from './CartSlice'
import { FetchProduct } from '../../../server/endpoints/products/product_endpoints';
import { UserCart, AddToUserCart, RemoveFromUserCart, UpdateUserCartItem } from '../../../server/endpoints/carts/cart_endponts'; 

export function FetchUserCart(){
  const dispatch = useDispatch();
  const {AuthInfo} = useSelector((state) => state.auth);
  const getCart = async () => {
    try {
      const { data } = await UserCart(AuthInfo.access);
      console.log(data)
      localStorage.setItem("cart", JSON.stringify(data.cart_items));
      dispatch(loadCart());
    } catch (error) {
      console.log(error);
      dispatch(loadCartFail(error));
    };
  }
  useEffect(() => {
    if ( AuthInfo ) {
        getCart()
    }
  },[AuthInfo])
  return null;
}

export const AddToCart = async ( dispatch, AuthInfo, productId ) => {
    const { data } = await FetchProduct(productId);
    if (AuthInfo) {
        try {
            await AddToUserCart(AuthInfo.access, productId );
        } catch (error) {
            console.error("Error adding item to backend cart:", error);
        }
    }
    console.log("add To Cart")
    console.log(data.id, data.name, data.price,data.image)
    dispatch(addToCart({
        product_id: data.id,
        name: data.name,
        price: data.price,
        image: data.image,
        quantity: 1,
    }))
    dispatch(SetCartLocalStorage());
}

export const RemoveFromCart = async (dispatch, AuthInfo, productId) =>{
    if (AuthInfo) {
        try {
            await AddToUserCart(AuthInfo.access, productId);
        } catch (error) {
            console.error("Error removing item to backend cart:", error);
        }
    }
    dispatch(removeFromCart(productId))
    console.log("item: Removed");
    dispatch(SetCartLocalStorage());
}

export const UpdateCartItemQuantity = async (dispatch, AuthInfo, productId, newQuantity) =>{
    if (AuthInfo) {
        try {
            UpdateUserCartItem( AuthInfo.access, productId, newQuantity)
        } catch (error) {
            console.error("Error updating item quantity in backend cart:", error);
        }
    }

    dispatch(updateCartItemQuantity({productId, newQuantity}))
    console.log("item: Quantity Updated");
    dispatch(SetCartLocalStorage());
}
