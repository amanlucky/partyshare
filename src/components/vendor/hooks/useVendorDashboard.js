import { useState } from "react";

const useVendorDashboard = () => {
  const [activePage, setActivePage] =
    useState("Overview");

  const [selectedBooking, setSelectedBooking] =
    useState(null);

  const [messageText, setMessageText] =
    useState("");

  const [inventoryFilter, setInventoryFilter] =
    useState("all");

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  return {
    activePage,
    setActivePage,

    selectedBooking,
    setSelectedBooking,

    messageText,
    setMessageText,

    inventoryFilter,
    setInventoryFilter,

    mobileMenuOpen,
    setMobileMenuOpen,
  };
};

export default useVendorDashboard;