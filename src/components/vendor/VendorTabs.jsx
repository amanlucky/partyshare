import React from "react";
import css from "./VendorTabs.module.css";

const tabs = [
  "Overview",
  "Bookings",
  "Booking Requests",
  "Inventory",
  "Earnings & Payouts",
  "Reviews",
  "Messages",
  "Account Settings",
];

const VendorTabs = ({ activePage, setActivePage }) => {
  return (
    <div className={css.tabsWrapper}>
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActivePage(tab)}
          className={
            activePage === tab
              ? css.activeTab
              : css.tab
          }
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default VendorTabs;