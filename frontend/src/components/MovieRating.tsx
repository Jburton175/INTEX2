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
  const [userId, setUserId] = useState<string | null>(null);

  // Capture email and fetch user_id from the server
  const fetchUserId = async () => {
    try {
      const res = await fetch('https://localhost:5000/pingauth', {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch email');
      const data = await res.json();
      const email = data.email;
      if (!email) throw new Error('Email not found in pingauth response');

      const idRes = await fetch(`https://localhost:5000/INTEX/getUserId?email=${encodeURIComponent(email)}`);
      if (!idRes.ok) throw new Error('Failed to fetch user_id');
      const { user_id } = await idRes.json();
      setUserId(user_id);
      localStorage.setItem('userId', user_id);
    } catch (err) {
      console.error('Error getting user ID:', err);
    }
  };

  const fetchRatings = async () => {
    const token = localStorage.getItem('authToken');
    const storedId = userId || localStorage.getItem('userId');
    if (!storedId) return;

    try {
      const res = await fetch(
        `https://localhost:5000/INTEX/GetRatings?show_id=${movieId}&user_id=${storedId}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      if (!res.ok) throw new Error('Failed to fetch ratings');
      const data = await res.json();
      setUserRating(data.userRating);
      setAverageRating(data.averageRating);
    } catch (err) {
      console.error('Error fetching ratings:', err);
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
      const res = await fetch(`https://localhost:5000/INTEX/ratings`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          show_id: movieId,
          rating,
        }),
      });

      if (!res.ok) throw new Error('Rating failed');
      setUserRating(rating);
      onRatingUpdate?.(rating);
      await fetchRatings();
    } catch (err) {
      console.error('Rating error:', err);
      alert('Failed to submit rating');
    } finally {
      setIsRatingLoading(false);
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId || localStorage.getItem('userId')) {
      fetchRatings();
    }
  }, [movieId, userId]);

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
