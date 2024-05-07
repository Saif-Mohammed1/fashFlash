import { signOut } from "next-auth/react";

const fetchApi = async (url, options = {}) => {
  if (!process.env.NEXT_PUBLIC_API_ENDPOINT) return;
  try {
    // Make a fetch request
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + url,
      options
    );

    if (!response.ok) {
      const err = await response.json();

      throw {
        status: response.status,
        message: err?.message || err || "Network response was not ok.",
      };
    }
    // Parse response JSON
    const data = await response.json();
    // Hide loading indicator

    return { data };
  } catch (error) {
    if (error.status === 401) {
      await signOut();
    }
    return { error };
  }
};
export default fetchApi;
/*
const fetchApi = async (url, options = {}) => {
  try {
    // Set default headers
    const defaultHeaders = {
      "Content-Type": "application/json", // Set the default Content-Type header
    };

    // Merge default headers with options.headers
    const headers = {
      ...defaultHeaders,
      ...options.headers,
    };

    // Make a fetch request with merged headers
    const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + url, {
      ...options,
      headers, // Set the merged headers
    });

    if (!response.ok) {
      const err = await response.json();
      throw err?.message || "Network response was not ok.";
    }

    // Parse response JSON
    const data = await response.json();

    return { data };
  } catch (error) {
    return { error };
  }
};

export default fetchApi;*/
