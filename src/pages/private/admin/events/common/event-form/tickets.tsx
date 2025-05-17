import { Button, Input } from "antd";
import type { EventFormStepProps } from ".";

function Tickets({
  setCurrentStep,
  currentStep,
  eventData,
  setEventData,
  loading,
  onFinish,
}: EventFormStepProps) {
  const onAddTicketType = () => {
    const existingTicketTypes = eventData?.ticketTypes || [];
    existingTicketTypes.push({
      name: "",
      price: 0,
      limit: 0,
    });
    setEventData({
      ...eventData,
      ticketTypes: existingTicketTypes,
    });
  };
  return (
    <div className="flex flex-col gap-5">
      <Button onClick={() => onAddTicketType()} className="w-max">
        Add Ticket Type
      </Button>
      {eventData?.ticketTypes?.length > 0 && (
        <div>
          <div className="grid grid-cols-4 gap-5">
            <span className="font-semibold">Name</span>
            <span className="font-semibold">Price</span>
            <span className="font-semibold">Limit</span>
          </div>
          {eventData?.ticketTypes?.map((ticketType: any, index: number) => (
            <div key={index} className="grid grid-cols-4 gap-2 items-center">
              <Input
                type="text"
                value={ticketType.name}
                onChange={(e: { target: { value: any } }) => {
                  const updatedTicketTypes = [...eventData.ticketTypes];
                  updatedTicketTypes[index].name = e.target.value;
                  setEventData({
                    ...eventData,
                    ticketTypes: updatedTicketTypes,
                  });
                }}
                className="border p-2 rounded"
              />
              <Input
                type="number"
                value={ticketType.price}
                onChange={(e: { target: { value: string } }) => {
                  const updatedTicketTypes = [...eventData.ticketTypes];
                  updatedTicketTypes[index].price = parseFloat(e.target.value);
                  setEventData({
                    ...eventData,
                    ticketTypes: updatedTicketTypes,
                  });
                }}
                className="border p-2 rounded"
              />
              <Input
                type="number"
                value={ticketType.limit}
                onChange={(e: { target: { value: string } }) => {
                  const updatedTicketTypes = [...eventData.ticketTypes];
                  updatedTicketTypes[index].limit = parseInt(e.target.value);
                  setEventData({
                    ...eventData,
                    ticketTypes: updatedTicketTypes,
                  });
                }}
                className="border p-2 rounded"
              />

              <Button
                type="link"
                danger
                onClick={() => {
                  const updatedTicketTypes = [...eventData.ticketTypes];
                  updatedTicketTypes.splice(index, 1);
                  setEventData({
                    ...eventData,
                    ticketTypes: updatedTicketTypes,
                  });
                }}
                className="text-red-500"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-10 justify-center col-span-3 mt-5">
        <Button
          disabled={loading}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Back
        </Button>
        <Button
          type="primary"
          onClick={onFinish}
          className="bg-blue-500"
          loading={loading}
          disabled={loading}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Tickets;
