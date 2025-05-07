import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaMobile } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import logo from "../Assets/logo.png";
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-container" style={{marginLeft: '2px',marginTop:"5px",padding:'0px'}}> {/*  width: "1380px" */}
      <div className="footer-content">
        {/* First Section: Pages Links */}
        <div className="footer-links">
          <h1 className="footer-heading">Explore</h1>
          <ul className="footer-links-list">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/blog">Blog</a></li>
            {/* <li><a href="/hotdeals">Hot Deals</a></li> */}
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Second Section: Contact Us */}
        <div className="footer-contact">
          <h2 className="footer-contact-heading">Contact Us</h2>
          <p className="footer-address">
            Task Management  Pvt Ltd,<br />
            2nd Floor, ACT Chambers,<br />
            MKK Nair Rd,<br />
            Palarivattom, Ernakulam, Kerala<br />
            682025
          </p>
          
          <div className="footer-contacts">
            <div className="footer-phone">
              <BsFillTelephoneFill /> 0484 4850512
            </div>
            <div className="footer-mobile">
              <FaMobile /> +91 7034 256 363
            </div>
            <div className="footer-mobile">
              <FaMobile /> +91 6238 743 273
            </div>
            <div className="footer-email">
              <MdOutlineMail />  contact@taskmanagment.com
            </div>
          </div>
        </div>

        {/* Third Section: Logo and Shop Name */}
        <div className="footer-logo">
          <img src={logo} alt="logo" className="footer-logo-image" />
          <div className="footer-shop-name">Task Management</div>
          <div className="footer-social-media">
            <a href="https://www.facebook.com/Freshmart"><FaFacebook size={20} className="social-icon" /></a>
            <a href="/"><FaInstagram size={20} className="social-icon" /></a>
            <a href="/"><FaLinkedin size={20} className="social-icon" /></a>
            <a href="/"><FaTwitter size={20} className="social-icon" /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
