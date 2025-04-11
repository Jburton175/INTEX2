// components/MovieRating.tsx
import React, { useState, useEffect } from 'react';
import "./MovieRating.css"

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

  // This function fetches both the current user's rating and the average rating.
  const fetchRatings = async () => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage.');
      return;
    }
    
    try {
      const response = await fetch(
        `https://localhost:5000/INTEX/GetRatings?show_id=${movieId}&user_id=${userId}`,
        { headers: token ? { 'Authorization': `Bearer ${token}` } : {} }
      );
      
      if (response.ok) {
        const data = await response.json();
        // data is expected to have { userRating: number, averageRating: number }
        setUserRating(data.userRating);
        setAverageRating(data.averageRating);
      } else {
        console.error('Error fetching ratings:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  // This function is used to either add or update the user's rating.
  const handleRateMovie = async (rating: number) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Please login to rate movies');
      return;
    }

    try {
      setIsRatingLoading(true);
      // Use POST for creating a new rating and PATCH for updating an existing one
      const method = userRating === 0 ? 'POST' : 'PATCH';
      
      const response = await fetch(`https://localhost:5000/INTEX/ratings`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          show_id: movieId,
          rating
        })
      });

      if (!response.ok) throw new Error('Rating failed');

      // Update the local user rating and invoke any provided callback.
      setUserRating(rating);
      onRatingUpdate?.(rating);
      // Re-fetch ratings to update the average rating as well.
      await fetchRatings();
    } catch (error) {
      console.error('Rating error:', error);
      alert('Failed to submit rating');
    } finally {
      setIsRatingLoading(false);
    }
  };

  // When the component mounts or when the movieId changes, fetch the ratings.
  useEffect(() => {
    fetchRatings();
  }, [movieId]);

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
