import React from "react";
import sdk from "../../../util/sdk";
import css from "../../../containers/VendorDashboardPage/VendorDashboardPage.module.css";

const BookingRequestsTab = ({
  bookingRequests,
  requestFilter,
  setRequestFilter,
  pendingCount,
  approvedCount,
  rejectedCount,
  fetchBookings,
}) => {
  return (
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
  );
};

export default BookingRequestsTab;