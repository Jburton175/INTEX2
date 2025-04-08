import React from "react";
import styles from "./MoviesPage.module.css";
import MovieCategorySection from "../components/moviesPage/MovieCategorySection";
import { Clock } from "lucide-react";

const MoviesPage: React.FC = () => {
  // Movie data for different categories
  const recommendedMovies = [
    {
      id: 1,
      title: "The Dark Knight",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/575cf864783349a45a86b22ceff5e87e163f267c?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      duration: "1h 30min",
      rating: 4.5,
    },
    {
      id: 2,
      title: "Inception",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/811444322b2f80b5ffeffbad93b4a1f9e8130e64?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      duration: "1h 57min",
      rating: 4.8,
    },
    {
      id: 3,
      title: "Interstellar",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/ae78ba595969132b0760775bc5ed846f9739f930?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      duration: "2h 10min",
      rating: 4.7,
    },
    {
      id: 4,
      title: "The Shawshank Redemption",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/e7830febde0af75f7da1bf17f1d3f2f97745f360?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      duration: "2h 20min",
      rating: 4.9,
    },
    {
      id: 5,
      title: "Pulp Fiction",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/ed8532081f8c0bbb730f66321c84e6e5e492bccf?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      duration: "1h 42min",
      rating: 4.6,
    },
    {
      id: 6,
      title: "The Godfather",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/9fff5a0a1a3b29739fdf21bf64d371d75f3beee7?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      duration: "1h 42min",
      rating: 4.8,
    },
    {
      id: 7,
      title: "Fight Club",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/8559cde1d85afa8752521dd1ea31d0054ba77f05?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      duration: "1h 42min",
      rating: 4.7,
    },
  ];

  const starWarsRelated = [
    {
      id: 1,
      title: "Star Wars: A New Hope",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/575cf864783349a45a86b22ceff5e87e163f267c?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      duration: "1h 30min",
      rating: 4.5,
    },
    {
      id: 2,
      title: "Star Wars: The Empire Strikes Back",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/811444322b2f80b5ffeffbad93b4a1f9e8130e64?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      duration: "1h 57min",
      rating: 4.8,
    },
    {
      id: 3,
      title: "Star Wars: Return of the Jedi",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/ae78ba595969132b0760775bc5ed846f9739f930?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      duration: "2h 10min",
      rating: 4.7,
    },
    {
      id: 4,
      title: "Rogue One: A Star Wars Story",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/e7830febde0af75f7da1bf17f1d3f2f97745f360?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      duration: "2h 20min",
      rating: 4.6,
    },
    {
      id: 5,
      title: "Star Wars: The Force Awakens",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/ed8532081f8c0bbb730f66321c84e6e5e492bccf?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      duration: "1h 42min",
      rating: 4.5,
    },
  ];

  const newReleases = [
    {
      id: 1,
      title: "Dune",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/c4670186c6744ee314c1fd7e3d629d0b71a0f393?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 2,
      title: "The Batman",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/44614e6f212daa33fa1693cb042d7e18c50e9bed?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 3,
      title: "No Time to Die",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/06a1feff9fed4f69ac11ec894f6bd65d102d1b7a?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 4,
      title: "Top Gun: Maverick",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/1684ee66f323fa4003b71caadc04cd0e608e9046?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 5,
      title: "The Northman",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/c1b209453d8283092a011f68823359861e45074c?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 6,
      title: "Everything Everywhere All at Once",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/2007550fcd904da1b42ca3d1c70a8f4d78bd32fd?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "11 April 2023",
    },
    {
      id: 7,
      title: "The Lost City",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/8559cde1d85afa8752521dd1ea31d0054ba77f05?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "19 April 2023",
    },
  ];

  const actionMovies = [
    {
      id: 1,
      title: "John Wick 4",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/d972874c88e251284aa771d51053e0d443af9a6c?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 2,
      title: "The Gray Man",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/f088dbc3c90b77489d2d287620182032543d559a?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 3,
      title: "Mission: Impossible - Dead Reckoning",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/6c1f2d931dcbabc31f2f4c2a2c805cd08ede602b?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 4,
      title: "Fast X",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/0cfdfb9e8401d3526e6e7e0c74d201dd260810f7?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 5,
      title: "Extraction 2",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/abe80d4e92806d6e7c0f4e88e2373af52ae728da?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 6,
      title: "The Equalizer 3",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/3eea80e25068f5b85eb7e7f23bbb345e6183e573?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "11 April 2023",
    },
    {
      id: 7,
      title: "Bullet Train",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/8559cde1d85afa8752521dd1ea31d0054ba77f05?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "19 April 2023",
    },
  ];

  const adventureMovies = [
    {
      id: 1,
      title: "Indiana Jones and the Dial of Destiny",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/c69ab6a76c8f029a5a9e7b68eb1778049bcce1d5?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 2,
      title: "The Lost City",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/457ec7440140e56eb6e57f0cf8492336a85d8498?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 3,
      title: "Uncharted",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/7dc25ee3a224c6d33adf473982653ca5224ac02d?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 4,
      title: "Jungle Cruise",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/cd7da7ea45626f2d8aab044330f12fc512b0ae04?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 5,
      title: "The Adam Project",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/4f6ea56b09367b15bd7ef30bb579a463c72b7f6e?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 6,
      title: "Free Guy",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/7fd72c2f2960a8a250327f6c021933d5c5d10bb2?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "11 April 2023",
    },
    {
      id: 7,
      title: "The Green Knight",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/8559cde1d85afa8752521dd1ea31d0054ba77f05?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "19 April 2023",
    },
  ];

  const comedyMovies = [
    {
      id: 1,
      title: "Barbie",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/0afd54abd16de68f277164778427bc5b55457be8?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 2,
      title: "The Menu",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/2ab4e1ffe141b9043802fb55727247f5507a9ab9?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 3,
      title: "Ghostbusters: Afterlife",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/a5c8014b3dc9449fb3d8ff49c8a03931c763ae41?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 4,
      title: "Free Guy",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/8c7850eb546165a2a05ab2dcbf9e9db09900758f?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 5,
      title: "The Lost City",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/21a0450fcdac42adad7f2baff11f290fa41e8005?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 6,
      title: "Ticket to Paradise",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/a68beeefc789df176d22e78ec01b5cfb6377d28b?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "11 April 2023",
    },
    {
      id: 7,
      title: "Bros",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/8559cde1d85afa8752521dd1ea31d0054ba77f05?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "19 April 2023",
    },
  ];

  const dramaMovies = [
    {
      id: 1,
      title: "The Whale",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/69d0dc36915c839b71fb9102ee20a1c16c05ebbd?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 2,
      title: "The Fabelmans",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/058a81a5038c7b8a2cdb7e068861aa96a8900a00?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 3,
      title: "Tár",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/f5a7d53e339ccbc7751c3d5ecf9e367dbeb22e39?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 4,
      title: "Women Talking",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/dbd36780b8f44fca7be50033d2266f130586bd34?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 5,
      title: "Empire of Light",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/6b2665f46301b88ae6af6d49c12a5928da6496d7?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 6,
      title: "The Banshees of Inisherin",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/e8f42991fdfc2fe64006ac6affff76154a17456f?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "11 April 2023",
    },
    {
      id: 7,
      title: "Triangle of Sadness",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/8559cde1d85afa8752521dd1ea31d0054ba77f05?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "19 April 2023",
    },
  ];

  const horrorMovies = [
    {
      id: 1,
      title: "M3GAN",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/2ef8a4d507b721306b20e8066433b100cd89584b?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 2,
      title: "Scream VI",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/98b8b583ff13670102d494ba0818456ec3eb65de?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 3,
      title: "Evil Dead Rise",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/62108f78bf7db2f9986adc3a465b307f49f60b1b?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 4,
      title: "The Pope's Exorcist",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/9337657094d73da8f1f10feeeab747dba8252a7e?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 5,
      title: "Renfield",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/8bc57fc458d8ef1233e19104cae801c7e00f0523?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "April 2023",
    },
    {
      id: 6,
      title: "Knock at the Cabin",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/afe6185840fc4755dc0345bae3c542fa32609f69?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "11 April 2023",
    },
    {
      id: 7,
      title: "Talk to Me",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/8559cde1d85afa8752521dd1ea31d0054ba77f05?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      releaseDate: "19 April 2023",
    },
  ];

  const mustWatchMovies = [
    {
      id: 1,
      title: "The Shawshank Redemption",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/6f53d943a4fe76c6fabbe23c42077a334879ca3a?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      duration: "1h 57min",
      rating: 4.9,
    },
    {
      id: 2,
      title: "The Godfather",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/1da7cbcc7c9e3474ce197d2ea5770aa646a3ed2f?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      duration: "1h 30min",
      rating: 4.8,
    },
    {
      id: 3,
      title: "The Dark Knight",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/433a08d2f7630cfa55a7a7f9ace9260f19c588ee?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      duration: "1h 42min",
      rating: 4.7,
    },
    {
      id: 4,
      title: "Pulp Fiction",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/6550ee1b8eb9beb5c9ab9c340020354aa44d6862?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12",
      duration: "2h 10min",
      rating: 4.6,
    },
  ];

  return (
    <div className={styles.moviesPage}>
      {/* Navbar */}
      <div className={styles.navbarContainer}>
        <nav className={styles.navbar}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/087ff22151c087d81398bc73347feea03ef361e4?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12"
            alt="Logo"
            className={styles.logo}
          />
          <div className={styles.searchContainer}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/771f6db17b4cbd434fc3188b373ae0cba75404b9?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12"
              alt="Search"
              className={styles.searchIcon}
            />
          </div>
          <div className={styles.navButtons}>
            <div className={styles.navButton}>Home</div>
            <div className={styles.navButtonActive}>Movies & Shows</div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/bca928f4bd0f0ff28869864800db80427db942fa?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12"
            alt="Featured Movie"
            className={styles.heroImage}
          />
          <div className={styles.heroContent}>
            <div className={styles.heroButtonContainer}>
              <button className={styles.playButton}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/7e8da48e33a70b7ae644f80baaf016119a4c72f9?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12"
                  alt="Play"
                  className={styles.playIcon}
                />
                <span>Play Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={styles.tabContainer}>
          <div className={styles.tabButtons}>
            <button className={styles.tabButtonActive}>Movies</button>
            <button className={styles.tabButton}>Shows</button>
          </div>

          {/* Movie Categories */}
          <div className={styles.categoriesContainer}>
            {/* Recommended Movies */}
            <MovieCategorySection
              title="Recommended For You"
              movies={recommendedMovies}
              type="duration"
            />

            {/* Star Wars Related */}
            <MovieCategorySection
              title="Because You Watched Star Wars: Revenge of the Sith"
              movies={starWarsRelated}
              type="duration"
            />

            {/* New Releases */}
            <MovieCategorySection
              title="New Releases"
              movies={newReleases}
              type="release"
            />

            {/* Action Movies */}
            <MovieCategorySection
              title="Action"
              movies={actionMovies}
              type="release"
            />

            {/* Adventure Movies */}
            <MovieCategorySection
              title="Adventure"
              movies={adventureMovies}
              type="release"
            />

            {/* Comedy Movies */}
            <MovieCategorySection
              title="Comedy"
              movies={comedyMovies}
              type="release"
            />

            {/* Drama Movies */}
            <MovieCategorySection
              title="Drama"
              movies={dramaMovies}
              type="release"
            />

            {/* Horror Movies */}
            <MovieCategorySection
              title="Horror"
              movies={horrorMovies}
              type="release"
            />

            {/* Must Watch Movies */}
            <div className={styles.categorySection}>
              <div className={styles.categoryHeader}>
                <h2 className={styles.categoryTitle}>Must - Watch Movies</h2>
              </div>
              <div className={styles.mustWatchGrid}>
                {mustWatchMovies.map((movie) => (
                  <div key={movie.id} className={styles.mustWatchCard}>
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className={styles.mustWatchImage}
                    />
                    <div className={styles.mustWatchDetails}>
                      <div className={styles.durationBadge}>
                        <Clock size={20} className={styles.clockIcon} />
                        <span>{movie.duration}</span>
                      </div>
                      <div className={styles.ratingBadge}>
                        <div className={styles.starRating}>
                          {[...Array(5)].map((_, i) => (
                            <img
                              key={i}
                              src={
                                i < Math.floor(movie.rating)
                                  ? "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/a87d05c6f465996e2e45e3cae25a746e0c10574e?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12"
                                  : "https://cdn.builder.io/api/v1/image/assets/TEMP/https://cdn.builder.io/api/v1/image/assets/TEMP/925fae185bd3c66b21f3bd0c8f0bb3fa49efdaa9?placeholderIfAbsent=true&apiKey=3c1a9dd1d0744706893a97e73ff94c12"
                              }
                              alt="Star"
                              className={styles.starIcon}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerDivider} />
          <div className={styles.footerContent}>
            <div className={styles.footerCopyright}>
              @2023 streamvib, All Rights Reserved
            </div>
            <div className={styles.footerLinks}>
              <div className={styles.footerDividerVertical} />
              <div className={styles.footerLink}>Privacy Policy</div>
              <div className={styles.footerDividerVertical} />
              <div className={styles.footerLink}>Cookie Policy</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MoviesPage;
