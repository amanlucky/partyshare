import React from "react";
import "./featured.css";

import chair from "../assets/chair.png";
import dining from "../assets/dining.png";
import light1 from "../assets/lightl.png";
import light2 from "../assets/lightr.png";


const Featured = () => {
  return (
    <div className="featured-wrapper">
      <div className="featured-header">
        <h2>Featured Rentals</h2>
        <a href="#">See All →</a>
      </div>

      <div className="featured-grid">
        
        {/* BIG CARD */}
        <div className="featured-card big">
          

          <div className="featured-content">
            <span className="badge">SAVE 25%</span>
            <h3>Hanging Egg Chair</h3>
            <p>
              The Melodic Monster of Sonic Delights and Harmonious Rhythms
            </p>

            <div className="price-row">
              <button className="book-btn">🛒 Book</button>
              <span>$20.00 <small>/DAY</small></span>
            </div>
          </div>

          <img src={chair} alt="chair" />
        </div>

        {/* CARD 2 */}
        <div className="featured-card ft">
          <span className="badge">SAVE 40%</span>
          <h3>Haven Dining Set</h3>

          <button className="book-btn light">🛒 Book</button>
          <p className="price">$90.00 <small>/DAY</small></p>

          <img src={dining} alt="dining" />
        </div>

        {/* CARD 3 */}
        <div className="featured-card fth">
            <span className="badge">SAVE 40%</span>

            <h3>LED Par Lights COB 200W</h3>

            <button className="book-btn light">🛒 Book</button>

            <p className="price-text">
              $30.00 <small>/DAY</small>
            </p>

            {/* 🔥 MULTIPLE IMAGES */}
            <div className="multi-images">
              <img src={light1} alt="light1" />
              <img src={light2} alt="light2" />
            </div>
          </div>

      </div>
    </div>
  );
};

export default Featured;