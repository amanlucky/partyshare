import sdk from '../../util/sdk';
import { denormalisedResponseEntities }
  from '../../util/data';
import { storableError } from '../../util/errors';
const FETCH_LISTINGS_REQUEST =
  'app/VendorDashboard/FETCH_LISTINGS_REQUEST';

const FETCH_LISTINGS_SUCCESS =
  'app/VendorDashboard/FETCH_LISTINGS_SUCCESS';

const FETCH_LISTINGS_ERROR =
  'app/VendorDashboard/FETCH_LISTINGS_ERROR';

const FETCH_BOOKINGS_REQUEST =
  'app/VendorDashboard/FETCH_BOOKINGS_REQUEST';

const FETCH_BOOKINGS_SUCCESS =
  'app/VendorDashboard/FETCH_BOOKINGS_SUCCESS';

const FETCH_BOOKINGS_ERROR =
  'app/VendorDashboard/FETCH_BOOKINGS_ERROR';  
// INITIAL STATE

const initialState = {

  listings: [],
  listingsLoading: false,
  listingsError: null,

  bookings: [],
  bookingsLoading: false,
  bookingsError: null,

};

// REDUCER

export default function reducer(
  state = initialState,
  action = {}
) {

  const { type, payload } = action;

  switch (type) {

    case FETCH_LISTINGS_REQUEST:
      return {
        ...state,
        listingsLoading: true,
        listingsError: null,
      };

    case FETCH_LISTINGS_SUCCESS:
      return {
        ...state,
        listingsLoading: false,
        listings: payload,
      };

    case FETCH_LISTINGS_ERROR:
      return {
        ...state,
        listingsLoading: false,
        listingsError: payload,
      };
    case FETCH_BOOKINGS_REQUEST:
   return {
        ...state,
        bookingsLoading: true,
        bookingsError: null,
      };

    case FETCH_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookingsLoading: false,
        bookings: payload,
      };

    case FETCH_BOOKINGS_ERROR:
      return {
        ...state,
        bookingsLoading: false,
        bookingsError: payload,
      };
    default:
      return state;
  }
}

// ACTIONS

export const fetchListingsRequest = () => ({
  type: FETCH_LISTINGS_REQUEST,
});

export const fetchListingsSuccess = listings => ({
  type: FETCH_LISTINGS_SUCCESS,
  payload: listings,
});

export const fetchListingsError = error => ({
  type: FETCH_LISTINGS_ERROR,
  payload: error,
});

export const fetchBookingsRequest = () => ({
  type: FETCH_BOOKINGS_REQUEST,
});

export const fetchBookingsSuccess = bookings => ({
  type: FETCH_BOOKINGS_SUCCESS,
  payload: bookings,
});

export const fetchBookingsError = error => ({
  type: FETCH_BOOKINGS_ERROR,
  payload: error,
});

export const fetchOwnListings = () => async dispatch => {

  dispatch(fetchListingsRequest());

  try {

    const response = await sdk.ownListings.query({
      include: ['images'],
      page: 1,
      perPage: 50,
      state: 'published',
    });

    dispatch(
      fetchListingsSuccess(response.data.data)
    );

  } catch (e) {

    dispatch(
      fetchListingsError(storableError(e))
    );

  }

};

export const publishListing = listingId =>
  async dispatch => {

    try {

      await sdk.ownListings.publishDraft({
        id: listingId,
      });

      dispatch(fetchOwnListings());

    } catch (e) {

      console.error(e);

    }

  };

  export const closeListing = listingId =>
  async dispatch => {

    try {

      await sdk.ownListings.close({
        id: listingId,
      });

      dispatch(fetchOwnListings());

    } catch (e) {

      console.error(e);

    }

  };

  export const openListing = listingId =>
  async dispatch => {

    try {

      await sdk.ownListings.open({
        id: listingId,
      });

      dispatch(fetchOwnListings());

    } catch (e) {

      console.error(e);

    }

  };

  export const fetchBookings = () =>
  async dispatch => {

    dispatch(fetchBookingsRequest());

    try {

      const response =
        await sdk.transactions.query({

          only: 'sale',

          include: [
            'customer',
            'listing',
          ],

          page: 1,
          perPage: 50,

        });

      const transactions =
        denormalisedResponseEntities(
          response
        );

      dispatch(
        fetchBookingsSuccess(
          transactions
        )
      );

    } catch (e) {

      dispatch(
        fetchBookingsError(
          storableError(e)
        )
      );

    }

  };