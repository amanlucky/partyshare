import React, { useState, useEffect, useRef, } from 'react';
import { connect } from 'react-redux';
import sdk from '../../util/sdk';
import css from './VendorDashboardPage.module.css';
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
      'MESSAGE AUTHOR:',
    );
      console.log(
        'MESSAGE CREATED BY:',
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

const filteredInventoryItems =
  inventoryItems.filter(item => {

    if (inventoryFilter === 'all') {
      return true;
    }

    if (inventoryFilter === 'published') {
      return item.attributes.state === 'published';
    }

    if (inventoryFilter === 'draft') {
      return item.attributes.state === 'draft';
    }

    if (inventoryFilter === 'closed') {
      return item.attributes.state === 'closed';
    }

    return true;

  });
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

      {/* MAIN CONTENT */}

      <main className={css.mainContent}>

        <div className={css.topBar}>
          <h1>{activePage}</h1>
        </div>

               {/* OVERVIEW PAGE */}

        {activePage === 'Overview' && (
          <>

            {/* BOOKING REQUESTS */}

            <section className={css.section}>
              <div className={css.sectionHeader}>
                <h2>New Booking Requests</h2>
              </div>

              <div className={css.bookingGrid}>
                {bookingRequests.map(request => (
                   <div key={request.id.uuid} className={css.bookingCard}>

                    <div className={css.bookingTop}>
                      <h3>
                        {
                          request.listing?.attributes?.title
                          || 'Listing'
                        }
                      </h3>

                      <span className={css.status}>
                        {
                          request.customer?.attributes
                            ?.profile?.displayName
                            || 'Customer'
                        }
                      </span>
                    </div>

                    <p><strong>Renter:</strong>{
                      request.customer?.attributes
                        ?.profile?.displayName
                        || 'Customer'
                    }</p>
                   <p><strong>Dates:</strong> 
                        {
                          request.attributes?.createdAt
                        ? new Date(
                            request.attributes.createdAt
                          ).toLocaleDateString()
                        : '-'
                        }
                      </p>
                    <p><strong>Total:</strong>{
                          request.attributes?.payinTotal
                            ? `$${request.attributes.payinTotal.amount / 100}`
                            : '-'
                        }</p>

                    <div className={css.buttonRow}>
                      <button
                          className={css.approveBtn}
                          onClick={async () => {

                            try {

                              await sdk.transactions.transition({
                                id: request.id,
                                transition: 'transition/accept',
                                params: {},
                              });

                              await fetchBookings();

                              alert('Booking accepted');

                            } catch (e) {

                              console.log(e);

                            }

                          }}
                        >
                          Approve
                        </button>

                       <button
                          className={css.rejectBtn}
                          onClick={async () => {

                            try {

                              await sdk.transactions.transition({
                                id: request.id,
                                transition: 'transition/decline',
                                params: {},
                              });

                              await fetchBookings();

                              alert('Booking declined');

                            } catch (e) {

                              console.log(e);

                              alert(JSON.stringify(e.data));

                            }

                          }}
                        >
                          Reject
                        </button>
                    </div>

                  </div>
                ))
                
                }
              </div>
            </section>

            {/* SUMMARY CARDS */}

            <section className={css.summaryGrid}>
              {summaryCards.map(card => (
                <div key={card.title} className={css.summaryCard}>
                  <h3>{card.value}</h3>
                  <p>{card.title}</p>
                </div>
              ))}
            </section>

            {/* LATEST BOOKINGS */}

            <section className={css.section}>
              <div className={css.sectionHeader}>
                <h2>Latest Bookings</h2>
              </div>

              <div className={css.tableWrapper}>
                <table className={css.table}>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Renter</th>
                      <th>Date</th>
                      <th>Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bookings.slice(0, 5).map(booking => (
                      <tr key={booking.id.uuid}>
                        <td>
                          {
                            booking.listing?.attributes?.title
                            || 'Listing'
                          }
                        </td>
                        <td>
                          {
                            booking.customer?.attributes
                              ?.profile?.displayName
                              || 'Customer'
                          }
                        </td>
                        <td>
                          {
                            new Date(
                              booking.attributes.createdAt
                            ).toLocaleDateString()
                          }
                        </td>
                        <td>
                            {
                              booking.attributes?.payinTotal
                                ? `$${booking.attributes.payinTotal.amount / 100}`
                                : '-'
                            }
                          </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

          </>
        )}

        {/* BOOKING REQUESTS PAGE */}

        {activePage === 'Booking Requests' && (
          <div>

            <div className={css.requestTabs}>
              <button
                  className={
                    requestFilter === 'pending'
                      ? css.activeTab
                      : css.tabBtn
                  }
                  onClick={() =>
                    setRequestFilter('pending')
                  }
                >
                  Pending ({pendingCount})
                </button>

                <button
                  className={
                    requestFilter === 'approved'
                      ? css.activeTab
                      : css.tabBtn
                  }
                  onClick={() =>
                    setRequestFilter('approved')
                  }
                >
                  Approved ({approvedCount})
                </button>

                <button
                  className={
                    requestFilter === 'rejected'
                      ? css.activeTab
                      : css.tabBtn
                  }
                  onClick={() =>
                    setRequestFilter('rejected')
                  }
                >
                  Rejected ({rejectedCount})
                </button>
            </div>

            <div className={css.bookingGrid}>
              {bookingRequests.length === 0 ? (

              <div className={css.emptyState}>
                No {requestFilter} requests
              </div>

            ) : (

              bookingRequests.map(request => (
                
                <div key={request.id.uuid} className={css.bookingCard}>

                  <div className={css.bookingTop}>

                  <h3>
                    {
                      request.listing?.attributes?.title
                      || 'Listing'
                    }
                  </h3>

                  <span className={css.status}>

                    {request.attributes.state === 'state/preauthorized' &&
                      'Pending'}

                    {request.attributes.state === 'state/accepted' &&
                      'Approved'}

                    {request.attributes.state === 'state/declined' &&
                      'Rejected'}

                    {request.attributes.state === 'state/expired' &&
                      'Expired'}

                  </span>

                </div>

                <p>
                  <strong>Renter:</strong>{' '}
                  {
                    request.customer?.attributes
                      ?.profile?.displayName
                      || 'Customer'
                  }
                </p>

                <p>
                  <strong>Dates:</strong>{' '}
                  {
                    request.attributes?.createdAt
                      ? new Date(
                          request.attributes.createdAt
                        ).toLocaleDateString()
                      : '-'
                  }
                </p>

                <p>
                  <strong>Total:</strong>{' '}
                  {
                    request.attributes?.payinTotal
                      ? `$${request.attributes.payinTotal.amount / 100}`
                      : '-'
                  }
                </p>

                  <div className={css.buttonRow}>

                    {request.attributes.state ===
                      'state/preauthorized' && (
                      <>
                        <button
                          className={css.approveBtn}
                          onClick={async () => {

                            try {

                              await sdk.transactions.transition({
                                id: request.id,
                                transition: 'transition/accept',
                                params: {},
                              });

                              await fetchBookings();

                              alert('Booking accepted');

                            } catch (e) {

                              console.log(e);

                              alert('Accept failed');

                            }

                          }}
                        >
                          Approve
                        </button>

                        <button
                            className={css.rejectBtn}
                            onClick={async () => {

                              try {

                                await sdk.transactions.transition({
                                  id: request.id,
                                  transition: 'transition/decline',
                                  params: {},
                                });

                                await fetchBookings();

                                alert('Booking rejected');

                              } catch (e) {

                                console.log(e);

                                alert(
                                  'Reject transition not configured yet'
                                );

                              }

                            }}
                          >
                            Reject
                          </button>
                      </>
                    )}

                    <button className={css.secondaryBtn}>
                      Message
                    </button>

                  </div>

                </div>

              )))}
            </div>

          </div>
        )}
        {/* BOOKINGS PAGE */}

        {activePage === 'Bookings' && (
          <div>
                <input
                      type="text"
                      placeholder="Search bookings..."
                      value={bookingSearch}
                      onChange={e =>
                        setBookingSearch(e.target.value)
                      }
                      className={css.searchInput}
                    />
                    <select
                        value={sortBy}
                        onChange={e =>
                          setSortBy(e.target.value)
                        }
                        className={css.sortSelect}
                      >

                        <option value="newest">
                          Newest
                        </option>

                        <option value="oldest">
                          Oldest
                        </option>

                        <option value="highest">
                          Highest Amount
                        </option>

                        <option value="lowest">
                          Lowest Amount
                        </option>

                      </select>
                  <div className={css.filterButtons}>

                    <button
                      className={`${css.filterBtn} ${
                        bookingFilter === 'all'
                          ? css.activeFilterBtn
                          : ''
                      }`}
                      onClick={() =>
                        setBookingFilter('all')
                      }
                    >
                      All Bookings ({bookings.length})
                    </button>

                    <button
                      className={`${css.filterBtn} ${
                        bookingFilter === 'upcoming'
                          ? css.activeFilterBtn
                          : ''
                      }`}
                      onClick={() =>
                        setBookingFilter('upcoming')
                      }
                    >
                      Upcoming ({upcomingCount})
                    </button>

                    <button
                      className={`${css.filterBtn} ${
                        bookingFilter === 'completed'
                          ? css.activeFilterBtn
                          : ''
                      }`}
                      onClick={() =>
                        setBookingFilter('completed')
                      }
                    >
                      Completed ({completedCount})
                    </button>

                    <button
                      className={`${css.filterBtn} ${
                        bookingFilter === 'cancelled'
                          ? css.activeFilterBtn
                          : ''
                      }`}
                      onClick={() =>
                        setBookingFilter('cancelled')
                      }
                    >
                      Cancelled ({cancelledCount})
                    </button>

                  </div>

            <div className={css.tableWrapper}>

              {loadingBookings ? (

                <div className={css.loadingText}>
                  Loading bookings...
                </div>

              ) : (
  <>
                <table className={css.table}>

                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Item</th>
                    <th>Dates</th>
                    <th>Delivery</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

               <tbody>

                  {currentBookings.length === 0 ? (

                    <tr>

                      <td
                        colSpan="7"
                        className={css.emptyState}
                      >
                        No bookings found
                      </td>

                    </tr>

                  ) : (

                    currentBookings.map(booking => (

                      <tr key={booking.id.uuid}>

                        <td>
                          {
                            booking.customer?.attributes
                              ?.profile
                              ?.displayName || 'Customer'
                          }
                        </td>

                        <td>
                          {
                            booking.listing?.attributes
                              ?.title || 'Listing'
                          }
                        </td>

                        <td>
                          {
                            booking.booking?.attributes?.start
                              ? new Date(
                                  booking.booking.attributes.start
                                ).toLocaleDateString()

                              : booking.attributes?.createdAt
                              ? new Date(
                                  booking.attributes.createdAt
                                ).toLocaleDateString()

                              : '-'
                          }
                        </td>

                        <td>
                          {
                            booking.attributes?.deliveryMethod
                              || 'Pickup'
                          }
                        </td>

                        <td>
                          {
                            booking.attributes?.payinTotal
                              ? `$${booking.attributes.payinTotal.amount / 100}`
                              : '-'
                          }
                        </td>

                        <td>

                          <span
                            className={
                              booking.attributes.state ===
                              'state/preauthorized'
                                ? css.statusPending

                                : booking.attributes.state ===
                                  'state/accepted'
                                ? css.statusAccepted

                                : booking.attributes.state ===
                                    'state/cancelled' ||
                                  booking.attributes.state ===
                                    'state/expired'
                                ? css.statusCancelled

                                : css.statusCompleted
                            }
                          >

                            {booking.attributes.state ===
                              'state/preauthorized' &&
                              'Upcoming'}

                            {booking.attributes.state ===
                              'state/accepted' &&
                              'Accepted'}

                            {booking.attributes.state ===
                              'state/delivered' &&
                              'Completed'}

                            {booking.attributes.state ===
                              'state/cancelled' &&
                              'Cancelled'}

                            {booking.attributes.state ===
                              'state/expired' &&
                              'Expired'}

                            {booking.attributes.state ===
                              'state/pending-payment' &&
                              'Pending Payment'}

                          </span>

                        </td>

                        <td>

                          <div className={css.actionButtons}>

                            {booking.attributes.lastTransition !==
                              'transition/accept' && (

                              <button
                                className={css.approveBtn}
                                onClick={async () => {

                                  try {

                                    await sdk.transactions.transition({
                                      id: booking.id,
                                      transition: 'transition/accept',
                                      params: {},
                                    });

                                    await fetchBookings();

                                    alert('Booking accepted');

                                  } catch (e) {

                                    console.log(e.data);

                                  }

                                }}
                              >
                                Accept
                              </button>

                            )}

                            <button
                              className={css.smallBtn}
                              onClick={() => {

                                const slug =
                                  booking.listing?.attributes?.title
                                    ?.replace(/\s+/g, '-')
                                    ?.toLowerCase();

                                if (!slug || !booking.listing?.id?.uuid) {
                                  return;
                                }

                                window.open(
                                  `/l/${slug}/${booking.listing.id.uuid}`,
                                  '_blank'
                                );

                              }}
                            >
                              View
                            </button>
                            <button
                            className={css.smallBtn}
                            onClick={() =>
                              setSelectedBooking(booking)
                            }
                          >
                            Details
                          </button>
                            <button
                                className={css.smallBtn}
                                onClick={async () => {

                                  const conversationData = {
                                    id: booking.id.uuid,

                                    renter:
                                      booking.customer?.attributes
                                        ?.profile?.displayName,

                                    item:
                                      booking.listing?.attributes
                                        ?.title,

                                    transactionId: booking.id,

                                    messages: [],
                                  };

                                  setActiveConversation(conversationData);

                                  setActivePage('Messages');

                                  try {

                                    const messagesResponse =
                                      await sdk.messages.query({
                                        transactionId: booking.id,
                                      });

                                    const realMessages =
                                      messagesResponse.data.data.reverse().map(msg => ({

                                       sender: 'renter',

                                        text: msg.attributes.content,

                                        time: new Date(
                                          msg.attributes.createdAt
                                        ).toLocaleTimeString([], {
                                          hour: '2-digit',
                                          minute: '2-digit',
                                        }),

                                      }));

                                    setActiveConversation({
                                      ...conversationData,
                                      messages: realMessages,
                                    });

                                  } catch (e) {

                                    console.log(e);

                                  }

                                }}
                              >
                                {/* Booking desktop message button  */}
                                Message
                              </button>

                            <button
                              className={css.smallBtn}
                              onClick={() => {

                                window.open(
                                  `/sale/${booking.id.uuid}`,
                                  '_blank'
                                );

                              }}
                            >
                              Invoice
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

                        </table>

                        <div className={css.pagination}>

                          <button
                            className={css.pageBtn}
                            disabled={currentPage === 1}
                            onClick={() =>
                              setCurrentPage(prev => prev - 1)
                            }
                          >
                            Previous
                          </button>

                          <div className={css.pageNumbers}>

                            {[...Array(totalPages)].map((_, index) => (

                              <button
                                key={index}
                                className={
                                  currentPage === index + 1
                                    ? css.activePageBtn
                                    : css.pageNumberBtn
                                }
                                onClick={() =>
                                  setCurrentPage(index + 1)
                                }
                              >
                                {index + 1}
                              </button>

                            ))}

                          </div>

                          <button
                            className={css.pageBtn}
                            disabled={
                              currentPage === totalPages
                            }
                            onClick={() =>
                              setCurrentPage(prev => prev + 1)
                            }
                          >
                            Next
                          </button>

                        </div>
                          </>
              )}
            </div>
                        <div className={css.mobileBookings}>

                          {currentBookings.map(booking => (

                            <div
                              key={booking.id.uuid}
                              className={css.mobileBookingCard}
                            >

                              <p>
                                <strong>Customer:</strong>{' '}
                                {
                                  booking.customer?.attributes
                                    ?.profile?.displayName
                                }
                              </p>

                              <p>
                                <strong>Item:</strong>{' '}
                                {
                                  booking.listing?.attributes
                                    ?.title
                                }
                              </p>

                              <p>
                                <strong>Date:</strong>{' '}
                                {
                                  new Date(
                                    booking.attributes.createdAt
                                  ).toLocaleDateString()
                                }
                              </p>

                              <p>
                                <strong>Total:</strong>{' '}
                                ${
                                  booking.attributes.payinTotal
                                    ?.amount / 100
                                }
                              </p>

                              <div className={css.mobileCardButtons}>

                                  {booking.attributes?.state ===
                                    'state/preauthorized' && (

                                    <button
                                      className={css.acceptBtn}
                                    >
                                      Accept
                                    </button>

                                  )}

                                  <button
                                    className={css.smallBtn}
                                    onClick={() =>
                                      setSelectedBooking(booking)
                                    }
                                  >
                                    Details
                                  </button>

                                  <button
                                      className={css.smallBtn}
                                      onClick={async () => {

                                        const conversationData = {
                                          id: booking.id.uuid,

                                          renter:
                                            booking.customer?.attributes
                                              ?.profile?.displayName,

                                          item:
                                            booking.listing?.attributes
                                              ?.title,

                                          transactionId: booking.id,

                                          messages: [],
                                        };

                                        setActiveConversation(conversationData);

                                        setActivePage('Messages');

                                        try {

                                          const messagesResponse =
                                            await sdk.messages.query({
                                              transactionId: booking.id,
                                            });

                                          const realMessages =
                                              messagesResponse.data.data
                                                .reverse()
                                                .map(msg => {

                                                  const sender =
                                                    msg.attributes.content === messageText
                                                      ? 'vendor'
                                                      : 'renter';

                                                  return {

                                                    sender,

                                                    text: msg.attributes.content,

                                              time: new Date(
                                                msg.attributes.createdAt
                                              ).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                              }),

                                            }});

                                          setActiveConversation({
                                            ...conversationData,
                                            messages: realMessages,
                                          });

                                        } catch (e) {

                                          console.log(e);

                                        }

                                      }}
                                    >
                                      {/* booking page mobile message button */}
                                      Message mob
                                    </button>

                                  <button
                                    className={css.smallBtn}
                                    onClick={() => {

                                      window.open(
                                        `/sale/${booking.id.uuid}`,
                                        '_blank'
                                      );

                                    }}
                                  >
                                    Invoice
                                  </button>

                                  <button
                                    className={css.smallBtn}
                                    onClick={() => {

                                      const slug =
                                        booking.listing?.attributes?.title
                                          ?.replace(/\s+/g, '-')
                                          ?.toLowerCase();

                                      if (!slug || !booking.listing?.id?.uuid) {
                                        return;
                                      }

                                      window.open(
                                        `/l/${slug}/${booking.listing.id.uuid}`,
                                        '_blank'
                                      );

                                    }}
                                  >
                                    View
                                  </button>
                                </div>

                            </div>

                          ))}

                        </div>
          </div>
        )}
                {/* INVENTORY PAGE */}

        {activePage === 'Inventory' && (
          <div>

            <div className={css.requestTabs}>
              <div className={css.inventoryTabs}>

                  <button
                    className={
                      inventoryFilter === 'all'
                        ? css.activeTab
                        : css.tabBtn
                    }
                    onClick={() => setInventoryFilter('all')}
                  >
                    All Listings
                  </button>

                  <button
                    className={
                      inventoryFilter === 'published'
                        ? css.activeTab
                        : css.tabBtn
                    }
                    onClick={() => setInventoryFilter('published')}
                  >
                    Active
                  </button>

                  <button
                    className={
                      inventoryFilter === 'draft'
                        ? css.activeTab
                        : css.tabBtn
                    }
                    onClick={() => setInventoryFilter('draft')}
                  >
                    Draft
                  </button>

                  <button
                    className={
                      inventoryFilter === 'closed'
                        ? css.activeTab
                        : css.tabBtn
                    }
                    onClick={() => setInventoryFilter('closed')}
                  >
                    Archived
                  </button>

                </div>
            </div>

            <div className={css.tableWrapper}>
              <table className={css.table}>
                <thead>
                  <tr>
                    <th>Listing Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {loadingListings ? (
                    <tr>
                      <td colSpan="6">Loading listings...</td>
                    </tr>
                  ) : (
                  filteredInventoryItems.map(item =>(
                     <tr key={item.id.uuid}>

                      <td>
                        {item.attributes.title}
                      </td>

                      <td>
                        {item.attributes.publicData?.category || 'General'}
                      </td>

                      <td>

                        {item.attributes.price
                          ? `$${item.attributes.price.amount / 100}`
                          : '-'}

                      </td>

                      <td>
                        {item.attributes.publicData?.quantity || 1}
                      </td>

                      <td>

                        <span
                          className={
                            item.attributes.state === 'published'
                              ? css.activeStatus
                              : css.draftStatus
                          }
                        >
                          {item.attributes.state}
                        </span>

                      </td>

                      <td>

                        <div className={css.actionButtons}>

                            {item.attributes.state === 'draft' ? (

                              <button
                                className={css.publishBtn}
                                onClick={() => publishListing(item.id)}
                              >
                                Publish
                              </button>

                            ) : null}

                            <button
                              className={css.smallBtn}
                              onClick={() => {

                                const slug =
                                  item.attributes.title
                                    .replace(/\s+/g, '-')
                                    .toLowerCase();

                                window.open(
                                  `/l/${slug}/${item.id.uuid}/edit/details`,
                                  '_blank'
                                );

                              }}
                            >
                              Edit
                            </button>
                            {item.attributes.state === 'published' ? (

                              <button
                                className={css.archiveBtn}
                                onClick={() => closeListing(item.id)}
                              >
                                Archive
                              </button>

                            ) : null}
                            <button
                              className={css.smallBtn}
                              onClick={() => {

                                const slug =
                                  item.attributes.title
                                    .replace(/\s+/g, '-')
                                    .toLowerCase();

                                window.open(
                                  `/l/${slug}/${item.id.uuid}`,
                                  '_blank'
                                );

                              }}
                            >
                              View
                            </button>
                                {item.attributes.state === 'closed' ? (

                                  <button
                                    className={css.reopenBtn}
                                    onClick={() => openListing(item.id)}
                                  >
                                    Reopen
                                  </button>

                                ) : null}
                          </div>

                      </td>

                    </tr>
                  ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}
                {/* EARNINGS PAGE */}

        {activePage === 'Earnings & Payouts' && (
          <div>

            {/* TOP CARDS */}

            <section className={css.summaryGrid}>

              <div className={css.summaryCard}>
                <h3>${grossRevenue / 100}</h3>
                <p>Gross Booking Revenue</p>
              </div>

              <div className={css.summaryCard}>
                <h3>${netPayouts / 100}</h3>
                <p>Net Payouts</p>
              </div>

              <div className={css.summaryCard}>
                  <h3>
                    ${pendingPayouts / 100}
                  </h3>
                  <p>Upcoming Payout</p>
                </div>
              <div className={css.summaryCard}>
                <h3>${pendingPayouts / 100}</h3>
                <p>Pending Payouts</p>
              </div>

            </section>

            {/* EARNINGS CHART PLACEHOLDER */}

            <section className={css.section}>

              <div className={css.sectionHeader}>
                <h2>Earnings Overview</h2>
              </div>

              <div className={css.chartPlaceholder}>
                Earnings Chart Coming Soon
              </div>

            </section>

            {/* PAYOUT METHOD */}

            <section className={css.section}>

              <div className={css.sectionHeader}>
                <h2>Payout Method</h2>
              </div>

              <div className={css.payoutCard}>

                <div>
                  <h3>Stripe Connected</h3>
                  <p>Your payouts are connected and verified.</p>
                </div>

                <button className={css.approveBtn}>
                  Manage Stripe
                </button>

              </div>

            </section>

            {/* TRANSACTIONS TABLE */}

            <section className={css.section}>

              <div className={css.sectionHeader}>
                <h2>Recent Transactions</h2>
              </div>

              <div className={css.tableWrapper}>

                <table className={css.table}>

                  <thead>
                    <tr>
                      <th>Payout ID</th>
                      <th>Date</th>
                      <th>Renter</th>
                      <th>Amount</th>
                      <th>Fees</th>
                      <th>Net</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    {bookings.map(transaction => (
                      <tr key={transaction.id}>

                        <td>{transaction.id.uuid}</td>

                        <td>
                        {
                          new Date(
                            transaction.attributes.createdAt
                          ).toLocaleDateString()
                        }
                      </td>

                      <td>
                        {
                          transaction.customer?.attributes
                            ?.profile?.displayName
                            || 'Customer'
                        }
                      </td>

                      <td>
                        {
                          transaction.attributes?.payinTotal
                            ? `$${transaction.attributes.payinTotal.amount / 100}`
                            : '-'
                        }
                      </td>

                      <td>
                        {
                          transaction.attributes?.commission
                            ? `$${transaction.attributes.commission.amount / 100}`
                            : '$0'
                        }
                      </td>

                      <td>
                        {
                          transaction.attributes?.payoutTotal
                            ? `$${transaction.attributes.payoutTotal.amount / 100}`
                            : '-'
                        }
                      </td>

                      <td>
                      <span className={css.activeStatus}>
                        {
                          transaction.attributes
                            ?.lastTransition
                        }
                      </span>
                    </td>
                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            </section>

          </div>
        )}
                {/* REVIEWS PAGE */}

        {activePage === 'Reviews' && (
          <div>

            {/* REVIEW SUMMARY */}

            <section className={css.summaryGrid}>

              <div className={css.summaryCard}>
                <h3>4.9</h3>
                <p>Average Rating</p>
              </div>

              <div className={css.summaryCard}>
                <h3>128</h3>
                <p>Total Reviews</p>
              </div>

              <div className={css.summaryCard}>
                <h3>96%</h3>
                <p>Positive Reviews</p>
              </div>

            </section>

            {/* REVIEW CARDS */}

            <section className={css.section}>

              <div className={css.sectionHeader}>
                <h2>Recent Reviews</h2>
              </div>

              <div className={css.reviewGrid}>

                {reviews.map(review => (
                  <div key={review.id} className={css.reviewCard}>

                    <div className={css.reviewHeader}>

                      <div>
                        <h3>{review.reviewer}</h3>
                        <p>{review.item}</p>
                      </div>

                      <div className={css.rating}>
                        {'⭐'.repeat(review.rating)}
                      </div>

                    </div>

                    <p className={css.reviewText}>
                      {review.review}
                    </p>

                    <div className={css.reviewFooter}>

                      <span>{review.date}</span>

                      <div className={css.reviewButtons}>

                        <button className={css.smallBtn}>
                          View
                        </button>

                        <button className={css.smallBtn}>
                          Reply
                        </button>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </section>

          </div>
        )}
                {/* MESSAGES PAGE */}

        {activePage === 'Messages' && (
          <div className={css.messagesLayout}>

            {/* CONVERSATION SIDEBAR */}

            <div className={css.conversationSidebar}>

              <div className={css.messagesHeader}>
                Conversations
              </div>

              {conversations.map(conversation => (
                  <div
                    key={conversation.id}
                    className={`${css.conversationItem} ${
                      activeConversation?.renter ===
                      conversation.renter
                        ? css.activeConversation
                        : ''
                    }`}
                    onClick={async () => {

                      setActiveConversation(conversation);

                      try {

                        const messagesResponse =
                          await sdk.messages.query({
                            transactionId:
                              conversation.transactionId,
                          });

                        console.log(
                          'MESSAGES:',
                          messagesResponse
                        );

const currentUserId =
  currentUser?.id?.uuid;

const providerId =
  conversation.providerId;

const realMessages =
  messagesResponse.data.data
    .reverse()
    .map(msg => {

     const sender =
        msg.attributes.content === messageText
          ? 'vendor'
          : 'renter';

      return {

        sender,

        text: msg.attributes.content,

        time: new Date(
          msg.attributes.createdAt
        ).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),

      };

    });

                        setActiveConversation({
                          ...conversation,
                          messages: realMessages,
                        });

                      } catch (e) {

                        console.error(e);

                      }

                    }}
                  >

                  <div className={css.conversationTop}>
                    <h3>{conversation.renter}</h3>
                    <span>{conversation.time}</span>
                  </div>

                  <p className={css.conversationItemName}>
                    {conversation.item}
                  </p>

                  <p className={css.lastMessage}>
                    {conversation.lastMessage}
                  </p>

                  {conversation.unread && (
                    <div className={css.unreadBadge}>
                      New
                    </div>
                  )}

                </div>
              ))}

            </div>

            {/* CHAT AREA */}

            <div className={css.chatArea}>

              <div className={css.chatHeader}>

                <div>
                  <h2>
                    {
                      activeConversation?.renter ||
                      'Select Conversation'
                    }
                  </h2>
                  <p>
                    {
                      activeConversation?.item ||
                      'No active booking'
                    }
                  </p>
                </div>

                <button className={css.smallBtn}>
                  View Booking
                </button>

              </div>

              <div className={css.messagesContainer}>

               {activeConversation?.messages?.map(
                  (message, index) => {

                    console.log(message);
 
                    return (
                   
                    <div
                      key={index}
                      className={
                        message.sender === 'vendor'
                          ? css.vendorMessage
                          : css.renterMessage
                      }
                    > 

                      <div
                            className={
                              message.sender === 'vendor'
                                ? css.vendorBubble
                                : css.renterBubble
                            }
                          >
                            {message.sender} - {message.text}
                          </div>

                      <span className={css.messageTime}>
                        {message.time}
                      </span>

                    </div>

                  );
                })
                }
                <div ref={messagesEndRef}></div>
               </div>

               <div className={css.messageInputArea}>

                <input
                  type="text"
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={e =>
                    setMessageText(e.target.value)
                  }
                />

                <button
                  className={css.approveBtn}
                  onClick={async () => {

                    if (!messageText.trim()) {
                          return;
                        }

                        try {
                            console.log(
                              'ACTIVE CONVERSATION:',
                              activeConversation
                            );
                          const newMessage = {
                              sender: 'vendor',
                              text: messageText,
                              time: new Date().toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              }),
                            };

                            await sdk.messages.send({
                              transactionId:
                                activeConversation.transactionId,

                              content: messageText,
                            });

                            setActiveConversation(prev => ({
                              ...prev,

                              messages: [
                                ...(prev.messages || []),
                                newMessage,
                              ],
                            }));

                            setMessageText('');

                          const messagesResponse =
                          console.log(
                                'QUERY TRANSACTION:',
                                activeConversation?.transactionId
                              );
                            await sdk.messages.query({
                              transactionId:
                                activeConversation.transactionId,
                            });
                            console.log(
                              'MESSAGES RESPONSE:',
                              messagesResponse
                            );
                          const realMessages =
                              messagesResponse.data.data
                                .reverse()
                                .map(msg => {

                                  const sender =
                                    msg.attributes.content === messageText
                                      ? 'vendor'
                                      : 'renter';

                                  return {

                                    sender,

                              text: msg.attributes.content,

                              time: new Date(
                                msg.attributes.createdAt
                              ).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              }),

                            }}
                          );

                          const updatedConversation = {
                            ...activeConversation,
                            messages: realMessages,
                          };

                          setActiveConversation({
                            ...updatedConversation,
                            transactionId:
                              activeConversation.transactionId,
                          });

                          setConversations(prev =>
                            prev.map(conversation =>

                              conversation.id ===
                              updatedConversation.id

                                ? updatedConversation

                                : conversation

                            )
                          );
                          setMessageText('');

                        } catch (e) {

                          console.log(e);

                        }

                  }}
                >
                  Send
                </button>

              </div>

            </div>

          </div>
        )}
                {/* ACCOUNT SETTINGS PAGE */}

        {activePage === 'Account Settings' && (
          <div>
            {/* USER HEADER */}

            <section className={css.section}>

              <div className={css.userHeaderCard}>

                <div className={css.userAvatar}>
                  {currentUser?.attributes?.profile?.displayName?.charAt(0) || 'U'}
                </div>

                <div>

                  <h2>
                    {currentUser?.attributes?.profile?.displayName}
                  </h2>

                  <p>
                    {currentUser?.attributes?.email}
                  </p>

                </div>

              </div>

            </section>
            {/* BUSINESS PROFILE */}

            <section className={css.section}>

              <div className={css.sectionHeader}>
                <h2>Business Profile</h2>
              </div>

              <div className={css.settingsCard}>

                <div className={css.formGrid}>

                  <div className={css.formGroup}>
                    <label>Business Name</label>

                    <input
                      type="text"
                      defaultValue={
                        currentUser?.attributes?.profile?.displayName || ''
                      }
                      className={css.formInput}
                    />
                  </div>

                  <div className={css.formGroup}>
                    <label>Phone Number</label>

                    <input
                      type="text"
                      defaultValue="+1 202 555 0182"
                      className={css.formInput}
                    />
                  </div>

                  <div className={css.formGroup}>
                    <label>Email Address</label>

                    <input
                      type="email"
                      defaultValue={
                        currentUser?.attributes?.email || ''
                      }
                      className={css.formInput}
                    />
                  </div>

                  <div className={css.formGroup}>
                    <label>Website</label>

                    <input
                      type="text"
                      defaultValue="www.partyshare.com"
                      className={css.formInput}
                    />
                  </div>

                </div>

                <div className={css.formGroup}>
                  <label>Business Description</label>

                  <textarea
                    rows="5"
                    className={css.formTextarea}
                    defaultValue="Premium event rentals for weddings, birthdays, and corporate events."
                  />
                </div>

              </div>

            </section>

            {/* PAYOUT SETTINGS */}

            <section className={css.section}>

              <div className={css.sectionHeader}>
                <h2>Payout Settings</h2>
              </div>

              <div className={css.settingsCard}>

                <div className={css.formGrid}>

                  <div className={css.formGroup}>
                    <label>Bank Name</label>

                    <input
                      type="text"
                      defaultValue="Chase Bank"
                      className={css.formInput}
                    />
                  </div>

                  <div className={css.formGroup}>
                    <label>Account Holder</label>

                    <input
                      type="text"
                      defaultValue="PartyShare LLC"
                      className={css.formInput}
                    />
                  </div>

                  <div className={css.formGroup}>
                    <label>Payout Schedule</label>

                    <select className={css.formInput}>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>

                  <div className={css.formGroup}>
                    <label>Currency</label>

                    <select className={css.formInput}>
                      <option>USD</option>
                      <option>CAD</option>
                    </select>
                  </div>

                </div>

              </div>

            </section>

            {/* NOTIFICATIONS */}

            <section className={css.section}>

              <div className={css.sectionHeader}>
                <h2>Notifications</h2>
              </div>

              <div className={css.settingsCard}>

                <div className={css.notificationRow}>
                  <div>
                    <h3>Email Notifications</h3>
                    <p>Receive booking updates via email</p>
                  </div>

                  <input type="checkbox" defaultChecked />
                </div>

                <div className={css.notificationRow}>
                  <div>
                    <h3>SMS Notifications</h3>
                    <p>Receive booking alerts by SMS</p>
                  </div>

                  <input type="checkbox" />
                </div>

                <div className={css.notificationRow}>
                  <div>
                    <h3>Marketing Emails</h3>
                    <p>Receive platform updates and promotions</p>
                  </div>

                  <input type="checkbox" defaultChecked />
                </div>

              </div>

            </section>

            {/* SAVE BUTTON */}

            <div className={css.saveSection}>
              <button className={css.saveBtn}>
                Save Changes
              </button>
            </div>

          </div>
        )}
        {selectedBooking && (

            <div className={css.modalOverlay}>

              <div className={css.bookingModal}>

                <div className={css.modalHeader}>

                  <h2>Booking Details</h2>

                  <button
                    className={css.closeModal}
                    onClick={() =>
                      setSelectedBooking(null)
                    }
                  >
                    ✕
                  </button>

                </div>

                <div className={css.modalContent}>

                  <p>
                    <strong>Customer:</strong>{' '}
                    {
                      selectedBooking.customer
                        ?.attributes?.profile
                        ?.displayName
                    }
                  </p>

                  <p>
                    <strong>Listing:</strong>{' '}
                    {
                      selectedBooking.listing
                        ?.attributes?.title
                    }
                  </p>

                  <p>
                    <strong>Status:</strong>{' '}

                        {selectedBooking.attributes?.state ===
                          'state/preauthorized' &&
                          'Pending'}

                        {selectedBooking.attributes?.state ===
                          'state/accepted' &&
                          'Accepted'}

                        {selectedBooking.attributes?.state ===
                          'state/declined' &&
                          'Rejected'}
                  </p>

                  <p>
                    <strong>Total:</strong>{' '}
                    ${
                      selectedBooking.attributes
                        ?.payinTotal?.amount / 100
                    }
                  </p>

                </div>

              </div>

            </div>

          )}
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