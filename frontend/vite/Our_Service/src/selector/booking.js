import { createSelector } from 'reselect';

// Base selector for the bookings slice
const selectBookingState = (state) => state.bookings;

// Memoized selector for provider bookings
export const selectProviderBookings = createSelector(
  [selectBookingState],
  (bookingsState) => bookingsState.bookings || []
);
