import { useEffect, useState, type Key } from "react";

import type { EventType } from "../../../interfaces";
import { Image, message } from "antd";
import { useParams } from "react-router-dom";
import { getEventById } from "../../../api-services/events-service";
import Spinner from "../../../components/spinner";
import { MapPin, Timer } from "lucide-react";
import {
  getDateFormat,
  getDateTimeFormat,
} from "../../../helpers/date-time-formate";
import TicketsSelection from "./common/tickets-selection";

function EventInfoPage() {
  const [eventData, setEventData] = useState<EventType | any>(null);
  const [loading, setLoading] = useState(false);

  const params: any = useParams();

  const getData = async () => {
    setLoading(true);
    try {
      const response = await getEventById(params.id);
      setEventData(response.data);
    } catch (error: any) {
      message.error("Error fetching event data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderEventProperty = (label: string, value: any) => {
    return (
      <div className="flex flex-col text-sm">
        <span className="text-gray-500">{label}</span>
        <span className="text-gray-800 font-semibold">{value}</span>
      </div>
    );
  };

  useEffect(() => {
    getData();
  }, []);
  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    eventData && (
      <div>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-gray-600">{eventData?.name}</h1>
          <div className="flex gap-10">
            <div className="flex gap-1 text-gray-500 items-center">
              <MapPin size={12} />
              <span className="text-gray-500 text-xs">
                {eventData?.address} {eventData?.city} {eventData?.pincode}
              </span>
            </div>

            <div className="flex gap-1 text-gray-500 items-center">
              <Timer size={16} />
              <span className="text-gray-500 text-xs">
                {getDateTimeFormat(`${eventData?.date} ${eventData?.time}`)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3 mt-7">
          <Image.PreviewGroup>
          {eventData?.media.map(
            (media: string, index: Key | null | undefined) =>
              media && (
                <Image
                  src={media}
                  height={220}
                  className="object-cover rounded"
                  key={index}
                />
              )
          )}
          </Image.PreviewGroup>
        </div>

        <div className="mt-7">
          <p className="text-gray-600 text-sm">{eventData?.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3 bg-gray-100 mt-7 gap-5">
          {renderEventProperty("Organizer", eventData?.organizer)}
          {renderEventProperty("Address", eventData?.address)}
          {renderEventProperty("City", eventData?.city)}
          {renderEventProperty("Pincode", eventData?.pincode)}
          {renderEventProperty("Date", getDateFormat(eventData.date))}
          {renderEventProperty("Time", eventData.time)}
          <div className="col-span-3">
            {renderEventProperty("Guests", eventData.guests.join(", "))}
          </div>
        </div>

        <div className="mt-7">
          <TicketsSelection eventData={eventData} />
        </div>
      </div>
    )
  );
}

export default EventInfoPage;
