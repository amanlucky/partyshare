import React from "react";
import "./popular.css";

// ✅ Import your images
import dining from "../assets/dining.png";
import tent from "../assets/tent.png";
import golf from "../assets/golf.png";
import sofa from "../assets/sofa.png";

import truck from "../assets/truck.png";
import dliver from "../assets/dliver.png";
import doller from "../assets/doller.png";
import cart from "../assets/cart.png";
const Popular = () => {
  const items = [
    {
      id: 1,
      title: "Teak Outdoor Dining Table Set (8–10 Seater)",
      price: "$25.00",
      img: dining,
    },
    {
      id: 2,
      title: "Large White Event Tent Canopy",
      price: "$99.00",
      img: tent,
    },
    {
      id: 3,
      title: "Indoor Golf Simulator with Projection Screen",
      price: "$79.00",
      img: golf,
    },
    {
      id: 4,
      title: "Outdoor Wicker Sectional Sofa Set",
      price: "$55.00",
      img: sofa,
    },
  ];

  return (
    <div className="popular-wrapper">

      {/* HEADER */}
      <div className="popular-header">
        <h2>Popular Rentals</h2>
        <a href="#">See All →</a>
      </div>

      {/* GRID */}
      <div className="popular-grid">
        {items.map((item) => (
          <div className="popular-card" key={item.id}>
            
            {/* IMAGE */}
            <div className="image-box">
              <img src={item.img} alt={item.title} />
            </div>

            {/* TITLE */}
            <h3>{item.title}</h3>
            <div className="iconsprice">
            {/* ICONS */}
              <div className="icons">
                <span><img src={truck} alt="" className="truck" /></span>
                <span><img src={dliver} alt="" className="truck" /></span>
                <span><img src={doller} alt="" className="truck" /></span>
              </div>

              {/* PRICE */}
              <div className="price-row">
                <span className="price">{item.price} <small>/DAY</small></span>
              </div>
            </div>
            {/* FOOTER */}
            <div className="card-footer">
              <span className="rating">⭐ 5.0 (23 reviews)</span>
              <button className="book-btn light">🛒 Book</button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;