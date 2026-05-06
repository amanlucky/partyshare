import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import css from './VendorDashboardPage.module.css';
import {
  fetchOwnListings,
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

const bookingRequests = [
  {
    id: 1,
    renter: 'John Smith',
    item: 'Luxury Wedding Tent',
    dates: 'May 10 - May 12',
    amount: '$450',
    status: 'Pending',
  },
  {
    id: 2,
    renter: 'Sarah Johnson',
    item: 'LED Dance Floor',
    dates: 'May 15 - May 16',
    amount: '$280',
    status: 'Pending',
  },
];

const summaryCards = [
  {
    title: 'New Booking Requests',
    value: '12',
  },
  {
    title: 'Upcoming Bookings',
    value: '28',
  },
  {
    title: 'Unread Messages',
    value: '7',
  },
  {
    title: 'Active Listings',
    value: '42',
  },
  {
    title: 'Monthly Earnings',
    value: '$4,850',
  },
];

const latestBookings = [
  {
    id: 1,
    item: 'Wedding Tent Package',
    renter: 'Michael Lee',
    date: 'May 20',
    amount: '$650',
  },
  {
    id: 2,
    item: 'Gold Chiavari Chairs',
    renter: 'Emma Watson',
    date: 'May 22',
    amount: '$320',
  },
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

const payoutTransactions = [
  {
    id: 'PAYOUT-1024',
    renter: 'Michael Lee',
    date: 'May 20',
    amount: '$650',
    fees: '$65',
    net: '$585',
    status: 'Paid',
  },
  {
    id: 'PAYOUT-1025',
    renter: 'Emma Watson',
    date: 'May 22',
    amount: '$320',
    fees: '$32',
    net: '$288',
    status: 'Pending',
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
const conversations = [
  {
    id: 1,
    renter: 'Sarah Johnson',
    item: 'Luxury Wedding Tent',
    lastMessage: 'Can setup happen earlier on Friday?',
    time: '10:24 AM',
    unread: true,
  },
  {
    id: 2,
    renter: 'Michael Lee',
    item: 'LED Dance Floor',
    lastMessage: 'Thank you, everything looks good.',
    time: 'Yesterday',
    unread: false,
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
  fetchOwnListings,
  publishListing,
  closeListing,
  openListing,
} = props;

  const [activePage, setActivePage] = useState('Overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inventoryFilter, setInventoryFilter] =
   useState('all');

    useEffect(() => {
    fetchOwnListings();
  }, []);

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

          {menuItems.map(item => (

            <div
              key={item}
              className={`${css.navItem} ${
                activePage === item ? css.activeNavItem : ''
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
                  <div key={request.id} className={css.bookingCard}>

                    <div className={css.bookingTop}>
                      <h3>{request.item}</h3>

                      <span className={css.status}>
                        {request.status}
                      </span>
                    </div>

                    <p><strong>Renter:</strong> {request.renter}</p>
                    <p><strong>Dates:</strong> {request.dates}</p>
                    <p><strong>Total:</strong> {request.amount}</p>

                    <div className={css.buttonRow}>
                      <button className={css.approveBtn}>
                        Approve
                      </button>

                      <button className={css.rejectBtn}>
                        Reject
                      </button>
                    </div>

                  </div>
                ))}
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
                    {latestBookings.map(booking => (
                      <tr key={booking.id}>
                        <td>{booking.item}</td>
                        <td>{booking.renter}</td>
                        <td>{booking.date}</td>
                        <td>{booking.amount}</td>
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
              <button className={css.activeTab}>
                Pending
              </button>

              <button className={css.tabBtn}>
                Approved
              </button>

              <button className={css.tabBtn}>
                Rejected
              </button>
            </div>

            <div className={css.bookingGrid}>
              {bookingRequests.map(request => (
                <div key={request.id} className={css.bookingCard}>

                  <div className={css.bookingTop}>
                    <h3>{request.item}</h3>

                    <span className={css.status}>
                      {request.status}
                    </span>
                  </div>

                  <p><strong>Renter:</strong> {request.renter}</p>
                  <p><strong>Dates:</strong> {request.dates}</p>
                  <p><strong>Total:</strong> {request.amount}</p>

                  <div className={css.buttonRow}>
                    <button className={css.approveBtn}>
                      Approve
                    </button>

                    <button className={css.rejectBtn}>
                      Reject
                    </button>

                    <button className={css.secondaryBtn}>
                      Message
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}
        {/* BOOKINGS PAGE */}

        {activePage === 'Bookings' && (
          <div>

            <div className={css.requestTabs}>

              <button className={css.activeTab}>
                All Bookings
              </button>

              <button className={css.tabBtn}>
                Upcoming
              </button>

              <button className={css.tabBtn}>
                Completed
              </button>

              <button className={css.tabBtn}>
                Cancelled
              </button>

            </div>

            <div className={css.tableWrapper}>

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

                  {vendorBookings.map(booking => (
                    <tr key={booking.id}>

                      <td>{booking.customer}</td>

                      <td>{booking.item}</td>

                      <td>{booking.dates}</td>

                      <td>{booking.delivery}</td>

                      <td>{booking.total}</td>

                      <td>

                        <span
                          className={
                            booking.status === 'Completed'
                              ? css.activeStatus
                              : css.draftStatus
                          }
                        >
                          {booking.status}
                        </span>

                      </td>

                      <td>

                        <div className={css.actionButtons}>

                          <button className={css.smallBtn}>
                            View
                          </button>

                          <button className={css.smallBtn}>
                            Message
                          </button>

                          <button className={css.smallBtn}>
                            Invoice
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

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
                <h3>$24,850</h3>
                <p>Gross Booking Revenue</p>
              </div>

              <div className={css.summaryCard}>
                <h3>$18,420</h3>
                <p>Net Payouts</p>
              </div>

              <div className={css.summaryCard}>
                <h3>$2,800</h3>
                <p>Upcoming Payout</p>
              </div>

              <div className={css.summaryCard}>
                <h3>$640</h3>
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

                    {payoutTransactions.map(transaction => (
                      <tr key={transaction.id}>

                        <td>{transaction.id}</td>

                        <td>{transaction.date}</td>

                        <td>{transaction.renter}</td>

                        <td>{transaction.amount}</td>

                        <td>{transaction.fees}</td>

                        <td>{transaction.net}</td>

                        <td>
                          <span
                            className={
                              transaction.status === 'Paid'
                                ? css.activeStatus
                                : css.draftStatus
                            }
                          >
                            {transaction.status}
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
                  className={css.conversationItem}
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
                  <h2>Sarah Johnson</h2>
                  <p>Luxury Wedding Tent Booking</p>
                </div>

                <button className={css.smallBtn}>
                  View Booking
                </button>

              </div>

              <div className={css.messagesContainer}>

                {activeMessages.map(message => (
                  <div
                    key={message.id}
                    className={
                      message.sender === 'vendor'
                        ? css.vendorMessage
                        : css.renterMessage
                    }
                  >

                    <div className={css.messageBubble}>
                      {message.text}
                    </div>

                    <span className={css.messageTime}>
                      {message.time}
                    </span>

                  </div>
                ))}

              </div>

              <div className={css.messageInputArea}>

                <input
                  type="text"
                  placeholder="Type your message..."
                  className={css.messageInput}
                />

                <button className={css.approveBtn}>
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

});

const mapDispatchToProps = dispatch => ({

  fetchOwnListings: () =>
    dispatch(fetchOwnListings()),

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