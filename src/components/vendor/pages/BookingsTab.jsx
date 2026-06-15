import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import css from '../../../containers/VendorDashboardPage/VendorDashboardPage.module.css';

const BookingsTab = props => {
  const {
    bookings,
    loadingBookings,

    bookingSearch,
    setBookingSearch,

    sortBy,
    setSortBy,

    bookingFilter,
    setBookingFilter,

    currentBookings,

    currentPage,
    setCurrentPage,

    totalPages,

    upcomingCount,
    completedCount,
    cancelledCount,

    setSelectedBooking,

    setActiveConversation,
    setActivePage,

    fetchBookings,

    messageText,
  } = props;


  const [openMenu, setOpenMenu] = useState(null);
  const [expandedBooking, setExpandedBooking] = useState(null);
  const menuRef = useRef(null);

useEffect(() => {
  
  const handleClickOutside = e => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target)
    ) {
      setOpenMenu(null);
    }
  };

  document.addEventListener(
    'mousedown',
    handleClickOutside
  );

  return () =>
    document.removeEventListener(
      'mousedown',
      handleClickOutside
    );
}, []);

  return (
    <>
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
                    <th>Renter</th>
                    <th>Booking ID</th>
                    <th>Event Dates</th>
                    <th>Total</th>
                    <th>Request Status</th>
                    <th>Items</th>
                    <th>Fulfillment Method</th>
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

                 currentBookings.map(booking => {

                    console.log(
                        currentBookings.map(b => ({
                          id: b.id?.uuid?.slice(0, 8),
                          state: b.attributes?.state,
                          process: b.attributes?.processName,
                        }))
                      );

                    return (
                      <React.Fragment key={booking.id.uuid}>
                        <tr>

                        <td>
                          {
                            booking.customer?.attributes
                              ?.profile
                              ?.displayName || 'Customer'
                          }
                        </td>

                        <td>
                          {booking.id?.uuid
                            ? booking.id.uuid.slice(0, 8)
                            : '-'}
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
                          {booking.attributes?.payinTotal
                            ? `$${(
                                booking.attributes.payinTotal.amount / 100
                              ).toFixed(2)}`
                            : '$0.00'}
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
                                    'state/expired' ||
                                  booking.attributes.state ===
                                    'state/declined'
                                ? css.statusCancelled

                                : booking.attributes.state ===
                                    'state/reviewed'
                                ? css.statusCompleted

                                : css.statusPending
                              }
                            >
                              {booking.attributes.state === 'state/preauthorized' &&
                                'Upcoming'}

                              {booking.attributes.state === 'state/accepted' &&
                                'Accepted'}

                              {booking.attributes.state === 'state/delivered' &&
                                'Completed'}

                              {booking.attributes.state === 'state/cancelled' &&
                                'Cancelled'}

                              {booking.attributes.state === 'state/expired' &&
                                'Expired'}

                              {booking.attributes.state === 'state/pending-payment' &&
                                'Pending Payment'}
                                {booking.attributes.state ===
                                'state/declined' &&
                                'Declined'}

                              {booking.attributes.state ===
                                'state/reviewed' &&
                                'Reviewed'}
                            </span>
                          </td>

                          <td>
                            {booking.lineItems?.length || 1}
                          </td>

                          <td>
                            Pickup
                          </td>

                          <td className={css.actionsCell}>
                            <button
                              className={css.menuButton}
                              onClick={() =>
                                setExpandedBooking(
                                  expandedBooking === booking.id.uuid
                                    ? null
                                    : booking.id.uuid
                                )
                              }
                            >
                              {expandedBooking === booking.id.uuid ? '−' : '+'}
                            </button>
                            <button
                              className={css.menuButton}
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

                                <button className={css.menuItem}>
                                  View
                                </button>

                                <button className={css.menuItem}>
                                  Details
                                </button>

                                <button className={css.menuItem}>
                                  Message
                                </button>

                                <button className={css.menuItem}>
                                  Invoice
                                </button>

                              </div>
                            )}

                          </td>

                        </tr>
                            {expandedBooking === booking.id.uuid && (
                              <tr>
                                <td colSpan="7">
                                  <div
                                    style={{
                                      padding: '20px',
                                      background: '#f9fafb',
                                      borderRadius: '8px',
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: '15px',
                                      }}
                                    >
                                      <div>
                                        <strong>Booking ID:</strong> {booking.id.uuid}
                                      </div>

                                      <div>
                                        <strong>Customer:</strong>{' '}
                                        {booking.customer?.attributes?.profile?.displayName}
                                      </div>
                                    </div>

                                    <table
                                      style={{
                                        width: '100%',
                                        borderCollapse: 'collapse',
                                      }}
                                    >
                                      <thead>
                                        <tr>
                                          <th width="40"></th>
                                          <th align="left">Product Info</th>
                                          <th align="left">Status</th>
                                          <th align="left">Price</th>
                                        </tr>
                                      </thead>

                                      <tbody>
                                        <tr>
                                          <td>
                                            <input type="checkbox" />
                                          </td>

                                          <td>
                                            <strong>
                                              {booking.listing?.attributes?.title}
                                            </strong>

                                            <div
                                              style={{
                                                fontSize: '12px',
                                                color: '#777',
                                                marginTop: '4px',
                                              }}
                                            >
                                              ID: {booking.id.uuid.slice(0, 8)}
                                            </div>
                                          </td>

                                          <td>
                                            {booking.attributes?.state}
                                          </td>

                                          <td>
                                            $
                                            {(booking.attributes?.payinTotal?.amount || 0) /
                                              100}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>

                                    <div
                                      style={{
                                        marginTop: '20px',
                                        display: 'flex',
                                        gap: '10px',
                                      }}
                                    >
                                      <button className={css.rejectBtn}>
                                        Reject Selected
                                      </button>

                                      <button className={css.approveBtn}>
                                        Approve Selected
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                     </React.Fragment>
  );
})


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
    </>
  );
};

export default BookingsTab;