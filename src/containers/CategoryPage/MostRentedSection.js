import React from "react";
import "./CategoryPage.css";

// 👉 import your images
import tent1 from "../../assets/categories/family-tent.png";
import tent2 from "../../assets/categories/wedding-tent.png";

const MostRentedSection = () => {
  return (
    <div className="most-rented">
      
      {/* HEADER */}
      <div className="section-header">
        <h2>Most Rented in This Category</h2>
        <span className="see-all">See All →</span>
      </div>

      {/* CARDS */}
      <div className="most-rented-grid">

        {/* LEFT CARD */}
        <div className="rent-card blue">
          <div className="rent-content">
            <span className="badge">SAVE 25%</span>
            <h3>Family Camping Tent</h3>
            <p>
              Spacious weather-resistant event and camping tent with extended canopy and mesh ventilation panels.
            </p>

            <div className="rent-footer">
              <button className="book-btn">Book</button>
              <span className="price">$20.00 / DAY</span>
            </div>
          </div>

          <img src={tent1} alt="" />
        </div>

        {/* RIGHT CARD */}
        <div className="rent-card peach">
          <div className="rent-content">
            <span className="badge">SAVE 25%</span>
            <h3>Large wedding tent</h3>
            <p>
              The best large wedding tent for your outdoor celebration should offer ample space...
            </p>

            <div className="rent-footer">
              <button className="book-btn">Book</button>
              <span className="price">$20.00 / DAY</span>
            </div>
          </div>

          <img src={tent2} alt="" />
        </div>

      </div>
    </div>
  );
};

export default MostRentedSection;