import React from "react";
import css from "../../../containers/VendorDashboardPage/VendorDashboardPage.module.css";

const BookingDetailsModal = ({
  selectedBooking,
  setSelectedBooking,
}) => {
  if (!selectedBooking) return null;

  return (
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
  );
};

export default BookingDetailsModal;