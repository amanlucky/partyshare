const useVendorStats = (
  bookings,
  inventoryItems,
  conversations,
  requestFilter
) => {

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
  .filter(
    booking =>
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
    booking.attributes.state === 'state/preauthorized' ||
    booking.attributes.state === 'state/accepted'
).length;

const completedCount = bookings.filter(
  booking =>
    booking.attributes.state === 'state/reviewed'
).length;

const cancelledCount = bookings.filter(
  booking =>
    booking.attributes.state === 'state/declined' ||
    booking.attributes.state === 'state/expired'
).length;

const unreadMessagesCount =
  conversations.filter(
    c => c.unread
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

    const totalListings =
    inventoryItems.length;

    const overviewStats = {
      pendingCount,
      approvedCount,
      grossRevenue,
      totalListings,
    };
  return {
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
};
};

export default useVendorStats;