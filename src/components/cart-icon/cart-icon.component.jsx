import { useContext } from 'react';
import { CartContext } from "../../contexts/cart.context";

import {ShoppingIcon, ItemCount, CartIconContainer} from './cart-icon.styles';


const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, countItem} = useContext(CartContext);

    const toggleIsCartOpen = () => {
        setIsCartOpen(!isCartOpen)
    }

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount className='item-count'>{countItem}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;