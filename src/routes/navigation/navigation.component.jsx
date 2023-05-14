import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import {NavigationContainer, LogoContainer, NavLinks, NavLink} from './navigation.styles';
 

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";
import { ReactComponent as Crwn } from "../../assets/crown.svg";



const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(CartContext)

    return (
      <Fragment>
        <NavigationContainer>
          <LogoContainer to="/">
            <Crwn />
          </LogoContainer>
          <NavLinks>
            <NavLink to="/shop">
                SHOP
            </NavLink>
            {
              currentUser ? (
              <NavLink as='span' to="/auth" onClick={signOutUser}>
                SIGN OUT
              </NavLink>) : (
              <NavLink to="/auth">
                SIGN IN
              </NavLink>
          )
            }
            <CartIcon />
            </NavLinks>
          {
            isCartOpen && <CartDropdown />
          }
          </NavigationContainer>
        <Outlet />
      </Fragment>
    );
  }

export default Navigation;