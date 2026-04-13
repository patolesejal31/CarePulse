import { useState, useEffect } from "react";

const Alert = ({ message, showAlert, onClose }: { message: string; showAlert: boolean; onClose: () => void }) => {
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        onClose(); // Hide alert after 5 seconds
      }, 5000);
      return () => clearTimeout(timer); // Clean up timer on unmount
    }
  }, [showAlert, onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 px-6 py-4 bg-green-500 text-white rounded-lg shadow-lg transition-opacity ${
        showAlert ? "opacity-100" : "opacity-0"
      }`}
      style={{ transition: "opacity 0.5s ease" }}
    >
      <p>{message}</p>
    </div>
  );
};

export default Alert;
