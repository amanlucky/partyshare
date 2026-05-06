import sdk from '../../util/sdk';
import { storableError } from '../../util/errors';
const FETCH_LISTINGS_REQUEST =
  'app/VendorDashboard/FETCH_LISTINGS_REQUEST';

const FETCH_LISTINGS_SUCCESS =
  'app/VendorDashboard/FETCH_LISTINGS_SUCCESS';

const FETCH_LISTINGS_ERROR =
  'app/VendorDashboard/FETCH_LISTINGS_ERROR';

// INITIAL STATE

const initialState = {
  listings: [],
  listingsLoading: false,
  listingsError: null,
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