import cameraicon from "../assets/uploadcameraicon.svg";

type IssueReportingModalProps = {
  open: boolean;
  onClose: () => void;
  requestId?: string | null;
};

export default function PhotoModel({
  open,
  onClose,
}: IssueReportingModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="md:max-w-[640px] w-[96%] bg-white rounded-xl shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lg:px-6 px-3 py-4 border-b">
          <h2 className="text-lg font-semibold text-[#111827]">
            Send Photo
          </h2>
        </div>

        <div className="p-6 space-y-3">
          <p>Upload Photo</p>
          <div className="border-2 border-dashed rounded-lg p-6 flex items-center justify-center text-center gap-2">
            <div className="flex-1 flex flex-col gap-3 items-center justify-center">
              <div className="text-2xl">
                <img src={cameraicon} alt="" className="w-10" />
              </div>
              <p className="text-sm text-[#6B7280]">
                Click to upload photos or drag and drop
              </p>
              <p className="text-xs text-[#9CA3AF]">
                PNG, JPG up to 10MB each
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button onClick={onClose}
            className="px-6 py-2 rounded-lg bg-[#F3F4F6] text-[#111827]"
          >
            Cancel
          </button>
          <button onClick={onClose} className="px-6 py-2 rounded-lg bg-[#2563EB] text-white">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
