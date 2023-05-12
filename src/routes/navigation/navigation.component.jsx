import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import './87 - navigation.styles.scss';
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { ReactComponent as Crwn } from "../../assets/crown.svg";

const Navigation = () => {
  const { currentUser } = useContext(UserContext)


    return (
      <Fragment>
        <div className="navigation">
          <Link className="logo-container" to="/">
          <Crwn />
          </Link>
          <div className="nav-links-container">
            <Link className="nav-link" to="/shop">
                SHOP
            </Link>
            {
              currentUser ? (
              <span className="nav-link" to="/auth" onClick={signOutUser}>
                SIGN OUT
              </span>) : (
              <Link className="nav-link" to="/auth">
                SIGN IN
              </Link>
          )
            }
            
          </div>
        </div>
        <Outlet />
      </Fragment>
    );
  }

export default Navigation;