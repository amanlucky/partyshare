import { useState, useEffect } from "react";

const useVendorConversations = (bookings) => {
  const [conversations, setConversations] =
    useState([]);

  const [activeConversation, setActiveConversation] =
    useState(null);

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
  return {
    conversations,
    setConversations,

    activeConversation,
    setActiveConversation,
  };
};

export default useVendorConversations;