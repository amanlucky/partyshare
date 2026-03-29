import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import searchIcon from "../assets/search.png";
import { createInstance } from "sharetribe-flex-sdk";
import { useHistory } from "react-router-dom";
import "./Header.css";

const sdk = createInstance({
  clientId: process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID,
});

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const history = useHistory();

  useEffect(() => {
    sdk.listings.query({ perPage: 50 }).then(res => {
      const listings = res.data.data;

      const uniqueCategories = [
        ...new Set(listings.map(l => l.attributes.publicData?.category)),
      ]
        .filter(Boolean)
        .map(cat => ({
          key: cat,
          label: cat.charAt(0).toUpperCase() + cat.slice(1),
        }));

      setCategories(uniqueCategories);
    });
  }, []);

  const handleSearch = () => {
    let url = "/s?";
    if (search) url += `keywords=${search}&`;
    if (selectedCategory) url += `pub_category=${selectedCategory}`;
    history.push(url);
    setShowSearch(false);
  };

  return (
    <>
      <div className="top_bar">
        🔥 Browse Event Rentals From Trusted Local Vendors
      </div>

      <div className="header">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        {/* DESKTOP */}
        <div className="desktop-only">
          <div className="search-bar">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.key} value={cat.key}>
                  {cat.label}
                </option>
              ))}
            </select>

            <div className="input-wrapper">
              <img src={searchIcon} alt="" onClick={handleSearch} />
              <input
                placeholder="Search rentals..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="auth">
            <button className="btn-outline">Sign in</button>
            <button className="btn-primary">Register</button>
          </div>
        </div>

        {/* MOBILE */}
        <div className="mobile-icons">
          <span onClick={() => setShowSearch(!showSearch)}>🔍</span>
          <span onClick={() => setShowMenu(true)}>☰</span>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      {showSearch && (
        <div className="mobile-search">
          <input
            placeholder="Search rentals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}

      {/* MOBILE MENU */}
      {showMenu && (
        <>
          <div className="overlay" onClick={() => setShowMenu(false)} />
          <div className="mobile-menu">
            <div className="close" onClick={() => setShowMenu(false)}>✕</div>
            <button><a href="/s">Browse Rentals</a></button>
            <button><a href="/list">List a Rental</a></button>
            <button><a href="/sign-in">Sign in</a></button>
            <button><a href="/register">Register</a></button>
          </div>
        </>
      )}
    </>
  );
};

export default Header;