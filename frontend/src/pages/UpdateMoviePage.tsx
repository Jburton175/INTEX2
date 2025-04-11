import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UpdateMoviePage.module.css";
import Header from "../components/TopNavBar";
import Footer from "../components/Footer";
import { ArrowLeft } from "lucide-react";
import { fetchOneMovie, UpdateMovie } from "../api/API";
import { Movies } from "../types/Movies";
import AuthorizeView from "../components/AuthorizeView";

const UpdateMoviePage: React.FC = () => {
  const navigate = useNavigate();
  const { show_id } = useParams();
  const [movieData, setMovieData] = useState<Movies | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    if (!show_id) return;

    const fetchMovie = async () => {
      try {
        const movie = await fetchOneMovie(show_id);
        console.log("✅ Movie loaded:", movie);
        setMovieData(movie);
      } catch (err) {
        console.error("❌ Failed to load movie:", err);
        setErrorMsg("Failed to fetch movie. Redirecting...");
        setTimeout(() => navigate("/admin"), 2500);
      }
    };

    fetchMovie();
  }, [show_id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMovieData((
