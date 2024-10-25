import React, { useEffect, useState } from "react";
import axios from "axios";
import { Snackbar, Modal, TextField, Button } from "@mui/material";

// Define Movie type
interface Movie {
  title: string;
  year: number;
  genre: string;
  image: string;
}

function MovieTable() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to check if editing or adding
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/movies?page=${page}`);
        setMovies((prevMovies) => [
          ...prevMovies,
          ...(res.data.data as Movie[]),
        ]);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
      setLoading(false);
    };

    fetchMovies();
  }, [page]);
  


  // Define the deleteMovie function
  const deleteMovie = async (title: string) => {
    try {
      await axios.delete(`/api/movies/${title}`);
      // After deleting, update the movies list by filtering out the deleted movie
      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.title !== title)
      );
      // Set success message and show Snackbar
      setSuccessMessage("Movie deleted successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!selectedMovie?.title) newErrors.title = "Title is required";
    if (!selectedMovie?.year) newErrors.year = "Year is required";
    if (!selectedMovie?.genre) newErrors.genre = "Genre is required";
    if (!selectedMovie?.image) newErrors.image = "Image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Open modal for adding a new movie
  const addMovie = () => {
    setSelectedMovie({ title: "", year: 0, genre: "", image: "" });
    // setSelectedMovie(null); // Clear the selected movie for adding a new one
    setIsEditing(false); // Set to adding mode
    setErrors({});
    setOpen(true); // Open the modal
  };

  // Open modal with movie details to edit
  const editMovie = (movie: Movie) => {
    setSelectedMovie(movie); // Set the selected movie in state
    setIsEditing(true); // Set to editing mode
    setErrors({});
    setOpen(true); // Open the modal
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Close the snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Handle save (both add and edit)
  const handleSave = async () => {
    if (selectedMovie && validateForm()) {
      if (isEditing) {
        // Edit movie (PUT request)
        try {
          await axios.put(`/api/movies/${selectedMovie.title}`, selectedMovie);
          setMovies((prevMovies) =>
            prevMovies.map((movie) =>
              movie.title === selectedMovie.title ? selectedMovie : movie
            )
          );
        } catch (error) {
          console.error("Error updating movie:", error);
        }
      } else {
        try {
          const res = await axios.post("/api/movies", selectedMovie);
          setMovies((prevMovies) => [...prevMovies, res.data]); // Add the new movie to the list
        } catch (error) {
          console.error("Error adding movie:", error);
        }
      }
    }
    setOpen(false); // Close the modal
  };

  // Handle changes to the movie fields in the modal
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedMovie) {
      setSelectedMovie({
        ...selectedMovie,
        [e.target.name]: e.target.value,
      });
    }
  };
  useEffect(() => {
		const fetchMovies = async () => {
			setLoading(true);
			try {
				const res = await axios.get(`/api/movies?page=${page}`);
				setMovies((prevMovies) => [
					...prevMovies,
					...(res.data.data as Movie[]),
				]);
				console.log("-- xyz movies --> ", movies);
			} catch (error) {
				console.error("Error fetching movies:", error);
			}
			setLoading(false);
		};

		fetchMovies();
	}, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={addMovie}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add New Movie
        </button>
      </div>

      <table className="min-w-full bg-zinc-100 border border-gray-200 rounded-lg">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-gray-700 font-semibold tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-gray-700 font-semibold tracking-wider">
              Year
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-gray-700 font-semibold tracking-wider">
              Genre
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-gray-700 font-semibold tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-gray-700 font-semibold tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.title}>
              <td className="px-6 py-4 border-b border-gray-200">
                {movie.title}
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                {movie.year}
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                {movie.genre}
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                <img src={movie.image} alt={movie.title} width="50" />
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                <button
                  onClick={() => editMovie(movie)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMovie(movie.title)}
                  className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding/editing a movie */}
      {open && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              {isEditing ? "Edit Movie" : "Add New Movie"}
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={selectedMovie?.title || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Year</label>
              <input
                type="number"
                name="year"
                value={selectedMovie?.year || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
              {errors.year && (
                <p className="text-red-500 text-sm">{errors.year}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Genre</label>
              <input
                type="text"
                name="genre"
                value={selectedMovie?.genre || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
              {errors.genre && (
                <p className="text-red-500 text-sm">{errors.genre}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Image URL</label>
              <input
                type="text"
                name="image"
                value={selectedMovie?.image || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image}</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600"
              >
                {isEditing ? "Save Changes" : "Add Movie"}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={successMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
}

export default MovieTable;
