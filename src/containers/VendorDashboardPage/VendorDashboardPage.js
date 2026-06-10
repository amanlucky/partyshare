import React, { useState, useEffect, useRef, } from 'react';
import { connect } from 'react-redux';
import sdk from '../../util/sdk';
import css from './VendorDashboardPage.module.css';
import VendorLayout from "../../components/vendor/VendorLayout";
import VendorHeader from "../../components/vendor/VendorHeader";
import VendorTabs from "../../components/vendor/VendorTabs";
import OverviewTab from '../../components/vendor/pages/OverviewTab';
import BookingsTab from '../../components/vendor/pages/BookingsTab';
import InventoryTab from "../../components/vendor/pages/InventoryTab";
import EarningsTab from "../../components/vendor/pages/EarningsTab";
import ReviewsTab from "../../components/vendor/pages/ReviewsTab";
import MessagesTab from "../../components/vendor/pages/MessagesTab";
import BookingRequestsTab from "../../components/vendor/pages/BookingRequestsTab";
import AccountSettingsTab from "../../components/vendor/pages/AccountSettingsTab";
import BookingDetailsModal from "../../components/vendor/modals/BookingDetailsModal";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import {
  fetchOwnListings,
  fetchBookings,
  publishListing,
  closeListing,
  openListing,
} from './VendorDashboardPage.duck';

const menuItems = [
  'Overview',
  'Booking Requests',
  'Bookings',
  'Inventory',
  'Earnings & Payouts',
  'Reviews',
  'Messages',
  'Account Settings',
];

const vendorBookings = [
  {
    id: 1,
    customer: 'Emma Watson',
    item: 'Gold Chiavari Chairs',
    dates: 'May 22 - May 24',
    total: '$320',
    status: 'Upcoming',
    delivery: 'Delivery',
  },
  {
    id: 2,
    customer: 'Michael Lee',
    item: 'Wedding Tent Package',
    dates: 'May 28 - May 30',
    total: '$650',
    status: 'Confirmed',
    delivery: 'Pickup',
  },
  {
    id: 3,
    customer: 'Sarah Johnson',
    item: 'LED Dance Floor',
    dates: 'April 10 - April 11',
    total: '$280',
    status: 'Completed',
    delivery: 'Delivery',
  },
];


const reviews = [
  {
    id: 1,
    reviewer: 'Sarah Johnson',
    item: 'Luxury Wedding Tent',
    rating: 5,
    review:
      'Amazing experience. Everything arrived on time and setup was perfect.',
    date: 'May 12, 2026',
  },
  {
    id: 2,
    reviewer: 'Michael Lee',
    item: 'LED Dance Floor',
    rating: 4,
    review:
      'Great communication and clean equipment. Would rent again.',
    date: 'May 15, 2026',
  },
];


const activeMessages = [
  {
    id: 1,
    sender: 'renter',
    text: 'Hi, can setup happen earlier on Friday morning?',
    time: '10:20 AM',
  },
  {
    id: 2,
    sender: 'vendor',
    text: 'Yes absolutely, we can arrive around 8AM.',
    time: '10:22 AM',
  },
  {
    id: 3,
    sender: 'renter',
    text: 'Perfect, thank you!',
    time: '10:24 AM',
  },
];
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

  const [activePage, setActivePage] = useState('Overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const bookingsPerPage = 10; 

  const [conversations, setConversations] =
  useState([]);

  const [loadingBookings, setLoadingBookings] =
  useState(false);

  const [selectedBooking, setSelectedBooking] =
  useState(null);

  const [activeConversation, setActiveConversation] =
  useState(null);
  
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

console.log(
  'FULL MESSAGE JSON',
  JSON.stringify(msg, null, 2)
);


console.log(
  'RELATIONSHIPS',
  JSON.stringify(msg.relationships, null, 2)
);

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

  const [messageText, setMessageText] =
  useState('');

  const [inventoryFilter, setInventoryFilter] =
   useState('all');

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

      console.log(
        'TRANSACTIONS:',
        transactionsResponse
      );

    console.log(
      'TRANSACTIONS:',
      transactionsResponse
    );

    setLoadingBookings(false);

  };

  loadData();

}, []);

useEffect(() => {
window.bookings = bookings;
  if (bookings.length) {

    console.log(
      'BOOKINGS DATA:',
      bookings
    );

  }

}, [bookings]);

useEffect(() => {

  if (!bookings.length) {
    return;
  }

  const generatedConversations =
    bookings.map(booking => ({

      id: booking.id.uuid,

      renter:
        booking.customer?.attributes
          ?.profile?.displayName
          || 'Customer',

      item:
        booking.listing?.attributes
          ?.title
          || 'Listing',

      lastMessage:
        'Start conversation',

      time:
        new Date(
          booking.attributes.createdAt
        ).toLocaleDateString(),

      unread: false,

      transactionId:
        booking.id,

      listingId:
        booking.listing?.id?.uuid,

      messages: [],

    }));

  setConversations(
    generatedConversations
  );

}, [bookings]);


  const grossRevenue = bookings.reduce(
  (total, booking) => {

    const amount =
      booking.attributes?.payinTotal?.amount || 0;

    return total + amount;

  },
  0
);

const netPayouts = bookings.reduce(
  (total, booking) => {

    const amount =
      booking.attributes?.payoutTotal?.amount || 0;

    return total + amount;

  },
  0
);

const pendingPayouts = bookings
  .filter(booking =>
    booking.attributes?.lastTransition !==
    'transition/complete'
  )
  .reduce((total, booking) => {

    const amount =
      booking.attributes?.payoutTotal?.amount || 0;

    return total + amount;

  }, 0);
const upcomingCount = bookings.filter(
  booking =>
    booking.attributes.state ===
      'state/preauthorized' ||
    booking.attributes.state ===
      'state/accepted'
).length;

const completedCount = bookings.filter(
  booking =>
    booking.attributes.state ===
    'state/delivered'
).length;

const cancelledCount = bookings.filter(
  booking =>
    booking.attributes.state ===
      'state/cancelled' ||
    booking.attributes.state ===
      'state/expired'
).length;

const pendingCount = bookings.filter(
  booking =>
    booking.attributes.state ===
    'state/preauthorized'
).length;

const approvedCount = bookings.filter(
  booking =>
    booking.attributes.state ===
    'state/accepted'
).length;

const rejectedCount = bookings.filter(
  booking =>
    booking.attributes.state ===
    'state/declined'
).length;

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
const pendingRequestsCount =
  bookings.filter(
    booking =>
      booking.attributes.state ===
      'state/preauthorized'
  ).length;

const approvedBookingsCount =
  bookings.filter(
    booking =>
      booking.attributes.state ===
      'state/accepted'
  ).length;

const monthlyRevenue =
  bookings
    .filter(
      booking =>
        booking.attributes.state ===
        'state/accepted'
    )
    .reduce(
      (sum, booking) =>
        sum +
        (
          booking.attributes
            ?.payinTotal?.amount || 0
        ),
      0
    ) / 100;

const unreadMessagesCount =
  conversations.filter(
    c => c.unread
  ).length;

const upcomingBookingsCount =
  bookings.filter(
    booking =>
      booking.attributes.state ===
      'state/accepted'
  ).length;

const activeListingsCount =
  inventoryItems.filter(
    item =>
      item.attributes.state ===
      'published'
  ).length;

const monthlyEarnings =
  bookings.reduce((total, booking) => {

    return (
      total +
      (booking.attributes?.payinTotal
        ?.amount || 0)
    );

  }, 0) / 100;

  const summaryCards = [
  {
    title: 'Pending Requests',
    value: pendingRequestsCount,
  },
  {
    title: 'Approved Bookings',
    value: approvedBookingsCount,
  },
  {
    title: 'Monthly Revenue',
    value: `$${monthlyRevenue}`,
  },
  {
    title: 'Unread Messages',
    value: unreadMessagesCount,
  },
];

const filteredBookings = bookings.filter(booking => {

  const state = booking.attributes.state;

  const customerName =
    booking.customer?.attributes?.profile
      ?.displayName?.toLowerCase() || '';

  const listingTitle =
    booking.listing?.attributes?.title
      ?.toLowerCase() || '';

  const searchValue =
    bookingSearch.toLowerCase();

  const matchesSearch =
    customerName.includes(searchValue) ||
    listingTitle.includes(searchValue);

  if (!matchesSearch) {
    return false;
  }

  if (bookingFilter === 'all') {
    return true;
  }

  if (bookingFilter === 'upcoming') {
    return (
      state === 'state/preauthorized' ||
      state === 'state/accepted'
    );
  }

  if (bookingFilter === 'completed') {
    return state === 'state/delivered';
  }

  if (bookingFilter === 'cancelled') {
    return (
      state === 'state/cancelled' ||
      state === 'state/expired'
    );
  }

  return true;

});
const sortedBookings = [
  ...filteredBookings,
].sort((a, b) => {

  if (sortBy === 'newest') {

    return (
      new Date(
        b.attributes.createdAt
      ) -
      new Date(
        a.attributes.createdAt
      )
    );

  }

  if (sortBy === 'oldest') {

    return (
      new Date(
        a.attributes.createdAt
      ) -
      new Date(
        b.attributes.createdAt
      )
    );

  }

  if (sortBy === 'highest') {

    return (
      b.attributes.payinTotal.amount -
      a.attributes.payinTotal.amount
    );

  }

  if (sortBy === 'lowest') {

    return (
      a.attributes.payinTotal.amount -
      b.attributes.payinTotal.amount
    );

  }

  return 0;

});
const indexOfLastBooking =
  currentPage * bookingsPerPage;

const indexOfFirstBooking =
  indexOfLastBooking - bookingsPerPage;

const currentBookings =
  sortedBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

const totalPages = Math.ceil(
  sortedBookings.length / bookingsPerPage
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

      <main className={css.mainContent}>

        <VendorHeader
          activePage={activePage}
          setActivePage={setActivePage}
          unreadMessagesCount={unreadMessagesCount}
        />

        {/* OVERVIEW PAGE */}

       {activePage === 'Overview' && (
          <OverviewTab
            summaryCards={summaryCards}
            bookings={bookings}
            inventoryItems={inventoryItems}
            conversations={conversations}
            earningsData={earningsData}
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