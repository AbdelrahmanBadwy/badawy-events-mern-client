import axios from "axios";

export const createBooking = async (bookingData: any) => {
  try {
    const response = await axios.post(
      "/api/bookings/create-booking",
      bookingData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export const getUserBookings = async () => {
  try {
    const response = await axios.get("/api/bookings/get-user-bookings/");
    return response.data;
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    throw error;
  }
};

export const getAllBookings = async () => {
  const response = await axios.get("/api/bookings/get-all-bookings");
  return response.data;
};

export const cancelBooking = async (data: any) => {
  const response = await axios.post("/api/bookings/cancel-booking", data);
  return response.data;
};
