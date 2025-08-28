import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, getSocket } from "../sockets/socket";
import { fetchProviderBookingsThunk } from "../redux/Slices/bookingSlice";
import { toast } from "react-toastify";

const BookingListener = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);

  useEffect(() => {
    if (!user || user.role !== "provider") {
      console.log("🛑 Not a provider or missing user");
      return;
    }

    let socket = getSocket();

    if (!socket) {
      console.log("🛑 Socket not initialized, initializing now...");
      socket = connectSocket(user.token);
    }

    if (!socket) {
      console.log("🛑 Socket still not initialized");
      return;
    }

    console.log("👤 BookingListener active for:", user);

    socket.emit("joinRoom", user._id || user.id);

    dispatch(fetchProviderBookingsThunk());

    const handleNewBooking = () => {
      toast.info("📥 New service request received!");
      dispatch(fetchProviderBookingsThunk());
    };

    const handleBookingUpdated = () => {
      dispatch(fetchProviderBookingsThunk());
    };

    socket.on("newBooking", handleNewBooking);
    socket.on("bookingUpdated", handleBookingUpdated);

    return () => {
      socket.off("newBooking", handleNewBooking);
      socket.off("bookingUpdated", handleBookingUpdated);
    };
  }, [dispatch, user]);

  return null;
};

export default BookingListener;
