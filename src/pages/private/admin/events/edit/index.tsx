import { useEffect, useState } from "react";
import PageTitle from "../../../../../components/page-title";
import EventForm from "../common/event-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  editEvent,
  getEventById,
} from "../../../../../api-services/events-service";
import Spinner from "../../../../../components/spinner";

function EditEventPage() {
  const [eventData, setEventData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  const params: any = useParams();

  const getData = async () => {
    try {
      setLoading(true);
      const data = await getEventById(params.id);
      setEventData(data.data);
    } catch (error) {
      console.error("Error fetching event data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <PageTitle title="Edit Event" />
      <div className="mt-5">
        <EventForm initialData={eventData} type="edit" />
      </div>
    </div>
  );
}

export default EditEventPage;
