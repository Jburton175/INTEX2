import React, { useState, useEffect } from 'react';
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
  const userId = localStorage.getItem('userId');

  const fetchRatings = async () => {
    if (!userId) return;

    try {
      const response = await fetch(
        `https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/GetRatings?show_id=${movieId}&user_id=${userId}`
      );


      if (response.ok) {
        const data = await response.json();
        console.log('✅ Ratings fetched:', data);
        setUserRating(data.userRating ?? 0);
        setAverageRating(data.averageRating ?? 0);
      } else {
        console.error('❌ Failed to fetch ratings');
      }
    } catch (err) {
      console.error('💥 Error fetching ratings:', err);
    }
  };

  const handleRateMovie = async (rating: number) => {
    if (!userId) return;
  
    try {
      setIsRatingLoading(true);
      const endpoint = `https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/UpdateRating/${movieId}`;
  
      const body = JSON.stringify({
        show_id: movieId,
        rating,
        user_id: parseInt(userId)
      });
  
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body
      });
  
      if (!response.ok) {
        const text = await response.text();
        console.error(`❌ Rating failed. Status: ${response.status}`, text);
        return;
      }
  
      console.log('✅ Rating submitted successfully');
      setUserRating(rating);
      await fetchRatings();
    } catch (error) {
      console.error('💥 Rating error:', error);
    } finally {
      setIsRatingLoading(false);
    }
  };
  

  const handleRemoveRating = async () => {
    await handleRateMovie(0);
  };

  const renderStars = (rating: number, interactive: boolean) => (
    <div className="star-container">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`star ${rating >= star ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
          onClick={interactive ? () => handleRateMovie(star) : undefined}
          disabled={isRatingLoading}
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

