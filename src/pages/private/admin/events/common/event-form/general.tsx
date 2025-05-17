import { Form, Input, Button, Tag } from "antd";
import type { EventFormStepProps } from ".";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function General({
  eventData,
  setEventData,
  setCurrentStep,
  currentStep,
}: EventFormStepProps) {
  const [guestInputValue, setGuestInputValue] = useState("");
  const navigate = useNavigate();

  const onAddGuest = () => {
    const guests = guestInputValue.split(",");
    setEventData({
      ...eventData,
      guests: [...(eventData.guests || []), ...guests],
    });
    setGuestInputValue("");
  };

  const onRemoveGuest = (guest: string) => {
    setEventData({
      ...eventData,
      guests: eventData.guests.filter((g: string) => g !== guest),
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <Form.Item label="Event Name" required>
        <Input
          value={eventData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEventData({ ...eventData, name: e.target.value })
          }
          placeholder="Enter event name"
          className="mt-2"
        />
      </Form.Item>
      <Form.Item label="Event Description" required>
        <Input.TextArea
          value={eventData.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setEventData({ ...eventData, description: e.target.value })
          }
          placeholder="Enter event description"
          className="mt-2"
        />
      </Form.Item>
      <Form.Item label="Organizer" required>
        <Input
          value={eventData.organizer}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEventData({ ...eventData, organizer: e.target.value })
          }
          placeholder="Organizer"
          className="mt-2"
        />
      </Form.Item>
      <Form.Item label="Add guests" required>
        <div className="flex gap-5">
          <Input
            value={guestInputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setGuestInputValue(e.target.value)
            }
            placeholder="Add guest (comma separated)"
            className="mt-2"
          />
          <Button
            disabled={!guestInputValue}
            onClick={onAddGuest}
            type="primary"
            className="mt-2"
          >
            Add
          </Button>
        </div>
      </Form.Item>
      <div className="flex flex-wrap gap-5">
        {eventData.guests &&
          eventData.guests.map((guest: string) => (
            <Tag
              key={guest}
              closable
              onClose={() => onRemoveGuest(guest)}
              className="bg-blue-500 text-white"
            >
              {guest}
            </Tag>
          ))}
      </div>
      <div className="flex gap-10 justify-center">
        <Button onClick={() => navigate("/admin/events")}>Back</Button>
        <Button
          type="primary"
          onClick={() => setCurrentStep(currentStep + 1)}
          className="bg-blue-500"
          disabled={
            !eventData.name || !eventData.description || !eventData.organizer
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default General;
