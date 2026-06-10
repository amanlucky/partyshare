import React from 'react';
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
    </>
  );
};

export default BookingsTab;