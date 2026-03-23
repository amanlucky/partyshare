import React from "react";
import "./hero.css";
import heroImg from "../assets/hero.png";       // your people image
import heroBg from "../assets/hero-fbg.png";     // your background shape


const Hero = () => {
  //here i am
  return (
    <section className="hero">
      {/* Background shape */}
      <img src={heroBg} alt="" className="hero-bg" />

      <div className="hero-container">
        {/* LEFT CONTENT */}
        <div className="hero-left">
          <h5>THE EVENT RENTAL MARKETPLACE</h5>
  
          <h1>
            Everything You Need For <br />
            An Event — <span>In One Place</span>
          </h1>

          <p>
            Browse tents, décor, furniture, lighting, catering equipment,
            and more from trusted local event rental vendors.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">Browse Rentals</button>
            <button className="btn-outline">List a Rental</button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-right">
          <img src={heroImg} alt="hero" />
        </div>
      </div>
    </section>
  );
};

export default Hero;