import React from "react";
import css from "../../containers/VendorDashboardPage/VendorDashboardPage.module.css";
import VendorTabs from "./VendorTabs";
import bellIcon from "../../assets/vendor/notification-bell.png";
import msgIcon from "../../assets/vendor/msg-icon.png";
import searchIcon from "../../assets/vendor/search-icon.png";
import allCatIcon from "../../assets/vendor/all-cat-icon.png";
const VendorHeader = ({
  activePage,
  setActivePage,
  unreadMessagesCount,
  currentUser,
}) => {

  const firstName = currentUser?.attributes?.profile?.firstName || '';
  const lastName = currentUser?.attributes?.profile?.lastName || '';

  const initials =
  `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <>

    <div className={css.topBar}>
    
              <div className={css.dashboardHeader}>
    
                <div className={css.headerLeft}>
    
                  <div className={css.logoArea}>
                    <img
                      src={require('../../assets/logo.png')}
                      alt="PartyShare"
                      className={css.logoImage}
                    />
                  </div>
    
                  <div className={css.searchArea}>
                    <div className={css.categoryButton}>
                      <span>All Categories</span>
                       <img
                        src={allCatIcon}
                        alt=""
                        className={css.categoryIcon}
                      />
                    </div>


                      <div className={css.searchInputWrap}>
                        <img
                          src={searchIcon}
                          alt="Search"
                          className={css.searchIcon}
                        />

                        <input
                          type="text"
                          placeholder="Search"
                          className={css.dashboardSearch}
                        />
                      </div>
                  </div>
    
                </div>
    
                <div className={css.headerRight}>
    
                  <button className={css.iconBtn}>
                    <img
                      src={bellIcon}
                      alt="Notifications"
                      className={css.headerIcon}
                    />
                  </button>
    
                  <button
                    className={css.iconWrapper}
                    onClick={() => setActivePage('Messages')}
                  >
                    <img
                        src={msgIcon}
                        alt="Messages"
                        className={css.headerIcon}
                      />
    
                    {unreadMessagesCount > 0 && (
                      <span className={css.badge}>
                        {unreadMessagesCount}
                      </span>
                    )}
                  </button>
    
                  <div className={css.avatarWrapper}>
                    {currentUser?.profileImage ? (
                      <img
                        src={
                          currentUser.profileImage.attributes.variants["square-small"].url
                        }
                        alt="Profile"
                        className={css.userAvatarImage}
                      />
                    ) : (
                      <div className={css.userAvatar}>
                        {initials}
                      </div>
                    )}

                    <span className={css.onlineDot}></span>
                  </div>

    
                </div>
    
              </div>
    
              <div className={css.pageHeader}>

                <div className={css.pageHeaderLeft}>
                  <h1>Dashboard</h1>
                  <p>Bookings, earnings and activity overview</p>
                </div>

                <div className={css.pageHeaderCenter}>
                  <button className={css.toggleBtn}>
                    Renter
                  </button>

                  <button className={`${css.toggleBtn} ${css.activeToggle}`}>
                    Vendor
                  </button>
                </div>

                <div className={css.pageHeaderRight}>
                  <button className={css.quickActionBtn}>
                    Quick Actions
                    <span className={css.arrow}>⌄</span>
                  </button>

                  <button className={css.createListingBtn}>
                    Create Listing
                  </button>
                </div>

              </div>
    
              <VendorTabs
                activePage={activePage}
                setActivePage={setActivePage}
              />
    
            </div>
  </>
);
};

export default VendorHeader;