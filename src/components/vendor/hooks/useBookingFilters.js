const useBookingFilters = (
  bookings,
  bookingFilter,
  bookingSearch,
  sortBy,
  currentPage,
  bookingsPerPage
) => {

  const filteredBookings = bookings.filter(
    booking => {

      const state =
        booking.attributes.state;

      const customerName =
        booking.customer?.attributes
          ?.profile?.displayName
          ?.toLowerCase() || '';

      const listingTitle =
        booking.listing?.attributes
          ?.title
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
    }
  );

  const sortedBookings = [
    ...filteredBookings,
  ].sort((a, b) => {

    if (sortBy === 'newest') {
      return (
        new Date(b.attributes.createdAt) -
        new Date(a.attributes.createdAt)
      );
    }

    if (sortBy === 'oldest') {
      return (
        new Date(a.attributes.createdAt) -
        new Date(b.attributes.createdAt)
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
    sortedBookings.length /
      bookingsPerPage
  );

  return {
    currentBookings,
    totalPages,
  };
};

export default useBookingFilters;