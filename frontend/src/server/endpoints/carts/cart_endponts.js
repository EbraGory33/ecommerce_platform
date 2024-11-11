import { useAxiosClient, useAxiosClientWithToken } from "../../api";

export function UserCart( token ) {
    return useAxiosClientWithToken(token).get(`/cart/getUserCart`)
}

export function AddToUserCart ( token, product_id ){
    return useAxiosClientWithToken(token).post(`/cart/addToCart/${product_id}`)
}

export function RemoveFromUserCart( token, product_id ){
    return useAxiosClientWithToken(token).delete(`/cart/removeItem/product/${product_id}`)
}

export function UpdateUserCartItem( token, product_id, quantity){
    return useAxiosClientWithToken(token).patch(`/cart/updateCartItems/${product_id}`,{'quantity':quantity})
}