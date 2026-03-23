import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import searchIcon from "../assets/search.png";
import { createInstance } from "sharetribe-flex-sdk";
import { useHistory } from "react-router-dom";
import "./Header.css";

// Create SDK instance
const sdk = createInstance({
  clientId: process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID,
});

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

const history = useHistory();
 
  useEffect(() => {
    sdk.listings
      .query({ perPage: 50 })
      .then(res => {
        const listings = res.data.data;

        const uniqueCategories = [
          ...new Set(
            listings.map(l => l.attributes.publicData?.category)
          ),
        ]
          .filter(Boolean)
          .map(cat => ({
            key: cat,
            label: cat.charAt(0).toUpperCase() + cat.slice(1),
          }));

        setCategories(uniqueCategories);
      })
      .catch(err => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  // 🔥 MAIN SEARCH FUNCTION
const handleSearch = (categoryValue = selectedCategory, searchValue = search) => {
  let url = "/s?";

  if (searchValue) url += `keywords=${searchValue}&`;
  if (categoryValue) url += `pub_category=${categoryValue}`;

  history.push(url);
};

  // 🔥 ENTER KEY SUPPORT
const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
};

  return (
    <>
      {/* TOP BAR */}
      <div className="top_bar">
        🔥 Browse Event Rentals From Trusted Local Vendors
      </div>

      {/* HEADER */}
      <div className="header">
        {/* LOGO */}
        <div className="logo">
          <img src={logo} alt="PartyShare" />
        </div>

        {/* SEARCH BAR */}
        <div className="search-bar">
          {/* CATEGORY */}
          <div className="dropdown-wrapper">
            <select
              className="category-dropdown"
              value={selectedCategory}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedCategory(value);

                // 🔥 trigger search immediately
                handleSearch(value, search);
              }}
            >
              <option value="">All Categories</option>

              {categories.map(cat => (
                <option key={cat.key} value={cat.key}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* INPUT */}
          <div className="input-wrapper">
            <span className="search-icon" onClick={handleSearch}><img src={searchIcon} alt="search" /></span>
            <input
              placeholder="Search rentals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        {/* AUTH BUTTONS */}
        <div className="auth">
          <button className="btn-outline">Sign in</button>
          <button className="btn-primary">Register</button>
        </div>
      </div>
    </>
  );
};

export default Header;