import { Upload, Button } from "antd";
import type { EventFormStepProps } from ".";

function Media({
  setCurrentStep,
  currentStep,
  selectedMediaFiles,
  setSelectedMediaFiles,
  eventData,
  setEventData,
}: EventFormStepProps) {
  const onSelectedMediaRemove = (index: number) => {
    const existingSelectedMediaFiles = [...selectedMediaFiles];
    const newSelectedMediaFiles = existingSelectedMediaFiles.filter(
      (_, i) => i !== index
    );
    setSelectedMediaFiles?.(newSelectedMediaFiles);
  };
  const onAlreadyUploadedMediaRemove = (index: number) => {
    const existingMediaFiles = [...eventData.media];
    const newMediaFiles = existingMediaFiles.filter((_, i) => i !== index);
    setEventData({ ...eventData, media: newMediaFiles });
  };
  return (
    <div>
      <div>
        <Upload
          listType="picture-card"
          beforeUpload={function (file: any) {
            setSelectedMediaFiles?.((prevFiles: any) => [...prevFiles, file]);
            return false;
          }}
          onRemove={(file: any) => {
            setSelectedMediaFiles?.((prevFiles: any) =>
              prevFiles.filter((f: any) => f.uid !== file.uid)
            );
          }}
          multiple
          showUploadList={false} // Disable the default upload list
        >
          <span className="text-gray-500 text-xs">Click here to upload</span>
        </Upload>
      </div>

      <div className="flex flex-wrap gap-5 mt-5">
        {selectedMediaFiles?.map((file: any, index: any) => (
          <div
            key={file.name}
            className="w-40 h-40 bg-gray-200 rounded-lg flex flex-col gap-5 items-center justify-center border p-3"
          >
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="w-full h-[100px] object-cover rounded-lg"
            />
            <span
              className="underline text-sm text-center cursor-pointer"
              onClick={() => onSelectedMediaRemove(index)}
            >
              Remove
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-5 mt-5">
        {eventData?.media?.map((url: any, index: any) => (
          <div
            key={url.name}
            className="w-40 h-40 bg-gray-200 rounded-lg flex flex-col gap-5 items-center justify-center border p-3"
          >
            <img
              src={url}
              alt="preview"
              className="w-full h-[100px] object-cover rounded-lg"
            />
            <span
              className="underline text-sm text-center cursor-pointer"
              onClick={() => onAlreadyUploadedMediaRemove(index)}
            >
              Remove
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-10 justify-center col-span-3 mt-5">
        <Button onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>
        <Button
          type="primary"
          onClick={() => setCurrentStep(currentStep + 1)}
          className="bg-blue-500"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Media;
