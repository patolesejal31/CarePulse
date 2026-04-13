"use client";
import { useState } from "react";

const LogoutButton = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleLogout = () => {
    setShowAlert(true); // Show custom alert
  };

  const confirmLogout = () => {
    window.location.href = "/"; // Redirect after confirmation
  };

  return (
    <>
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-700"
      >
        Log Out
      </button>

      {/* Custom Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-lg font-semibold text-red-600 mb-4">
              Are you sure you want to log out?
            </h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowAlert(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButton;
