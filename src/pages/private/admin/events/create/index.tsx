import PageTitle from "../../../../../components/page-title";
import EventForm from "../common/event-form";

function CreateEventPage() {
  return (
    <div>
      <PageTitle title="Create Event" />
      <div className="mb-5 mt-5">
        <EventForm />
      </div>
    </div>
  );
}

export default CreateEventPage;
