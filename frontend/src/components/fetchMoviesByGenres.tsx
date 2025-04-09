interface MovieFromApi {
  show_id: string;
  title: string;
  release_year: number;
  rating: string;
  description: string;
  director: string;
  cast: string;
  duration: string;
}

// Make sure the function explicitly returns the shape { [genre: string]: MovieFromApi[] }
async function fetchMoviesByGenres(): Promise<Record<string, MovieFromApi[]>> {
  const baseUrl =
    "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX";

  try {
    const res = await fetch(`${baseUrl}/GetGenres`);
    if (!res.ok) {
      throw new Error("Failed to fetch genres list");
    }

    const genres: string[] = await res.json();
    const allGenreMovies: Record<string, MovieFromApi[]> = {};

    for (const genre of genres) {
      const routeUrl = `${baseUrl}/Get${genre}Movies`;
      try {
        const resMovies = await fetch(routeUrl);
        if (!resMovies.ok) {
          console.error(`Failed to fetch movies for genre: ${genre}`);
          continue;
        }

        const data = await resMovies.json();
        const genreMovies: MovieFromApi[] = data.movies ?? [];

        allGenreMovies[genre] = genreMovies;
      } catch (err) {
        console.error(`Error fetching ${genre} movies:`, err);
      }
    }

    return allGenreMovies; // typed as Record<string, MovieFromApi[]>
  } catch (error) {
    console.error("Failed to fetch or process genres:", error);
    // Return an empty record on error
    return {};
  }
}

export default fetchMoviesByGenres;
