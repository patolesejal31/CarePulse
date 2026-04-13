import React, { FC } from "react";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  onSubmit?: () => void;
}

const CustomModal: FC<CustomModalProps> = ({ isOpen, onClose, title, content, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="mt-4">{content}</div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
          >
            Cancel
          </button>
          {onSubmit && (
            <button
              onClick={onSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
