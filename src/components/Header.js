import React from "react";
import logo from "../assets/logo.png";
const Header = () => {
  return (
    <>
      {/* TOP BAR */}
      <div className="top_bar">
        🔥 Browse Event Rentals From Trusted Local Vendors
      </div>

      {/* HEADER */}
    <div className="header">
	
      <div className="logo">
		  <img src={logo} alt="PartyShare" />
	  </div>

      <div className="search">
        <input placeholder="Search rentals..." />
      </div>

      <div className="auth">
        <button className="btn-outline">Sign in</button>
        <button className="btn-primary">Register</button>
      </div>
    </div>
	</>
  );
};

export default Header;