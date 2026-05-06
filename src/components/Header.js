import { Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import logo from "../assets/logo.png";
import searchIcon from "../assets/search.png";
import { createInstance } from "sharetribe-flex-sdk";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../ducks/auth.duck";
import "./Header.css";

const sdk = createInstance({
  clientId: process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID,
});

const Header = ({ currentUser, isAuthenticated, onLogout }) => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const history = useHistory();
  const dropdownRef = useRef();

  // 🔹 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Fetch categories (UNCHANGED)
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

  // 🔹 Search (UNCHANGED)
  const handleSearch = () => {
    let url = "/s?";
    if (search) url += `keywords=${search}&`;
    if (selectedCategory) url += `pub_category=${selectedCategory}`;
    history.push(url);
    setShowSearch(false);
  };

  // 🔹 Initials
  const getInitials = name => {
    if (!name) return "";
    return name
      .split(" ")
      .slice(0, 2)
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  const displayName = currentUser?.attributes?.profile?.displayName || "";
  const firstName = displayName.split(" ")[0] || "";
  const initials = getInitials(displayName);

  const avatarUrl =
    currentUser?.profileImage?.attributes?.variants?.squareSmall?.url;

  // 🔹 Logout
  const handleLogout = () => {
    onLogout(() => history.push("/"));
  };

  return (
    <>
      <div className="top_bar">
        🔥 Browse Event Rentals From Trusted Local Vendors
      </div>

      <div className="header">
        {/* LOGO */}
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        {/* DESKTOP */}
        <div className="desktop-only">
          {/* SEARCH (UNCHANGED) */}
          <div className="search-bar">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
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
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* AUTH AREA */}
          <div className="auth">
            {isAuthenticated && currentUser ? (
              <div className="userMenu" ref={dropdownRef}>
                
                {/* CLICK AREA */}
                <div
                  className="userTrigger"
                  onClick={() => setOpenDropdown(!openDropdown)}
                >
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="avatar" className="avatar" />
                  ) : (
                    <div className="avatar initials">{initials}</div>
                  )}

                  <span className="username">Hello, {firstName}</span>
                  <span className="arrowf">⌄</span>
                </div>

                {/* DROPDOWN */}
                {openDropdown && (
                  <div className="dropdown">
                    <Link to="/inbox/orders" onClick={() => setOpenDropdown(false)}>
                      Inbox
                    </Link>

                    <Link to="/profile-settings" onClick={() => setOpenDropdown(false)}>
                      Profile
                    </Link>

                    <Link to="/account/contact-details" onClick={() => setOpenDropdown(false)}>
                      Account
                    </Link>

                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-outlineh">
                Sign in
              </Link>
            )}

            {/* CONDITIONAL BUTTON */}
            {isAuthenticated ? (
              <Link to="/l/new" className="btn-primaryh">
                List a Rental
              </Link>
            ) : (
              <Link to="/signup" className="btn-primaryh">
                Register
              </Link>
            )}
          </div>
        </div>

        {/* MOBILE (UNCHANGED) */}
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
            onChange={e => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}

      {/* MOBILE MENU (UNCHANGED) */}
      {showMenu && (
        <>
          <div className="overlay" onClick={() => setShowMenu(false)} />
          <div className="mobile-menu">
            <div className="close" onClick={() => setShowMenu(false)}>✕</div>

            <Link to="/s">Browse Rentals</Link>
            <Link to="/l/new">List a Rental</Link>

            {isAuthenticated ? (
              <>
                <Link to="/inbox/orders">Inbox</Link>
                <Link to="/profile-settings">Profile</Link>
                <Link to="/account/contact-details">Account</Link>
              </>
            ) : (
              <>
                <Link to="/login">Sign in</Link>
                <Link to="/signup">Register</Link>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

// 🔹 Redux
const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  onLogout: historyPush => dispatch(logout(historyPush)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);