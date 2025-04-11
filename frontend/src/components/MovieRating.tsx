import React, { useState, useEffect } from "react";
import "./MovieRating.css";

interface MovieRatingProps {
  show_id: string;
  movieId: string;
  onRatingUpdate?: (newRating: number) => void;
}

const MovieRating: React.FC<MovieRatingProps> = ({ movieId, show_id, onRatingUpdate }) => {
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [isRatingLoading, setIsRatingLoading] = useState(false);
  const userId = localStorage.getItem("userId");

  const fetchRatings = async () => {
    if (!userId) {
      console.warn("🚫 No userId found in localStorage. Ratings cannot be fetched.");
      return;
    }

    const url = `https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/GetRatings?show_id=${movieId}&user_id=${userId}`;

    console.groupCollapsed(`🔍 fetchRatings() for show_id: ${movieId}`);
    try {
      console.log("📥 Fetching ratings from:", url);
      const response = await fetch(url, {
        method: "GET",
        credentials: "include", // ✅ Auth cookie
      });

      console.log("📬 Response status:", response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Failed to fetch ratings (Status: ${response.status})`, errorText);
        return;
      }

      const data = await response.json();
      console.log("✅ Ratings data received:", data);

      setUserRating(data.userRating ?? 0);
      setAverageRating(data.averageRating ?? 0);
    } catch (err) {
      console.error("💥 Unexpected error in fetchRatings():", err);
    } finally {
      console.groupEnd();
    }
  };

  const handleRateMovie = async (rating: number) => {
    if (!userId) {
      console.warn("🚫 No userId found in localStorage. Cannot submit rating.");
      return;
    }
  
    const endpoint = `https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/UpdateRating/${movieId}`;
    const body = JSON.stringify({
      show_id: movieId,
      rating,
      user_id: parseInt(userId),
    });
  
    console.groupCollapsed(`⭐ handleRateMovie(${rating}) for show_id: ${movieId}`);
    try {
      setIsRatingLoading(true);
      console.log("📤 Submitting rating to:", endpoint);
      console.log("📦 Payload:", body);
  
      const response = await fetch(endpoint, {
        method: "PUT",
        credentials: "include", // Important for auth/session cookie
        headers: { "Content-Type": "application/json" },
        body,
      });
  
      console.log("📬 Response status:", response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ PUT failed (Status: ${response.status})`, errorText);
        return;
      }
  
      console.log("✅ Rating submitted successfully.");
      setUserRating(rating);
  
      // ⚡ Optimistically update average (optional)
      // setAverageRating((prev) => (prev + rating) / 2); <-- not accurate, so we'll refetch
  
      await fetchRatings(); // ✅ Get latest average
  
      if (onRatingUpdate) {
        onRatingUpdate(rating);
      }
    } catch (error) {
      console.error("💥 Unexpected error in handleRateMovie():", error);
    } finally {
      setIsRatingLoading(false);
      console.groupEnd();
    }
  };
  
  const handleRemoveRating = async () => {
    console.info("🧹 Removing user rating by setting to 0...");
    await handleRateMovie(0);
  };

  const renderStars = (rating: number, interactive: boolean) => (
    <div className="star-container">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`star ${rating >= star ? "filled" : ""} ${interactive ? "interactive" : ""}`}
          onClick={interactive ? () => handleRateMovie(star) : undefined}
          disabled={isRatingLoading}
          aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );

  useEffect(() => {
    console.log(`📺 useEffect triggered for movieId: ${movieId}`);
    fetchRatings();
  }, [movieId]);

  return (
    <div className="rating-component">
      <div className="user-rating">
        <h3>Your Rating:</h3>
        {renderStars(userRating, true)}
        {userRating > 0 && (
          <button className="remove-rating" onClick={handleRemoveRating} disabled={isRatingLoading}>
            Remove Rating
          </button>
        )}
      </div>

      <div className="average-rating">
        <h3>Average Rating:</h3>
        {renderStars(Math.round(averageRating), false)}
        <span className="rating-number">({averageRating.toFixed(1)})</span>
      </div>
    </div>
  );
};

export default MovieRating;
