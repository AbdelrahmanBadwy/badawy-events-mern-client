import { message } from "antd";
import axios from "axios";

export const createEvent = async (eventData: any) => {
  try {
    console.log("Event data:", eventData);
    const response = await axios.post("/api/events/create-event", eventData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    message.success("Event created successfully");
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const getEvents = async (filters: any) => {
  try {
    const response = await axios.get(
      `/api/events/get-events?searchText=${filters.searchText}&date=${filters.date}`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
export const getEventById = async (eventId: string) => {
  try {
    const response = await axios.get(`/api/events/get-event/${eventId}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
    const response = await axios.delete(`/api/events/delete-event/${eventId}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    message.success("Event deleted successfully");
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

export const editEvent = async (eventId: string, eventData: any) => {
  try {
    const response = await axios.put(
      `/api/events/edit-event/${eventId}`,
      eventData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    message.success("Event updated successfully");
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};
