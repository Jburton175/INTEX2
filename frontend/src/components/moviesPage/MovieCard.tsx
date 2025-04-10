import React from "react";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: string;
  show_id: string;
  title: string;
  duration: string;
  rating: number;
  image: string;
  releaseDate?: string;
}

interface MovieCardProps {
  movie: Movie;
  onImageError: (movieId: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onImageError }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.show_id}`);
  };

// In MovieCard.tsx

return (
  <div onClick={handleClick}>
    <img
      src={movie.image}
      alt={movie.title}
      onError={() => onImageError(movie.show_id)}
      style={{ width: "150px", height: "auto", objectFit: "cover" }}  // smaller poster
    />
    <h3>{movie.title}</h3>
    <p>{movie.duration}</p>
  </div>
);
}

export default MovieCard;
