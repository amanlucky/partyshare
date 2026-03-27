import React from "react";
import "./trusted.css";

// ✅ import your icons
import verified from "../assets/verified.png";
import rated from "../assets/rated.png";
import fast from "../assets/fast.png";
import secure from "../assets/secure.png";

const Trusted = () => {
  const items = [
    {
      icon: verified,
      title: "Verified Vendors",
      desc: "All vendors are verified before listing rentals.",
      color: "blue",
    },
    {
      icon: rated,
      title: "Rated Renters",
      desc: "Vendors can review renters to help maintain a trusted community.",
      color: "green",
    },
    {
      icon: fast,
      title: "Fast & Easy",
      desc: "Find rentals quickly with simple browsing and booking.",
      color: "purple",
    },
    {
      icon: secure,
      title: "Secure Payments",
      desc: "All transactions are protected through secure checkout.",
      color: "orange",
    },
  ];

  return (
    <div className="trusted-wrapper">

      <h2 className="trusted-title">Trusted Event Rentals</h2>

      <div className="trusted-grid">
        {items.map((item, index) => (
          <div className="trusted-card" key={index}>

            <div className={`icon-box ${item.color}`}>
              <img src={item.icon} alt={item.title} />
            </div>

            <div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Trusted;