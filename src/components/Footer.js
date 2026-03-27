import React from "react";
import "./footer.css";

import logo from "../assets/footer-logo.png";
import fb from "../assets/fb.svg";
import xt from "../assets/xt.svg";
import ig from "../assets/ig.svg";
import lin from "../assets/lin.svg";
import categories from "../assets/categories.svg";
import customercare from "../assets/customercare.svg";
import aboutus from "../assets/aboutus.svg";
import rightarrow from "../assets/rightarrow.svg";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-left">
          <div className="footer-left-content">
          <img src={logo} alt="PartyShare" className="footer-logo" />

          <p>John A. Wilson Building</p>
          <p>1350 Pennsylvania Ave., NW</p>
          <p>Suite 326</p>
          <p>Phone number: (202) 724-7173</p>
          <p>Email: contact@partyshare.org</p>

          <div className="socials">
            <span><img src={fb} alt="facebook" className="footer-socialicon" /></span>
            <span><img src={xt} alt="twitter" className="footer-socialicon" /></span>
            <span><img src={ig} alt="instagram" className="footer-socialicon" /></span>
            <span><img src={lin} alt="linkedin" className="footer-socialicon" /></span>
          </div>
          </div>
        <div className="copyrightfooter">
          <p>© 2026 All rights reserved</p>
        </div>
        </div>

        {/* CATEGORIES */}
        <div className="footer-column">
          <h4><img src={categories} alt="facebook" className="footer-categories" />Categories</h4>
          <ul>
            <li>Tents & Temporary Structures</li>
            <li>Climate Control</li>
            <li>Lighting</li>
            <li>Staging, Platforms</li>
            <li>Audio, Video</li>
            <li>Furniture</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>&nbsp;</h4>
          <ul>
            <li>Bars & Tools</li>
            <li>Décor & Styling</li>
            <li>Entertainment</li>
            <li>Photography</li>
            <li>Flooring</li>
            <li>Signage</li>
          </ul>
        </div>

        {/* CUSTOMER CARE */}
        <div className="footer-column cust-care">
          <h4><img src={customercare} alt="customer care" className="footer-cc" />Customer Care</h4>
          <ul>
            <li><img src={rightarrow} alt="rightarrow" className="footer-rightarrow" />My Account</li>
            <li><img src={rightarrow} alt="rightarrow" className="footer-rightarrow" />Customer Service</li>
            <li><img src={rightarrow} alt="rightarrow" className="footer-rightarrow" />FAQs</li>
            <li><img src={rightarrow} alt="rightarrow" className="footer-rightarrow" />Become a Vendor</li>
          </ul>
        </div>

        {/* ABOUT */}
        <div className="footer-column about-us">
          <h4><img src={aboutus} alt="about us" className="footer-abu" />About Us</h4>
          <ul>
            <li><img src={rightarrow} alt="rightarrow" className="footer-rightarrow" />Company</li>
            <li><img src={rightarrow} alt="rightarrow" className="footer-rightarrow" />Contact Us</li>
            <li><img src={rightarrow} alt="rightarrow" className="footer-rightarrow" />Terms of Use</li>
            <li><img src={rightarrow} alt="rightarrow" className="footer-rightarrow" />Privacy Statement</li>
          </ul>
        </div>

      </div>

    </footer>
  );
};

export default Footer;