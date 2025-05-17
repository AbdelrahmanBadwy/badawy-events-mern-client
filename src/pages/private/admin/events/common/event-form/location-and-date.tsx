import { Form, Input, Button } from "antd";
import type { EventFormStepProps } from ".";

function LocationAndDate({
  eventData,
  setEventData,
  setCurrentStep,
  currentStep,
}: EventFormStepProps) {
  return (
    <div className="grid grid-col-1 md:lg:grid-cols-3 gap-5">
      <Form.Item label="Address" required>
        <Input
          type="text"
          value={eventData.address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEventData({ ...eventData, address: e.target.value })
          }
          placeholder="Enter event Address"
          className="mt-2"
        />
      </Form.Item>
      <Form.Item label="City" required>
        <Input
          type="text"
          value={eventData.city}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEventData({ ...eventData, city: e.target.value })
          }
          placeholder="Enter event City"
        />
      </Form.Item>
      <Form.Item label="Pincode" required>
        <Input
          type="text"
          value={eventData.pincode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEventData({ ...eventData, pincode: e.target.value })
          }
          placeholder="Enter event Pincode"
        />
      </Form.Item>
      <Form.Item label="Date" required>
        <Input
          type="date"
          value={eventData.date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEventData({ ...eventData, date: e.target.value })
          }
          placeholder="Enter event Date"
          min={new Date().toISOString().split("T")[0]} // disable past dates
        />
      </Form.Item>
      <Form.Item label="Time" required>
        <Input
          type="time"
          value={eventData.time}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEventData({ ...eventData, time: e.target.value })
          }
          placeholder="Enter event Time"
        />
      </Form.Item>
      <div className="flex gap-10 justify-center col-span-3 mt-5">
        <Button onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>
        <Button
          type="primary"
          onClick={() => setCurrentStep(currentStep + 1)}
          className="bg-blue-500"
          disabled={
            !eventData.address ||
            !eventData.city ||
            !eventData.pincode ||
            !eventData.date ||
            !eventData.time
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default LocationAndDate;
