import React, { useEffect, useState } from "react";
import { createInstance } from "sharetribe-flex-sdk";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./CategoryPage.css";

import ListingCard from "./ListingCard";
import CategoryIcons from "./CategoryIcons";
import MostRentedSection from "./MostRentedSection";

const sdk = createInstance({
  clientId: process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID,
});

const CategoryPage = (props) => {
  const [listings, setListings] = useState([]);
  const [included, setIncluded] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");

  const category = props.params.slug;

  // ✅ FORMAT CATEGORY NAME (IMPORTANT)
  const formattedCategory = category
    .replaceAll("-", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const fetchListings = () => {
    setLoading(true);

    sdk.listings
      .query({
        perPage: 80,
        pub_category: category,
        keywords: keyword || undefined,
        include: ["images"],
        "fields.image": ["variants"],
      })
      .then((res) => {
        setListings(res.data.data);
        setIncluded(res.data.included || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("ERROR:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchListings();
  }, [category]);

  // ✅ IMAGE MAP
  const imageMap = {};
  included.forEach((img) => {
    if (img.type === "image") {
      imageMap[img.id.uuid] = img;
    }
  });

  return (
    <>
      <Header />

      <div className="category-page">
        
        {/* ✅ MAIN TITLE */}
        <h1 className="category-title">{formattedCategory}</h1>

        {/* ✅ CATEGORY ICONS */}
        <CategoryIcons />

        {/* ✅ MOST RENTED SECTION */}
        <MostRentedSection />

        {/* ✅ LIST SECTION HEADER (MATCH SCREENSHOT) */}
        <div className="section-header">
          <h2 className="section-title">{formattedCategory}</h2>
          <span className="see-all">See All →</span>
        </div>

        {/* LOADING */}
        {loading ? (
          <p>Loading rentals...</p>
        ) : (
          <div className="listing-grid">
            {listings.map((item) => {
              const imageRefs = item.relationships?.images?.data;

              let image = "";

              if (imageRefs && imageRefs.length > 0) {
                const imageId = imageRefs[0].id.uuid;
                const imageData = imageMap[imageId];

                if (imageData?.attributes?.variants) {
                  image =
                    imageData.attributes.variants["scaled-medium"]?.url ||
                    imageData.attributes.variants["scaled-large"]?.url ||
                    imageData.attributes.variants.default?.url ||
                    "";
                }
              }

              // fallback
              if (!image) {
                image = `https://picsum.photos/300/200?random=${item.id.uuid}`;
              }

              const price = item.attributes.price?.amount / 100;

              return (
                <ListingCard
                  key={item.id.uuid}
                  item={item}
                  image={image}
                  price={price}
                />
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default CategoryPage;