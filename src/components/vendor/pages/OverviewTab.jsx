import React, { useState, useEffect, useRef } from "react";
import css from "../../../containers/VendorDashboardPage/VendorDashboardPage.module.css";
import searchIcon from "../../../assets/vendor/search-icon.png";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const OverviewTab = ({
  summaryCards,
  bookings,
  inventoryItems,
  conversations,
  earningsData,

  fetchBookings,
  sdk,
}) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const menuRef = useRef(null);
  useEffect(() => {
  const handleClickOutside = event => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setOpenMenu(null);
    }
  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);

const allBookings = bookings || [];

const approvedBookings = allBookings.filter(
  booking =>
    booking.attributes.state === "state/accepted" ||
    booking.attributes.state === "state/reviewed"
);

const rejectedBookings = allBookings.filter(booking =>
  booking.attributes.state?.includes("declined")
);

const newBookings = allBookings.filter(
  booking =>
    booking.attributes.state === "state/preauthorized"
);

const allCount = allBookings.length;
const approvedCount = approvedBookings.length;
const rejectedCount = rejectedBookings.length;
const newCount = newBookings.length;

let filteredBookings = allBookings;

if (activeFilter === "new") {
  filteredBookings = newBookings;
}

if (activeFilter === "approved") {
  filteredBookings = approvedBookings;
}

if (activeFilter === "rejected") {
  filteredBookings = rejectedBookings;
}

if (searchTerm.trim()) {
  filteredBookings = filteredBookings.filter(booking => {
    const renter =
      booking.customer?.attributes?.profile?.displayName || "";

    const bookingId =
      booking.id?.uuid || "";

    return (
      renter
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      bookingId
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });
}
  return (
    
    <>
                  {/* BOOKING REQUESTS */}
               {/*
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
                   */}
                  {/* SUMMARY CARDS */}
      
                  <section className={css.summaryGrid}>
                    {summaryCards.map((card, index) => (
                        <div
                          key={index}
                          className={`${css.statCard} ${card.className}`}
                         >
                          <div className={css.cardHeader}>
                            <h2>{card.value}</h2>

                            <img
                              src={card.icon}
                              alt={card.label}
                              className={css.statIcon}
                            />
                          </div>

                          <p>{card.label}</p>
                        </div>
                      ))}
                  </section>
      
                  {/* LATEST BOOKINGS */}
      
                  <section className={css.section}>
                    <div className={css.sectionHeader}>
                        <h2>Latest Bookings</h2>

                        <div className={css.bookingToolbar}>

                            <div className={css.bookingFilters}>

                              <button
                                onClick={() => setActiveFilter("all")}
                                className={
                                  activeFilter === "all"
                                    ? css.activeBookingFilter
                                    : css.bookingFilter
                                }
                              >
                                All <span>{allCount}</span>
                              </button>

                              <button
                                onClick={() => setActiveFilter("new")}
                                className={
                                  activeFilter === "new"
                                    ? css.activeBookingFilter
                                    : css.bookingFilter
                                }
                              >
                                New Requests <span>{newCount}</span>
                              </button>

                              <button
                                onClick={() => setActiveFilter("approved")}
                                className={
                                  activeFilter === "approved"
                                    ? css.activeBookingFilter
                                    : css.bookingFilter
                                }
                              >
                                Approved <span>{approvedCount}</span>
                              </button>

                              <button
                                onClick={() => setActiveFilter("rejected")}
                                className={
                                  activeFilter === "rejected"
                                    ? css.activeBookingFilter
                                    : css.bookingFilter
                                }
                              >
                                Rejected <span>{rejectedCount}</span>
                              </button>

                            </div>

                            <div className={css.searchWrapper}>
                              <img
                                src={searchIcon}
                                alt="Search"
                                className={css.bookingSearchIcon}
                              />

                              <input
                                type="text"
                                placeholder="Search Bookings"
                                className={css.searchInput}
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                              />
                            </div>

                          </div>
                      </div>
      
                    <div className={css.tableWrapper}>
                      <table className={css.table}>
                        <thead>
                          <tr>
                            <th>Renter</th>
                            <th>Booking ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Items</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
      
                        <tbody>
                          {filteredBookings.slice(0, 5).map(booking => (
                            <tr key={booking.id.uuid}>

                              <td>
                                <div className={css.renterCell}>
                                  <div className={css.renterAvatar}>
                                    {booking.customer?.attributes?.profile?.abbreviatedName?.toUpperCase()}
                                  </div>

                                  <span>
                                    {booking.customer?.attributes?.profile?.displayName}
                                  </span>
                                </div>
                              </td>

                              <td className={css.bookingId}>
                                  {booking.id.uuid.slice(0, 8)}
                                </td>

                              <td>
                                {new Date(
                                  booking.attributes.createdAt
                                ).toLocaleDateString()}
                              </td>

                              <td>
                                {booking.attributes.payoutTotal
                                  ? `$${booking.attributes.payoutTotal.amount / 100}`
                                  : "$0"}
                              </td>

                              <td>
                                  <span
                                    className={`${css.statusBadge} ${
                                      booking.attributes.state === "state/accepted" ||
                                      booking.attributes.state === "state/reviewed"
                                        ? css.approved
                                        : booking.attributes.state === "state/declined"
                                        ? css.rejected
                                        : css.pending
                                    }`}
                                  >
                                  {
                                      booking.attributes.state === "state/preauthorized"
                                        ? "Pending"
                                        : booking.attributes.state === "state/accepted"
                                        ? "Approved"
                                        : booking.attributes.state === "state/declined"
                                        ? "Rejected"
                                        : booking.attributes.state === "state/reviewed"
                                        ? "Completed"
                                        : booking.attributes.state?.replace("state/", "")
                                    }
                                </span>
                              </td>

                              <td>
                                {booking.attributes.lineItems?.length || 0} items
                              </td>
                              <td
                                  className={css.actionsCell}
                                  ref={openMenu === booking.id.uuid ? menuRef : null}
                                >
                                  {booking.attributes.state === "state/preauthorized" && (
                                    <>
                                      <button
                                        className={css.actionBtn}
                                        onClick={() =>
                                          setOpenMenu(
                                            openMenu === booking.id.uuid
                                              ? null
                                              : booking.id.uuid
                                          )
                                        }
                                      >
                                        ⋮
                                      </button>

                                      {openMenu === booking.id.uuid && (
                                        <div
                                          ref={menuRef}
                                          className={css.actionMenu}
                                        >
                                          <button
                                            className={css.menuItem}
                                            onClick={async () => {
                                              try {
                                                await sdk.transactions.transition({
                                                  id: booking.id,
                                                  transition: "transition/accept",
                                                  params: {},
                                                });

                                                await fetchBookings();
                                                setOpenMenu(null);

                                                alert("Booking accepted");
                                              } catch (e) {
                                                alert("Accept failed");
                                              }
                                            }}
                                          >
                                            ✓ Approve
                                          </button>

                                          <button className={css.menuItem}>
                                            ✕ Reject
                                          </button>
                                        </div>
                                      )}
                                    </>
                                  )}
                                </td>
                            </tr>
                            
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                  <section className={css.widgetsGrid}>
                <div className={css.widgetCard}>
                  <h3>Earnings</h3>
                  <div className={css.chartContainer}>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={earningsData}>
                          <defs>
                            <linearGradient
                              id="colorRevenue"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#ff8800"
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="95%"
                                stopColor="#ff8800"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
      
                          <CartesianGrid strokeDasharray="3 3" />
      
                          <XAxis dataKey="month" />
      
                          <YAxis />
      
                          <Tooltip
                            formatter={(value) => [`$${value}`, 'Revenue']}
                          />
      
                          <Area
                            type="linear"
                            dataKey="earnings"
                            stroke="#ff8800"
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                </div>
      
                <div className={css.widgetCard}>
                  <h3>Reviews & Ratings</h3>
                  <p>No reviews yet</p>
                </div>
      
                <div className={css.widgetCard}>
                  <h3>Inventory</h3>
                  <p>Total Listings: {inventoryItems.length}</p>
                </div>
      
                <div className={css.widgetCard}>
                  <h3>Latest Messages</h3>
                  <p>{conversations.length} Conversations</p>
                </div>
              </section>
    </>
  );
};

export default OverviewTab;