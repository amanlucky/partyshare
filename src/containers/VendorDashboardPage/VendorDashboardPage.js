import React, { useState, useEffect, useRef, } from 'react';
import { connect } from 'react-redux';
import sdk from '../../util/sdk';
import css from './VendorDashboardPage.module.css';
import VendorHeader from "../../components/vendor/VendorHeader";
import OverviewTab from '../../components/vendor/pages/OverviewTab';
import BookingsTab from '../../components/vendor/pages/BookingsTab';
import InventoryTab from "../../components/vendor/pages/InventoryTab";
import EarningsTab from "../../components/vendor/pages/EarningsTab";
import ReviewsTab from "../../components/vendor/pages/ReviewsTab";
import MessagesTab from "../../components/vendor/pages/MessagesTab";
import BookingRequestsTab from "../../components/vendor/pages/BookingRequestsTab";
import AccountSettingsTab from "../../components/vendor/pages/AccountSettingsTab";
import BookingDetailsModal from "../../components/vendor/modals/BookingDetailsModal";
import useVendorDashboard from "../../components/vendor/hooks/useVendorDashboard";
import useVendorStats from "../../components/vendor/hooks/useVendorStats";
import useBookingFilters from '../../components/vendor/hooks/useBookingFilters';
import useVendorConversations from "../../components/vendor/hooks/useVendorConversations";
import bookingIcon from "../../assets/vendor/new-booking-request.png";
import upcomingIcon from "../../assets/vendor/upcomming-booking.png";
import messageIcon from "../../assets/vendor/unread-msg.png";
import listingIcon from "../../assets/vendor/active-listing.png";
import earningsIcon from "../../assets/vendor/earning-snapshots.png";
import {
  reviews,
} from "../../components/vendor/data/dashboardData";

import {
  fetchOwnListings,
  fetchBookings,
  publishListing,
  closeListing,
  openListing,
} from './VendorDashboardPage.duck';

const VendorDashboardPage = props => {

const {
  currentUser,

  inventoryItems,
  loadingListings,

  bookings,
  bookingsLoading,

  fetchOwnListings,
  fetchBookings,

  publishListing,
  closeListing,
  openListing,

} = props;


const {
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
} = useVendorDashboard();


  const [bookingFilter, setBookingFilter] =
  useState('all');
  const [bookingSearch, setBookingSearch] =
  useState('');
  const [sortBy, setSortBy] =
  useState('newest');
  const [requestFilter, setRequestFilter] =
  useState('pending');
  const [currentPage, setCurrentPage] =
  useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [bookingFilter, bookingSearch]);

  const {
    conversations,
    setConversations,

    activeConversation,
    setActiveConversation,
  } = useVendorConversations(bookings);

  const bookingsPerPage = 10; 

  const [loadingBookings, setLoadingBookings] =
  useState(false);
  
  const messagesEndRef = useRef(null);
  useEffect(() => {

  if (
    activeConversation?.messages?.length
  ) {

    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });

  }

}, [activeConversation?.messages?.length]);

  useEffect(() => {

  if (!activeConversation?.transactionId) {
    return;
  }

  const interval = setInterval(async () => {

    try {

      const messagesResponse =
        await sdk.messages.query({
          transactionId:
            activeConversation.transactionId,
        });

      const realMessages =
  messagesResponse.data.data.reverse().map(msg => {

    return {

     sender: 'renter',

      text: msg.attributes.content,

      time: new Date(
        msg.attributes.createdAt
      ).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),

    };

  });

      setActiveConversation(prev => ({
        ...prev,
        messages: realMessages,
      }));

    } catch (e) {

      console.log(e);

    }

  }, 3000);

  return () => clearInterval(interval);

}, [
  activeConversation?.transactionId,
]);

  useEffect(() => {

  const loadData = async () => {

    setLoadingBookings(true);

    await fetchOwnListings();

    await fetchBookings();

        const transactionsResponse =
        await sdk.transactions.query({
          only: 'sale',
          include: [
            'customer',
            'listing',
          ],
        });

    setLoadingBookings(false);

  };

  loadData();

}, []);

useEffect(() => {
window.bookings = bookings;
  if (bookings.length) {


  }

}, [bookings]);

const {
  pendingCount,
  approvedCount,
  rejectedCount,

  grossRevenue,
  netPayouts,
  pendingPayouts,

  upcomingCount,
  completedCount,
  cancelledCount,

  unreadMessagesCount,
  activeListingsCount,
  monthlyEarnings,
  
  pendingRequestsCount,
  approvedBookingsCount,
  monthlyRevenue,

  totalListings,

  overviewStats,
} = useVendorStats(
  bookings,
  inventoryItems,
  conversations,
  requestFilter
);

const bookingRequests = bookings.filter(
  booking => {

    if (requestFilter === 'pending') {

      return (
        booking.attributes.state ===
        'state/preauthorized'
      );

    }

    if (requestFilter === 'approved') {

      return (
        booking.attributes.state ===
        'state/accepted'
      );

    }

if (requestFilter === 'rejected') {

  return (
    booking.attributes.state ===
    'state/declined'
  );

}

    return true;

  }
);

const upcomingBookingsCount =
  bookings.filter(
    booking =>
      booking.attributes.state ===
      'state/accepted'
  ).length;


const summaryCards = [
  {
    value: pendingRequestsCount,
    label: "New Booking Requests",
    icon: bookingIcon,
    className: css.bookingCard,
  },

  {
    value: upcomingBookingsCount,
    label: "Upcoming Bookings",
    icon: upcomingIcon,
    className: css.upcomingCard,
  },

  {
    value: unreadMessagesCount,
    label: "Unread Messages",
    icon: messageIcon,
    className: css.messageCard,
  },

  {
    value: activeListingsCount,
    label: "Active Listings",
    icon: listingIcon,
    className: css.listingCard,
  },

  {
    value: `$${monthlyRevenue}`,
    label: "Earnings Snapshot",
    icon: earningsIcon,
    className: css.earningsCard,
  },
];

const {
  currentBookings,
  totalPages,
} = useBookingFilters(
  bookings,
  bookingFilter,
  bookingSearch,
  sortBy,
  currentPage,
  bookingsPerPage
);

const monthlyRevenueMap = {};

bookings.forEach(booking => {
  const date = new Date(
    booking.attributes.createdAt
  );

  const month = date.toLocaleString(
    'default',
    { month: 'short' }
  );

  const amount =
    (booking.attributes?.payinTotal?.amount || 0) / 100;

  monthlyRevenueMap[month] =
    (monthlyRevenueMap[month] || 0) + amount;
});

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const earningsData = months.map(month => ({
  month,
  earnings: monthlyRevenueMap[month] || 0,
}));



  return (
    <div className={css.dashboardWrapper}>
        {mobileMenuOpen && (
          <div
            className={css.mobileOverlay}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      
      <button
        className={css.mobileMenuButton}
        onClick={() => setMobileMenuOpen(true)}
      >
        ☰
      </button>
      {/* SIDEBAR */}
      {/*
      <aside className={`${css.sidebar} ${
        mobileMenuOpen ? css.sidebarOpen : ''
      }`}>
        <div className={css.logo}>
          <div className={css.sidebarTop}>
          <h2>Vendor Dashboard</h2>
          <button
            className={css.closeSidebar}
            onClick={() => setMobileMenuOpen(false)}
          >
            ✕
          </button>

        </div>
        </div>

       <nav className={css.nav}>

        <div className={css.menuSection}>
          Dashboard
        </div>

        {[
          'Overview',
          'Booking Requests',
          'Bookings',
        ].map(item => (

          <div
            key={item}
            className={`${css.navItem} ${
              activePage === item
                ? css.activeNavItem
                : ''
            }`}
            onClick={() => {
              setActivePage(item);
              setMobileMenuOpen(false);
            }}
          >
            {item}
          </div>

        ))}

        <div className={css.menuSection}>
          Business
        </div>

        {[
          'Inventory',
          'Earnings & Payouts',
        ].map(item => (

          <div
            key={item}
            className={`${css.navItem} ${
              activePage === item
                ? css.activeNavItem
                : ''
            }`}
            onClick={() => {
              setActivePage(item);
              setMobileMenuOpen(false);
            }}
          >
            {item}
          </div>

        ))}

        <div className={css.menuSection}>
          Communication
        </div>

        {[
          'Messages',
          'Reviews',
        ].map(item => (

          <div
            key={item}
            className={`${css.navItem} ${
              activePage === item
                ? css.activeNavItem
                : ''
            }`}
            onClick={() => {
              setActivePage(item);
              setMobileMenuOpen(false);
            }}
          >
            {item}
          </div>

        ))}

        <div className={css.menuSection}>
          Settings
        </div>

        {['Account Settings'].map(item => (

          <div
            key={item}
            className={`${css.navItem} ${
              activePage === item
                ? css.activeNavItem
                : ''
            }`}
            onClick={() => {
              setActivePage(item);
              setMobileMenuOpen(false);
            }}
          >
            {item}
          </div>

        ))}

      </nav>
      </aside>
      */}
      {/* MAIN CONTENT */}
    <div className={css.announcementBar}>
      🔥 Browse Event Rentals From Trusted Local Vendors
    </div>
      <main className={css.mainContent}>

        <VendorHeader
          activePage={activePage}
          setActivePage={setActivePage}
          unreadMessagesCount={unreadMessagesCount}
          currentUser={currentUser}
        />

        {/* OVERVIEW PAGE */}

       {activePage === 'Overview' && (
          <OverviewTab
            summaryCards={summaryCards}
            bookings={bookings}
            inventoryItems={inventoryItems}
            conversations={conversations}
            earningsData={earningsData}

            fetchBookings={fetchBookings}
            sdk={sdk}
          />
        )}

        {/* BOOKING REQUESTS PAGE */}

        {activePage === "Booking Requests" && (
            <BookingRequestsTab
              bookingRequests={bookingRequests}
              requestFilter={requestFilter}
              setRequestFilter={setRequestFilter}
              pendingCount={pendingCount}
              approvedCount={approvedCount}
              rejectedCount={rejectedCount}
              fetchBookings={fetchBookings}
            />
          )}
        {/* BOOKINGS PAGE */}

        {activePage === 'Bookings' && (
          <BookingsTab
            bookings={bookings}
            loadingBookings={loadingBookings}

            bookingSearch={bookingSearch}
            setBookingSearch={setBookingSearch}

            sortBy={sortBy}
            setSortBy={setSortBy}

            bookingFilter={bookingFilter}
            setBookingFilter={setBookingFilter}

            currentBookings={currentBookings}

            currentPage={currentPage}
            setCurrentPage={setCurrentPage}

            totalPages={totalPages}

            upcomingCount={upcomingCount}
            completedCount={completedCount}
            cancelledCount={cancelledCount}

            setSelectedBooking={setSelectedBooking}

            setActiveConversation={setActiveConversation}
            setActivePage={setActivePage}

            fetchBookings={fetchBookings}

            messageText={messageText}
          />
        )}
                {/* INVENTORY PAGE */}

        {activePage === 'Inventory' && (
            <InventoryTab
              inventoryItems={inventoryItems}
              loadingListings={loadingListings}
              inventoryFilter={inventoryFilter}
              setInventoryFilter={setInventoryFilter}
              publishListing={publishListing}
              closeListing={closeListing}
              openListing={openListing}
            />
          )}
                {/* EARNINGS PAGE */}

        {activePage === 'Earnings & Payouts' && (
              <EarningsTab
                grossRevenue={grossRevenue}
                netPayouts={netPayouts}
                pendingPayouts={pendingPayouts}
                upcomingPayout={pendingPayouts}
                bookings={bookings}
              />
        )}
                {/* REVIEWS PAGE */}

          {activePage === 'Reviews' && (
            <ReviewsTab reviews={reviews} />
          )}
                {/* MESSAGES PAGE */}

        {activePage === 'Messages' && (
          <MessagesTab
            conversations={conversations}
            activeConversation={activeConversation}
            setActiveConversation={setActiveConversation}

            messageText={messageText}
            setMessageText={setMessageText}

            messagesEndRef={messagesEndRef}

            setConversations={setConversations}

            currentUser={currentUser}
          />
        )}
                {/* ACCOUNT SETTINGS PAGE */}

        {activePage === 'Account Settings' && (
          <AccountSettingsTab
            currentUser={currentUser}
          />
        )}
        
        
        <BookingDetailsModal
          selectedBooking={selectedBooking}
          setSelectedBooking={setSelectedBooking}
        />
      </main>

    </div>
  );
};

const mapStateToProps = state => ({

  currentUser: state.user.currentUser,

  inventoryItems:
    state.VendorDashboardPage.listings,

  loadingListings:
    state.VendorDashboardPage.listingsLoading,
  
  bookings:
  state.VendorDashboardPage.bookings,

  bookingsLoading:
    state.VendorDashboardPage.bookingsLoading,

});

const mapDispatchToProps = dispatch => ({

  fetchOwnListings: () =>
    dispatch(fetchOwnListings()),
  
  fetchBookings: () =>
  dispatch(fetchBookings()),

  publishListing: listingId =>
    dispatch(publishListing(listingId)),

  closeListing: listingId =>
  dispatch(closeListing(listingId)),

  openListing: listingId =>
  dispatch(openListing(listingId)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VendorDashboardPage);