// "use client";
import fetchApi from "@/component/util/fetchApi";
import { useState } from "react";
import { toast } from "react-toastify";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";

const CreateReview = ({ reviewsLength, productId }) => {
  const [openReviewer, setOpenReviewer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0); // State for rating input
  const [reviewText, setReviewText] = useState(""); // State for review text input
  const router = useRouter();
  const checkOrder = async () => {
    setLoading(true);
    try {
      const { data, error } = await fetchApi(
        `/product/${productId}/reviews/check-status`
      );
      if (error) throw error;
      setOpenReviewer(true);
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "An unexpected error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate rating and review text
      if (rating === 0) {
        throw new Error("Please provide a rating.");
      }
      if (reviewText.trim().length === 0) {
        throw new Error("Please provide a review text.");
      }

      // Perform submission logic
      setLoading(true);
      // Example API call to submit review
      const { data, error } = await fetchApi(`/product/${productId}/reviews`, {
        method: "POST",
        body: JSON.stringify({ rating, reviewText }),
      });
      // Handle response as needed
      if (error) throw error;
      // Reset form state after successful submission
      router.refresh();
      setRating(0);
      setReviewText("");
      setOpenReviewer(false);
      toast.success("Review submitted successfully.");
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "An unexpected error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col space-y-4 mt-5">
      <button
        onClick={checkOrder}
        disabled={loading || openReviewer}
        className={`py-2 px-4 bg-blue-500 text-white rounded-md shadow-md transition duration-300 hover:bg-blue-600 focus:outline-none cursor-pointer ${
          openReviewer ? "hidden" : ""
        }`}
      >
        {loading
          ? "Loading..."
          : reviewsLength > 0
          ? "Write a Review"
          : "Be the first to review"}
      </button>
      {openReviewer && (
        <div className="flex flex-col items-start space-y-4  ">
          <Rating
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            precision={0.2}
            className="self-center"
          />
          <textarea
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
            placeholder="Write your review here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500
            bg-gray-200"
            rows={4}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md transition duration-300 hover:bg-blue-600 focus:outline-none"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateReview;
