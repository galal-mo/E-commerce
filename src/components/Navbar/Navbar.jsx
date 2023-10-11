import React, { useContext, useEffect, useState } from "react";
import style from "./Navbar.module.css";
import logo from "./freshcart-logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
export default function Navbar() {

  const location = useLocation(); // once ready it returns the 'window.location' object
    const [url, setUrl] = useState(null);
    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);

  let { usertoken, setUserToken } = useContext(UserContext)
  let navigate = useNavigate();
  function logout(){
      localStorage.removeItem('usertoken')
      setUserToken(null)
      navigate('/LogIn')

  }

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" href="#">
            <img src={logo} alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">


            {usertoken ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={url=='/'?"nav-link text-white bg-main rounded":'nav-link'} to="">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={url=='/Cart'?"nav-link text-white bg-main rounded":'nav-link'} to="Cart">
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link className={url=='/Whishlist'?"nav-link text-white bg-main rounded":'nav-link'} to="Whishlist">
                  Whishlist
                </Link>
              </li>
              <li className="nav-item">
                <Link className={url=='/Products'?"nav-link text-white bg-main rounded":'nav-link'} to="Products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className={url=='/Categories'?"nav-link text-white bg-main rounded":'nav-link'} to="Categories">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className={url=='/Brands'?"nav-link text-white bg-main rounded":'nav-link'} to="Brands">
                  Brands
                </Link>
              </li>
            </ul> : null}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center">
                <i className="mx-2 fa-brands fa-instagram"></i>
                <i className="mx-2 fa-brands fa-facebook"></i>
                <i className="mx-2 fa-brands fa-twitter"></i>
                <i className="mx-2 fa-brands fa-linkedin"></i>
                <i className="mx-2 fa-brands fa-youtube"></i>
              </li>






              {usertoken ? <li className="nav-item">
                <a className="nav-link cursor-pointer"
                  onClick={logout}>
                  Logout
                </a>
              </li> : <>
                <li className="nav-item">
                  <Link className="nav-link active" to="Login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="Register">
                    Register
                  </Link>
                </li></>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
