import { createContext, useState, useEffect ,useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if(existingCartItem) {
        return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
        )
    }

    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    if(existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
    }

    return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
    ? {...cartItem, quantity: cartItem.quantity - 1}
    : cartItem
    )
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) =>cartItem.id !== cartItemToClear.id) 





export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    // addItemToCart: () => {},
    countItem: () => {},
    // removeItemFromCart: () => {},
    // clearItemFromCart: () => {},
    totalPrice: 0,
    cartCount: 0,
    cartTotal: 0
})

const  INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case 'SET_CART_ITEMS':
            return {
                ...state,
                ...payload
            }
        case 'SET_IS_CART_OPEN':
            return {
                ...state,
                isCartOpen: payload
            }
        default :
            throw new Error(`Unhandled type of ${type} in cartReducer`)
    }
}


export const CartProvider = ({ children }) => {

    const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch ] = useReducer(cartReducer, INITIAL_STATE);
    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) =>  total + cartItem.quantity, 0)
        const newCartTotal = newCartItems.reduce((acc, cartItem) => acc + cartItem.quantity * cartItem.price, 0 )
        
        dispatch({type: 'SET_CART_ITEMS', payload: {
            cartItems: newCartItems,
            cartTotal: newCartTotal,
            cartCount: newCartCount
        }})

    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItems)
    }

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove)
        updateCartItemsReducer(newCartItems)
    }

    const clearItemFromCart = (productToRemove) => {
        const newCartItems = clearCartItem(cartItems, productToRemove)
        updateCartItemsReducer(newCartItems)
    }

    const setIsCartOpen = (bool) => {
        dispatch( {type: 'SET_IS_CART_OPEN', payload: bool})
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartTotal, cartCount} 
    
    
    

    return (
        <CartContext.Provider value={value}> {children} </CartContext.Provider>
    );
}