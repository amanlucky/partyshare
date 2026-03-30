import React, { useEffect, useState } from "react";
import { createInstance } from "sharetribe-flex-sdk"; // ✅ keep this (web template)
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./CategoryPage.css";

const sdk = createInstance({
  clientId: process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID,
});

const CategoryPage = (props) => {
  const [listings, setListings] = useState([]);
  const [included, setIncluded] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");

  const category = props.params.slug;

  const fetchListings = () => {
    setLoading(true);

    sdk.listings
      .query({
        perPage: 80,
        pub_category: category,
        keywords: keyword || undefined,

        include: ["images"], // ✅ required
        "fields.image": ["variants"], // ✅ required
      })
      .then((res) => {
        console.log("FULL RESPONSE:", res.data);
        console.log("INCLUDED:", res.data.included);

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

  // ✅ CREATE IMAGE MAP (IMPORTANT)
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
        <h1 className="category-title">
          {category.replace("-", " ")}
        </h1>

        {/* SEARCH */}
        <div className="category-search">
          <input
            placeholder="Search rentals..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button onClick={fetchListings}>Search</button>
        </div>

        {/* LOADING */}
        {loading ? (
          <p>Loading rentals...</p>
        ) : (
          <div className="grid">
            {listings.map((item) => {
              const imageRefs =
                item.relationships?.images?.data;

              let image = "";

              if (imageRefs && imageRefs.length > 0) {
                const imageId = imageRefs[0].id.uuid; // ✅ FIX

                const imageData = imageMap[imageId]; // ✅ FIX

                // 🔍 DEBUG
                console.log("------");
                console.log("LISTING:", item.id.uuid);
                console.log("IMAGE ID:", imageId);
                console.log("IMAGE DATA:", imageData);

                if (imageData?.attributes?.variants) {
                  image =
                    imageData.attributes.variants["scaled-medium"]?.url ||
                    imageData.attributes.variants["scaled-large"]?.url ||
                    imageData.attributes.variants.default?.url ||
                    "";
                }
              }

              // ❗ fallback only if no image
              if (!image) {
                console.warn("FALLBACK USED:", item.id.uuid);

                image = `https://picsum.photos/300/200?random=${item.id.uuid}`;
              }

              const price =
                item.attributes.price?.amount / 100;

              const slug = item.attributes.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-");

              return (
                <div
                  key={item.id.uuid}
                  className="card"
                  onClick={() =>
                    (window.location.href = `/l/${slug}/${item.id.uuid}`)
                  }
                >
                  <img src={image} alt="" />

                  <div className="card-body">
                    <p className="card-title">
                      {item.attributes.title}
                    </p>

                    <p className="card-price">
                      ₹{price} / day
                    </p>
                  </div>
                </div>
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