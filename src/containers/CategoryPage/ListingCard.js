import React from "react";
import truck from "../../assets/categories/icons/truck.svg";
import pack from "../../assets/categories/icons/pack.svg";
import doller from "../../assets/categories/icons/doller.svg";
import handcart from "../../assets/categories/icons/handcart.svg";
const ListingCard = ({ item, image, price }) => {
  const slug = item.attributes.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  return (
    <div
      className="listing-card"
      onClick={() =>
        (window.location.href = `/l/${slug}/${item.id.uuid}`)
      }
    >
      {/* IMAGE */}
      <img src={image} alt="" />

      <div className="card-content">
        {/* TITLE */}
        <p className="card-title">
          {item.attributes.title}
        </p>

        {/* ICON ROW */}
        <div className="card-price">
          <div className="card-icons">
            <img src={truck} alt="delivery" />
            <img src={pack} alt="package" className="active-icon" />
            <img src={doller} alt="price" />
          </div>

          <span className="price"><span className="pri">${price} </span><span className="day">/DAY</span></span>
         </div>

        {/* FOOTER */}
        <div className="card-footer">
          
       {/* RATING */}
        <div className="card-rating">
          <span className="star">★</span>
          <span className="rating-value">5.0</span>
          <span className="reviews">(1 review)</span>
        </div>
          <button
            className="book-btn"
            onClick={(e) => {
              e.stopPropagation(); // prevent card click
              window.location.href = `/l/${slug}/${item.id.uuid}`;
            }}
          >
           <img src={handcart} alt="handcart" /> Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;