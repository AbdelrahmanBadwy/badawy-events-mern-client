import { useEffect, useState } from "react";
import type { UserStoreType } from "../../../store/user-store";
import useUserStore from "../../../store/user-store";
import { message } from "antd";
import { getEvents } from "../../../api-services/events-service";
import EventCard from "./common/event-card";
import type { EventType } from "../../../interfaces";
import Filters from "./common/filters";
import Spinner from "../../../components/spinner";
// import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    searchText: "",
    date: "",
  });
  const { currentUser } = useUserStore() as UserStoreType;

  const getData = async (filtersObj: { searchText: string; date: string }) => {
    try {
      setLoading(true);
      const response = await getEvents(filtersObj);
      console.log("Response:", response);
      setEvents(response.data);
    } catch (error: any) {
      message.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData({
      searchText: "",
      date: "",
    });
  }, []);
  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <p className="text-gray-600 text-xl font-bold">
        Welcome, {currentUser?.name}!!!
      </p>

      <Filters filters={filters} setFilters={setFilters} onFilter={getData} />
      <div className="flex flex-col gap-7 mt-7">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
