import React from "react";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h5>THE EVENT RENTAL MARKETPLACE</h5>
        <h1>
          LUCKY##Everything You Need For <br /> An Event — In One Place 
        </h1>
        <p>
          Browse tents, décor, furniture, lighting, catering equipment
          and more from trusted vendors.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary">Browse Rentals</button>
          <button className="btn-outline">List a Rental</button>
        </div>
      </div>

      <div className="hero-right">
        <img src="https://cdn-icons-png.flaticon.com/512/3063/3063827.png" alt="" />
      </div>
    </div>
  );
};

export default Hero;