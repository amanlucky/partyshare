import React, { useState } from "react";
import "./CategoryPage.css";
import frame from "../../assets/categories/frame-tents.png";
import pole from "../../assets/categories/pole-tents.png";
import clear from "../../assets/categories/clear-tents.png";
import marquees from "../../assets/categories/marquees.png";
import canopies from "../../assets/categories/canopies.png";
import band from "../../assets/categories/band-shells.png";
import pavilion from "../../assets/categories/pavilions.png";

const categories = [
  { name: "Frame Tents", icon: frame },
  { name: "Pole Tents", icon: pole },
  { name: "Clear Tents", icon: clear },
  { name: "Marquees & Pagodas", icon: marquees },
  { name: "Canopies & Pop-ups", icon: canopies },
  { name: "Band shells", icon: band },
  { name: "Pavilions & Stretch tents", icon: pavilion },
];

const CategoryIcons = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="category-icons">
      {categories.map((cat, i) => (
        <div
          key={i}
          className={`icon-card ${active === i ? "active" : ""}`}
          onClick={() => setActive(i)}
        >
         
          <p>{cat.name}</p>
           <img src={cat.icon} alt="" />
        </div>
      ))}
    </div>
  );
};

export default CategoryIcons;