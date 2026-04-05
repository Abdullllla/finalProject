import React, { useContext } from 'react';
import styles from './NavBar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/Logo-t-online.png';
import { counterContext } from '../../Context/Counter';
import { TockenContext } from '../../Context/Token';
import { CartContent } from '../../Context/cartContent';

function NavBar(){

  let {token, setToken} = useContext(TockenContext);
  let Navigate = useNavigate();
  let {counter} = useContext (counterContext);
  let{numOfCartItems,} = useContext(CartContent);


// let Navigate = useNavigate()

function logOut() {
  localStorage.removeItem("userToken")
  setToken(null);
  Navigate("/login")

}


  return ( 
     <>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to={'home'}>
        <img src = {logo}  alt="" /> {counter};
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">

      {token ?
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to={'home'}>
              Home
          </Link>
        </li>
              <li className="nav-item">
            <Link className="nav-link" aria-current="page" to={'products'}>
                Product
            </Link>
          </li>
             <li className="nav-item">
          <Link className="nav-link" aria-current="page" to={'brands'}>
              Brands 
          </Link>
        </li>
             <li className="nav-item">
          <Link className="nav-link" aria-current="page" to={'categories'}>
              Categories
          </Link>
        </li>
      </ul>: null}
      
      <ul className="ms-auto navbar-nav justify-content-center">

        <li className="nav-item align-self-center">
          <i className=" fa-brands fa-instagram"></i>
           <i className=" fa-brands fa-facebook"></i>
            <i className=" fa-brands fa-linkedin"></i>

        </li>
    
{token ? <><li className="nav-item">
          <button className="nav-link" onClick={logOut} >LogOut</button>
        </li>
         <li className="nav-item">
          <Link className="nav-link" aria-current="page" to={'cart'}>
              
              <i className='fa fa-shopping-basket text-main'></i>
              <span className='bg-main text-white p-1 rounded'>{numOfCartItems}</span>
          </Link>
        </li></>

        : 
        <>
                     <li className="nav-item">
          <Link className="nav-link" aria-current="page" to={'register'}>
              register
          </Link>
        </li>
             <li className="nav-item">
          <Link className="nav-link" aria-current="page" to={'login'}>
              Login
          </Link>
        </li>

        </>}
       

         

      </ul>
    </div>
  </div>
</nav>

    </>
  )
}

export default NavBar
