import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './cart-dropdown.styles';
import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
    const { cartItems} = useContext(CartContext)
    const navigate = useNavigate();

    const checkoutHandler = () => {
        navigate('/checkout')
    }
    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (
                        cartItems.map(item => <CartItem key={item.id} cartItem={item} />)
                    ) : (
                        <EmptyMessage>Your Cart is empty</EmptyMessage>
                    )
                }
                
            </CartItems>

            <Button onClick={checkoutHandler}>GO TO CHECKOUT</Button>

            
        </CartDropdownContainer>
    )
}

export default CartDropdown;