import React from "react";
import css from "../../containers/VendorDashboardPage/VendorDashboardPage.module.css";
import VendorTabs from "./VendorTabs";

const VendorHeader = ({
  activePage,
  setActivePage,
  unreadMessagesCount,
}) => {
  return (
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
    
                  <input
                    type="text"
                    placeholder="Search..."
                    className={css.dashboardSearch}
                  />
    
                </div>
    
                <div className={css.headerRight}>
    
                  <button className={css.iconBtn}>
                    🔔
                  </button>
    
                  <button
                    className={css.iconWrapper}
                    onClick={() => setActivePage('Messages')}
                  >
                    <span className={css.iconBtn}>💬</span>
    
                    {unreadMessagesCount > 0 && (
                      <span className={css.badge}>
                        {unreadMessagesCount}
                      </span>
                    )}
                  </button>
    
                  <div className={css.userAvatar}>
                    A
                  </div>
    
                  <button className={css.createListingBtn}>
                    + Create Listing
                  </button>
    
                </div>
    
              </div>
    
              <div className={css.pageHeader}>
                <div>
                  <h1>Dashboard</h1>
                  <p>Bookings, earnings and activity overview</p>
                </div>
              </div>
    
              <VendorTabs
                activePage={activePage}
                setActivePage={setActivePage}
              />
    
            </div>
  );
};

export default VendorHeader;