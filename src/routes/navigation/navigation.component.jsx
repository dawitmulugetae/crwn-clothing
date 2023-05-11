import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import './87 - navigation.styles.scss';
import { ReactComponent as Crwn } from "../../assets/crown.svg";

const Navigation = () => {
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
            <Link className="nav-link" to="/auth">
                SIGN IN
            </Link>
          </div>
        </div>
        <Outlet />
      </Fragment>
    );
  }

export default Navigation;