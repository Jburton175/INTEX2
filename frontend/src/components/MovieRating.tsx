import React, { useState, useEffect } from 'react';
import "./MovieRating.css";

interface MovieRatingProps {
  show_id: string;
  movieId: string;
  initialUserRating?: number;
  initialAverageRating?: number;
  onRatingUpdate?: (newRating: number) => void;
}

const MovieRating: React.FC<MovieRatingProps> = ({
  movieId,
  initialUserRating = 0,
  initialAverageRating = 0,
  onRatingUpdate
}) => {
  const [userRating, setUserRating] = useState(initialUserRating);
  const [averageRating, setAverageRating] = useState(initialAverageRating);
  const [isRatingLoading, setIsRatingLoading] = useState(false);
  const userId = localStorage.getItem('userId');

  const fetchRatings = async () => {
    if (!userId) {
      console.warn('❗️No userId found. Cannot fetch ratings.');
      return;
    }

    try {
      console.log(`📡 Fetching ratings for show_id: ${movieId}, user_id: ${userId}`);
      const response = await fetch(
        `https://localhost:5000/INTEX/GetRatings?show_id=${movieId}&user_id=${userId}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Ratings fetched:', data);

        setUserRating(data.userRating);
        if (Array.isArray(data.allRatings) && data.allRatings.length > 0) {
          const avg = data.allRatings.reduce((sum: number, r: any) => sum + r.rating, 0) / data.allRatings.length;
          setAverageRating(avg);
        } else {
          setAverageRating(0);
        }
      } else {
        console.error(`❌ Failed to fetch ratings. Status: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('💥 Error fetching ratings:', error);
    }
  };

  const handleRateMovie = async (rating: number) => {
    if (!userId) {
      console.warn('❗️No userId found in localStorage.');
      return;
    }

    try {
      setIsRatingLoading(true);
      const method = userRating === 0 ? 'POST' : 'PUT';
      const endpoint =
        method === 'POST'
          ? 'https://localhost:5000/INTEX/AddRating'
          : 'https://localhost:5000/INTEX/UpdateRating';

      const body = JSON.stringify({
        show_id: movieId,
        rating,
        user_id: parseInt(userId)
      });

      console.log(`📝 ${method} to ${endpoint}`, body);

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body
      });

      if (!response.ok) {
        const text = await response.text();
        console.error(`❌ Rating failed. Status: ${response.status}`, text);
        throw new Error(`Rating failed: ${response.statusText}`);
      }

      console.log('✅ Rating submitted successfully.');
      setUserRating(rating);
      onRatingUpdate?.(rating);
      await fetchRatings();
    } catch (error) {
      console.error('💥 Rating error:', error);
    } finally {
      setIsRatingLoading(false);
    }
  };

  const renderStars = (rating: number, interactive: boolean) => (
    <div className="star-container">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`star ${star <= rating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
          onClick={interactive ? () => handleRateMovie(star) : undefined}
          disabled={isRatingLoading || !interactive}
          aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  );

  useEffect(() => {
    fetchRatings();
  }, [movieId]);

  return (
    <div className="rating-component">
      <div className="user-rating">
        <h3>Your Rating:</h3>
        {renderStars(userRating, true)}
        {userRating > 0 && (
          <button
            className="remove-rating"
            onClick={() => handleRateMovie(0)}
            disabled={isRatingLoading}
          >
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
