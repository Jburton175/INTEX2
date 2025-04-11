import { addMovies } from "../types/addMovies";
import { Movies } from "../types/Movies";
import { Users } from "../types/Users";
import { Recommendation } from "../types/recommendation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/AuthorizeView";

interface FetchMoviesResponse {
  movies: Movies[];
  totalNumMovies: number;
}

interface FetchSingleMovieResponse {
  movie: Movies | null;
}

const API_URL =
  "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX";

// "https://localhost:5000/INTEX";

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

export const fetchOneMovie = async (
  id: string
): Promise<FetchSingleMovieResponse> => {
  try {
    const response = await fetch(`${API_URL}/GetOneMovie?show_id=${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch movie");
    }
    return await response.json();
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
  const user = useContext(UserContext);
  const [recommendations, setRecommendations] = useState<
    Recommendation[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);

        // First try with user's email
        const res = await fetch(
          `${API_URL}/GetUserRecommendations?email=${encodeURIComponent(user.email)}`
        );

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.error("Primary fetch error:", errorData);

          // Fallback to default user's recommendations
          const fallbackRes = await fetch(
            `${API_URL}/GetUserRecommendations?email=${encodeURIComponent("callahanmichael@gmail.com")}`
          );

          if (!fallbackRes.ok) {
            const fallbackError = await fallbackRes.json().catch(() => ({}));
            throw new Error(
              `Failed to fetch recommendations (user: ${res.status}) ` +
                `and fallback (fallback: ${fallbackRes.status}). ` +
                `${errorData.message || ""} ${fallbackError.message || ""}`
            );
          }

          const fallbackData = await fallbackRes.json();
          setRecommendations(fallbackData);
        } else {
          const data = await res.json();
          setRecommendations(data.length ? data : await fetchFallback());
        }
      } catch (err: any) {
        setError(err.message);
        console.error("Fetch recommendations error:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchFallback = async () => {
      try {
        const fallbackRes = await fetch(
          `${API_URL}/GetUserRecommendations?email=${encodeURIComponent("callahanmichael@gmail.com")}`
        );
        if (!fallbackRes.ok) throw new Error("Fallback data unavailable");
        return await fallbackRes.json();
      } catch (fallbackErr) {
        console.error("Fallback fetch failed:", fallbackErr);
        return []; // Return empty array instead of failing completely
      }
    };

    fetchRecommendations();
  }, [user]);

  return { recommendations, loading, error };
}
