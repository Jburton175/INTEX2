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

  const fetchAverageRating = async () => {
    try {
      const response = await fetch(
        `https://localhost:5000/INTEX/ratings/${movieId}/average`
      );
      const data = await response.json();
      setAverageRating(data.average_rating);
    } catch (error) {
      console.error('Error fetching average rating:', error);
    }
  };

  const fetchUserRating = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      const response = await fetch(
        `https://localhost:5000/INTEX/ratings/${movieId}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setUserRating(data.rating);
      }
    } catch (error) {
      console.error('Error fetching user rating:', error);
    }
  };

  const handleRateMovie = async (rating: number) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Please login to rate movies');
      return;
    }

    try {
      setIsRatingLoading(true);
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
      
      setUserRating(rating);
      onRatingUpdate?.(rating);
      await fetchAverageRating();
    } catch (error) {
      console.error('Rating error:', error);
      alert('Failed to submit rating');
    } finally {
      setIsRatingLoading(false);
    }
  };

  useEffect(() => {
    if (!initialUserRating) fetchUserRating();
    if (!initialAverageRating) fetchAverageRating();
  }, [movieId]);

  const renderStars = (rating: number, interactive: boolean) => (
    <div className="star-container">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`star ${star <= rating ? 'filled' : ''} ${
            interactive ? 'interactive' : ''
          }`}
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