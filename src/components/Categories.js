import React from "react";

const data = [
  "Essentials",
  "Decorations",
  "Audio, Video",
  "Catering",
  "Tents",
  "Outdoor",
];

const Categories = () => {
  return (
    <div className="categories">
      {data.map((item, i) => (
        <div key={i} className="category-card">
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
};

export default Categories;