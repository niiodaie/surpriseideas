import { X, CheckCircle, AlertCircle } from "lucide-react";

interface NotificationProps {
  visible: boolean;
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Notification({ visible, message, type, onClose }: NotificationProps) {
  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-md bg-white border rounded-lg shadow-lg p-4 transition-all duration-300 transform ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      } ${type === "success" ? "border-green-500" : "border-red-500"}`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 h-6 w-6">
          {type === "success" ? (
            <CheckCircle className="h-6 w-6 text-green-500" />
          ) : (
            <AlertCircle className="h-6 w-6 text-red-500" />
          )}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{message}</p>
          <p className="mt-1 text-sm text-gray-500">
            {type === "success" 
              ? "Check your inbox for the surprise ideas." 
              : "Please try again or contact support if the issue persists."}
          </p>
        </div>
        <button
          onClick={onClose}
          className="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Close</span>
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
