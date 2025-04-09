const API_URL = "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX";
// "https://localhost:5000/INTEX";
export const fetchMovies = async (pageSize, pageNum, selectedCategories) => {
    try {
        const categoryParams = selectedCategories
            .map((cat) => `movieTypes=${encodeURIComponent(cat)}`)
            .join("&");
        const response = await fetch(`${API_URL}/GetAllMovies?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ""}`);
        if (!response.ok) {
            throw new Error("Failed to fetch movies");
        }
        return await response.json();
    }
    catch (error) {
        console.error("Error fetching movies: ", error);
        throw error;
    }
};
export const fetchOneMovie = async (id) => {
    try {
        const response = await fetch(`${API_URL}/GetOneMovie?show_id=${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch movie");
        }
        return await response.json();
    }
    catch (error) {
        console.error("Error fetching movie: ", error);
        throw error;
    }
};
export const addMovie = async (newMovie) => {
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
    }
    catch (error) {
        console.error("Error adding movie", error);
        throw error;
    }
};
export const UpdateMovie = async (movieId, updatedMovie) => {
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
    }
    catch (error) {
        console.error("Error updating movie:", error);
        throw error;
    }
};
export const deleteMovie = async (movieId) => {
    try {
        const response = await fetch(`${API_URL}/DeleteMovie/${movieId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete movie");
        }
    }
    catch (error) {
        console.error("Error deleting movie:", error);
        throw error;
    }
};
export const fetchUsers = async () => {
    const response = await fetch(`${API_URL}/GetAllUsers`);
    if (!response.ok)
        throw new Error("Failed to fetch users");
    return await response.json();
};
export const addUser = async (newUser) => {
    const response = await fetch(`${API_URL}/AddUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
    });
    if (!response.ok)
        throw new Error("Failed to add user");
    return await response.json();
};
export const deleteUser = async (userId) => {
    const response = await fetch(`${API_URL}/DeleteUser/${userId}`, {
        method: "DELETE",
    });
    if (!response.ok)
        throw new Error("Failed to delete user");
};
