import React from "react";

const Featured = () => {
  return (
    <div className="featured">
      <h2>Featured Rentals</h2>

      <div className="cards">
        <div className="card">
          <img src="https://m.media-amazon.com/images/I/61zZ3YhKcDL.jpg" />
          <h3>Hanging Egg Chair</h3>
          <p>$20/day</p>
        </div>

        <div className="card">
          <img src="https://m.media-amazon.com/images/I/81F3J1p7YkL.jpg" />
          <h3>Dining Set</h3>
          <p>$90/day</p>
        </div>

        <div className="card">
          <img src="https://m.media-amazon.com/images/I/71r8sXyTbUL.jpg" />
          <h3>LED Lights</h3>
          <p>$30/day</p>
        </div>
      </div>
    </div>
  );
};

export default Featured;