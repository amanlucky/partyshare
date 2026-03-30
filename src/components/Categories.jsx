import React, { useRef } from "react";
import categories from "./categoriesData";
import "./categories.css";

const Categories = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth / 2;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="categories-wrapper">
      <button className="arrow left" onClick={() => scroll("left")}>◀</button>
      <button className="arrow right" onClick={() => scroll("right")}>▶</button>

      <div ref={scrollRef} className="categories-slider">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`/category/${cat.slug}`}  // 🔥 THIS FIXES EVERYTHING
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="category-card">
              <p>{cat.name}</p>
              <img src={cat.image} alt={cat.name} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Categories;