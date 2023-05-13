import './cart-dropdown.styles.scss';
import Button from '../button/button.component';

const CartDropdown = () => {
    return (
        <div className='cart-dropdown-container'>
            <div className='empty-message'/>
            <Button>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;