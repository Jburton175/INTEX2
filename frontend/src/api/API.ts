import { addMovies } from "../types/addMovies";
import { Movies } from "../types/Movies";
import { Users } from "../types/Users";
import { Recommendation } from "../types/recommendation";
import { useEffect, useState } from "react";

// implement crud for movies
interface FetchMoviesResponse {
  movies: Movies[];
  totalNumMovies: number;
}

const API_URL =
  "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX";
// "https://localhost:5000//INTEX";

export const fetchMovies = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchMoviesResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `movieTypes=${encodeURIComponent(cat)}`)
      .join("&");

    const response = await fetch(
      `${API_URL}/GetAllMovies?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ""}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching movies: ", error);
    throw error;
  }
};

export const fetchOneMovie = async (id: string): Promise<Movies> => {
  try {
    const response = await fetch(`${API_URL}/GetOneMovie?show_id=${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch movie");
    }

    const data: Movies = await response.json();
    if (!data || !data.show_id) {
      throw new Error("Movie not found or invalid structure");
    }

    return data;
  } catch (error) {
    console.error("Error fetching movie: ", error);
    throw error;
  }
};

export const addMovie = async (newMovie: addMovies): Promise<addMovies> => {
  try {
    const response = await fetch(`${API_URL}/AddMovie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    });

    if (!response.ok) {
      throw new Error("Failed to add movie");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding movie", error);
    throw error;
  }
};

export const UpdateMovie = async (
  movieId: string,
  updatedMovie: Movies
): Promise<Movies> => {
  try {
    const response = await fetch(`${API_URL}/UpdateMovie/${movieId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMovie),
    });

    if (!response.ok) {
      throw new Error("Failed to update movie");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error;
  }
};

export const deleteMovie = async (movieId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteMovie/${movieId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete movie");
    }
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};

export const fetchUsers = async (): Promise<Users[]> => {
  const response = await fetch(`${API_URL}/GetAllUsers`);
  if (!response.ok) throw new Error("Failed to fetch users");
  return await response.json();
};

export const addUser = async (newUser: Users): Promise<Users> => {
  const response = await fetch(`${API_URL}/AddUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  if (!response.ok) throw new Error("Failed to add user");
  return await response.json();
};

export const deleteUser = async (userId: number): Promise<void> => {
  const response = await fetch(`${API_URL}/DeleteUser/${userId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete user");
};

export function useRecommendations() {
  const userId = 0; // or get it from context or props
  const [recommendations, setRecommendations] = useState<
    Recommendation[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(
          `${API_URL}/GetOneHomeRecommendation?userId=${userId}`
        );
        if (!res.ok) throw new Error("Failed to fetch recommendations");

        const data = await res.json();
        setRecommendations(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return { recommendations, loading, error };
}
