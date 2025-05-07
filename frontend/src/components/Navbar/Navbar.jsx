import React from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import { useContext} from "react";

import {  FaTasks } from 'react-icons/fa'; // Importing icons

import "bootstrap/dist/css/bootstrap.min.css"; //add if bootstrapnav need or add cdn link at index.html
import "bootstrap/dist/js/bootstrap.bundle.min.js"; //add if bootstrapnav need or add cdn link at index.html

import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  
  
  const { username,isAuthorized,isLogin, logout ,CartItemsCount} = useContext(AuthContext); // Access context values
  
  // Handle Add to Cart
  const handleCart = async (pid, price,pic,pname) => {
    if (!username || !isAuthorized) {
      alert('You need to be logged in to add tasks.');
      return;
    }}
  return (
    <div style={{marginRight:"0px"}}>
      {/*   we can use link or href..here bootstrap nav is used */}
      <Bootstrapnav 
        handleCart={handleCart}
        isLogin={isLogin} // Pass authorization status
        username={username} // Pass username if authorized
        logout={logout} // Pass logout function
        CartItemsCount={CartItemsCount}
      ></Bootstrapnav>
  
    </div>
  );
};
export default Navbar;

function Bootstrapnav({ handleCart,isLogin,username,logout,CartItemsCount }) {
  return (
  // <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{marginLeft: '2px',padding:'0px'}}>
  
 <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{marginLeft: '2px',padding:'0px'}} >   {/* style={{marginLeft: '2px',padding:'0px',width: "1380px"}} */}
  <div className="container-fluid" >
    {/* Wrap TaskManagement and logo in the same container */}
    <Link className="navbar-brand d-flex align-items-center" to="/">
      <img src={logo} alt="logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} /> {/* Add logo */}
      Task Management
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
  
      <div style={{ width: '8rem', marginLeft: '2px' }}>
       <Link to="/categories" > 
         
       {/* <Link to="/categories/:cat" > */}
          <button className="btn btn-outline-success">List all User Tasks</button>
          </Link>

          
      </div>
     
      
      
    <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ width: '20rem', marginLeft: '5px' }} >
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contact">Contact</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/services">Services</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/blog">Blog</Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
          <button onClick={() => handleCart()} className="btn btn-outline-success">Registered User Dashboard</button>
          
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/products">Add Task</Link></li>
            <li><hr className="dropdown-divider"></hr></li>
            <li><Link className="dropdown-item" to="/listproducts"> Task List(Update/Delete)</Link></li>
            {/* <li><hr className="dropdown-divider"></hr></li>
            <li><Link className="dropdown-item" to="services">Services</Link></li> */}
          </ul>
        </li>
        <li className="nav-item">
        {isLogin ? (  
        <span className="navbar-text text-light me-2">Hello, <br/>Please Login..</span>
        ):(<span className="navbar-text text-light me-2">Hello, {username} </span>)}
  
        </li>
      </ul>
       
      <div className="nav-login-cart" >
      <li className="nav-item">  
      {isLogin ? (
              <Link to="/login">
                <button className="btn btn-outline-success">Login</button>
              </Link>
            ):(
        
                <button onClick={logout} className="btn btn-outline-success">Logout</button>
             
            ) }
       </li>      
       <li className="nav-item">    
       <Link to="/listproducts" className="cart-link"> <FaTasks className="cart-icon" /><div className="nav-cart-count">Your Task: {CartItemsCount}</div></Link>
       </li> 
      </div>
     
      
      </div>


    
  </div>
</nav>

  );
}


