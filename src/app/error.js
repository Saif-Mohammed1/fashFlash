"use client";

// Error components must be Client Components

import { useEffect, useState } from "react";

export default function Error({ error, reset }) {
  const [errors, setErrors] = useState(error || "");
  useEffect(() => {
    setErrors(error);
    // Log the error to an error reporting service
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-red-500 p-8 rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h2>
        <p className="text-lg mb-4">
          {errors?.message || "Unknown error occurred."}
        </p>
        {/* Render a button to attempt to recover by resetting the error */}
        {/* This will reload the page or navigate to another route */}
        <button
          onClick={() => reset()}
          className="bg-white text-red-500 py-2 px-4 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
