import { message, Steps } from "antd";
import General from "./general";
import LocationAndDate from "./location-and-date";
import Media from "./media";
import Tickets from "./tickets";
import { useState } from "react";
import { Form } from "antd";
import { uploadFileToFirebaseAndReturnUrl } from "../../../../../../api-services/storage-service";
import {
  createEvent,
  editEvent,
} from "../../../../../../api-services/events-service";
import { useNavigate, useParams } from "react-router-dom";

export interface EventFormStepProps {
  eventData: any;
  setEventData: (data: any) => void;
  setCurrentStep: (step: number) => void;
  currentStep: number;
  selectedMediaFiles?: any;
  setSelectedMediaFiles?: (files: any) => void;
  loading?: boolean;
  onFinish?: () => void;
}

function EventForm({
  initialData = {},
  type = "create",
}: {
  initialData?: any;
  type?: "create" | "edit";
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [eventData, setEventData] = useState<any>(initialData);
  const [selectedMediaFiles, setSelectedMediaFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const params: any = useParams();

  const onFinish = async () => {
    try {
      setLoading(true);
      const [...urls] = await Promise.all(
        selectedMediaFiles.map(async (file) => {
          return await uploadFileToFirebaseAndReturnUrl(file);
        })
      );

      eventData.media = [...(eventData?.media || []), ...urls];

      if (type === "edit") {
        if (!params.id) {
          message.error("Event ID is required for editing");
          return;
        }
        await editEvent(params.id, eventData);
        message.success("Event updated successfully");
      } else {
        await createEvent(eventData);
        message.success("Event created successfully");
      }

      navigate("/admin/events");
    } catch (error: any) {
      message.error("Error creating event", error.message);
    } finally {
      setLoading(false);
    }
  };

  const commonProps = {
    eventData,
    setEventData,
    setCurrentStep,
    currentStep,
    selectedMediaFiles,
    setSelectedMediaFiles,
    loading,
    setLoading,
    onFinish,
  };
  const stepsData = [
    {
      title: "General",
      content: <General {...commonProps} />,
    },
    {
      title: "Location & Date",
      content: <LocationAndDate {...commonProps} />,
    },
    {
      title: "Media",
      content: <Media {...commonProps} />,
    },
    {
      title: "Tickets",
      content: <Tickets {...commonProps} />,
    },
  ];

  return (
    <Form layout="vertical" className="w-full">
      <Steps
        current={currentStep}
        size="small"
        onChange={(index: number) => setCurrentStep(index)}
      >
        {stepsData.map((step, index) => (
          <Steps.Step
            key={index}
            title={step.title}
            disabled={currentStep < index}
            // status={currentStep === index ? "process" : "wait"}
          />
        ))}
      </Steps>
      <div className="mt-5">{stepsData[currentStep].content}</div>
    </Form>
  );
}

export default EventForm;
