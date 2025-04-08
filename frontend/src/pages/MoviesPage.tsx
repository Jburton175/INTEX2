// import React from "react";
// import styles from "./MoviesPage.module.css";
// import MovieCategorySection from "../components/moviesPage/MovieCategorySection";
// import { Clock } from "lucide-react";
// import TopNavBar from "../components/TopNavBar";

// // Utility to encode title into blob-safe URL
// const generateImageURL = (title: string) =>
//   `https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent(title)}.jpg`;

// const MoviesPage: React.FC = () => {
//   const recommendedMovies = [
//     { id: 1, title: "John Dick Is Dead", duration: "1h 30min", rating: 4.5 },
//     { id: 2, title: "Ganglands", duration: "1h 57min", rating: 4.8 },
//     { id: 3, title: "The Starling", duration: "2h 10min", rating: 4.7 },
//     { id: 4, title: "Birth of the Dragon", duration: "2h 20min", rating: 4.9 },
//     { id: 5, title: "Metal Shop Masters", duration: "1h 42min", rating: 4.6 },
//     { id: 6, title: "Walking Out", duration: "1h 42min", rating: 4.8 },
//     { id: 7, title: "Here and There", duration: "1h 42min", rating: 4.7 },
//   ].map(movie => ({
//     ...movie,
//     image: generateImageURL(movie.title)
//   }));



// const starWarsRelated = [
//   {
//     id: 1,
//     title: "Chicken Little",
//     duration: "1h 30min",
//     rating: 4.5,
//   },
//   {
//     id: 2,
//     title: "The Girl from the Song",
//     duration: "1h 57min",
//     rating: 4.8,
//   },
//   {
//     id: 3,
//     title: "In the Cut",
//     duration: "2h 10min",
//     rating: 4.7,
//   },
//   {
//     id: 4,
//     title: "Crocodile Dundee in Los Angeles",
//     duration: "2h 20min",
//     rating: 4.6,
//   },
//   {
//     id: 5,
//     title: "Freedom Writers",
//     duration: "1h 42min",
//     rating: 4.5,
//   },
// ].map(movie => ({
//   ...movie,
//   image: generateImageURL(movie.title)
// }));

// const newReleases = [
//   {
//     id: 1,
//     title: "Hotel Del Luna",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 2,
//     title: "Blade Runner: The Final Cut",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 3,
//     title: "Freedom Writers",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 4,
//     title: "House Party",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 5,
//     title: "Kid-E-Cats",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 6,
//     title: "Labyrinth",
//     releaseDate: "11 April 2023",
//   },
//   {
//     id: 7,
//     title: "School of Rock",
//     releaseDate: "19 April 2023",
//   },
// ].map(movie => ({
//   ...movie,
//   image: generateImageURL(movie.title)
// }));


// const actionMovies = [
//   {
//     id: 1,
//     title: "Thimmarusu",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 2,
//     title: "Wind River",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 3,
//     title: "Deadly Sins",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 4,
//     title: "Mission Istaanbul: Darr Ke Aagey Jeet Hai",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 5,
//     title: "SAS: Rise of the Black Swan",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 6,
//     title: "Shootout at Lokhandwala",
//     releaseDate: "11 April 2023",
//   },
//   {
//     id: 7,
//     title: "The November Man",
//     releaseDate: "19 April 2023",
//   },
// ].map(movie => ({
//   ...movie,
//   image: generateImageURL(movie.title)
// }));


// const adventureMovies = [
//   {
//     id: 1,
//     title: "Black Island",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 2,
//     title: "Nneka The Pretty Serpent",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 3,
//     title: "Pahuna",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 4,
//     title: "Walk of Shame",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 5,
//     title: "Monster Hunter: Legends of the Guild",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 6,
//     title: "The Crowned Clown",
//     releaseDate: "11 April 2023",
//   },
//   {
//     id: 7,
//     title: "SHAMAN KING",
//     releaseDate: "19 April 2023",
//   },
// ].map(movie => ({
//   ...movie,
//   image: generateImageURL(movie.title)
// }));


// const comedyMovies = [
//   {
//     id: 1,
//     title: "Cloudy with a Chance of Meatballs",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 2,
//     title: "Ferris Bueller's Day Off",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 3,
//     title: "Good Luck Chuck",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 4,
//     title: "Major Payne",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 5,
//     title: "Pineapple Express",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 6,
//     title: "Team America: World Police",
//     releaseDate: "11 April 2023",
//   },
//   {
//     id: 7,
//     title: "Open Season: Scared Silly",
//     releaseDate: "19 April 2023",
//   },
// ].map(movie => ({
//   ...movie,
//   image: generateImageURL(movie.title)
// }));

// const dramaMovies = [
//   {
//     id: 1,
//     title: "The Last Letter From Your Lover",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 2,
//     title: "Resort to Love",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 3,
//     title: "Feels Like Ishq",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 4,
//     title: "The Walking Dead",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 5,
//     title: "Mimi",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 6,
//     title: "Django Unchained",
//     releaseDate: "11 April 2023",
//   },
//   {
//     id: 7,
//     title: "The Book of Henry",
//     releaseDate: "19 April 2023",
//   },
// ].map(movie => ({
//   ...movie,
//   image: generateImageURL(movie.title),
// }));


// const horrorMovies = [
//   {
//     id: 1,
//     title: "A Classic Horror Story",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 2,
//     title: "Fear Street Part 2: 1978",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 3,
//     title: "Gunpowder Milkshake",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 4,
//     title: "Elize Matsunaga: Once Upon a Crime",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 5,
//     title: "Midnight Sun",
//     releaseDate: "April 2023",
//   },
//   {
//     id: 6,
//     title: "RESIDENT EVIL: Infinite Darkness",
//     releaseDate: "11 April 2023",
//   },
//   {
//     id: 7,
//     title: "I AM A KILLER",
//     releaseDate: "19 April 2023",
//   },
// ].map(movie => ({
//   ...movie,
//   image: generateImageURL(movie.title),
// }));


// const mustWatchMovies = [
//   {
//     id: 1,
//     title: "Memoirs of a Geisha",
//     duration: "2h 25min",
//     rating: 4.9,
//   },
//   {
//     id: 2,
//     title: "The Karate Kid",
//     duration: "1h 45min",
//     rating: 4.8,
//   },
//   {
//     id: 3,
//     title: "The Queen",
//     duration: "1h 43min",
//     rating: 4.7,
//   },
//   {
//     id: 4,
//     title: "What Dreams May Come",
//     duration: "2h 0min",
//     rating: 4.6,
//   },
// ].map(movie => ({
//   ...movie,
//   image: generateImageURL(movie.title),
// }));

  

//   return (
//     <div className={styles.moviesPage}>
//       <TopNavBar />
  
//       {/* Main Content */}
//       <div className={styles.mainContent}>
//         {/* Hero Section */}
//         <div className={styles.heroSection}>
//           <img
//             src={`https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent("The Interview")}.jpg`}
//             alt="Featured Movie"
//             className={styles.heroImage}
//           />
//           <div className={styles.heroContent}></div>
//         </div>
  
//         {/* Tab Navigation */}
//         <div className={styles.tabContainer}>
//           <div className={styles.tabButtons}>
//             <button className={styles.tabButtonActive}>Movies</button>
//             <button className={styles.tabButton}>Shows</button>
//           </div>
  
//           {/* Movie Categories */}
//           <div className={styles.categoriesContainer}>
//             <MovieCategorySection title="Recommended For You" movies={recommendedMovies} type="duration" />
//             <MovieCategorySection title="Because You Watched Star Wars: Revenge of the Sith" movies={starWarsRelated} type="duration" />
//             <MovieCategorySection title="New Releases" movies={newReleases} type="release" />
//             <MovieCategorySection title="Action" movies={actionMovies} type="release" />
//             <MovieCategorySection title="Adventure" movies={adventureMovies} type="release" />
//             <MovieCategorySection title="Comedy" movies={comedyMovies} type="release" />
//             <MovieCategorySection title="Drama" movies={dramaMovies} type="release" />
//             <MovieCategorySection title="Horror" movies={horrorMovies} type="release" />
  
//             {/* Must Watch Movies */}
//             <div className={styles.categorySection}>
//               <div className={styles.categoryHeader}>
//                 <h2 className={styles.categoryTitle}>Must - Watch Movies</h2>
//               </div>
//               <div className={styles.mustWatchGrid}>
//                 {mustWatchMovies.map((movie) => (
//                   <div key={movie.id} className={styles.mustWatchCard}>
//                     <img
//                       src={`https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent(movie.title)}.jpg`}
//                       alt={movie.title}
//                       className={styles.mustWatchImage}
//                     />
//                     <div className={styles.mustWatchDetails}>
//                       <div className={styles.durationBadge}>
//                         <Clock size={20} className={styles.clockIcon} />
//                         <span>{movie.duration}</span>
//                       </div>
//                       <div className={styles.ratingBadge}>
//                         <div className={styles.starRating}>
//                           {[...Array(5)].map((_, i) => (
//                             <img
//                               key={i}
//                               src={
//                                 i < Math.floor(movie.rating)
//                                   ? "https://cdn.builder.io/api/v1/image/assets/TEMP/a87d05c6f465996e2e45e3cae25a746e0c10574e"
//                                   : "https://cdn.builder.io/api/v1/image/assets/TEMP/925fae185bd3c66b21f3bd0c8f0bb3fa49efdaa9"
//                               }
//                               alt="Star"
//                               className={styles.starIcon}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
  
//       {/* Footer */}
//       <footer className={styles.footer}>
//         <div className={styles.footerContainer}>
//           <div className={styles.footerDivider} />
//           <div className={styles.footerContent}>
//             <div className={styles.footerCopyright}>
//               @2023 streamvib, All Rights Reserved
//             </div>
//             <div className={styles.footerLinks}>
//               <div className={styles.footerDividerVertical} />
//               <div className={styles.footerLink}>Privacy Policy</div>
//               <div className={styles.footerDividerVertical} />
//               <div className={styles.footerLink}>Cookie Policy</div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
  



// };


// export default MoviesPage;


import React, { useEffect, useState } from "react";
import styles from "./MoviesPage.module.css";
import TopNavBar from "../components/TopNavBar";
import MovieCategorySection from "../components/moviesPage/MovieCategorySection";
import { Clock } from "lucide-react";

interface Movie {
  id: number;
  show_id: string;
  title: string;
  duration: string;
  rating: number;
  image: string;
  releaseDate?: string;
}

const MoviesPage: React.FC = () => {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [movieBatch, setMovieBatch] = useState(0); // Controls how many batches we've added

  const [starWarsRelated, setStarWarsRelated] = useState<Movie[]>([]);
  const [newReleases, setNewReleases] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [adventureMovies, setAdventureMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [dramaMovies, setDramaMovies] = useState<Movie[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>([]);
  const [mustWatchMovies, setMustWatchMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const generateDummyMovies = (startId: number, count: number): Movie[] => {
      return Array.from({ length: count }, (_, i) => {
        const index = startId + i;
        return {
          id: index,
          show_id: `dummy-${index}`,
          title: `Dummy Movie ${index + 1}`,
          duration: `${Math.floor((90 + (index % 30)) / 60)}h ${(90 + (index % 30)) % 60}min`,
          rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
          image: `https://via.placeholder.com/200x300?text=Movie+${index + 1}`,
          releaseDate: `April ${2020 + (index % 5)}`
        };
      });
    };

    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 200;

      if (scrollPosition >= threshold) {
        setMovieBatch((prevBatch) => {
          const nextBatch = prevBatch + 1;
          const newMovies = generateDummyMovies(prevBatch * 7, 7);
          setRecommendedMovies((prev) => [...prev, ...newMovies]);
          return nextBatch;
        });
      }
    };

    // Load initial batch
    setRecommendedMovies(generateDummyMovies(0, 7));
    setMovieBatch(1);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.moviesPage}>
      <TopNavBar />

      <div className={styles.mainContent}>
        <div className={styles.heroSection}>
          <img
            src={`https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent("The Interview")}.jpg`}
            alt="Featured Movie"
            className={styles.heroImage}
          />
          <div className={styles.heroContent}></div>
        </div>

        <div className={styles.tabContainer}>
          <div className={styles.tabButtons}>
            <button className={styles.tabButtonActive}>Movies</button>
            <button className={styles.tabButton}>Shows</button>
          </div>

          <div className={styles.categoriesContainer}>
            <MovieCategorySection
              title="Recommended For You"
              movies={recommendedMovies}
              type="duration"
            />
            <MovieCategorySection
              title="Because You Watched Star Wars: Revenge of the Sith"
              movies={starWarsRelated}
              type="duration"
            />
            <MovieCategorySection
              title="New Releases"
              movies={newReleases}
              type="release"
            />
            <MovieCategorySection
              title="Action"
              movies={actionMovies}
              type="release"
            />
            <MovieCategorySection
              title="Adventure"
              movies={adventureMovies}
              type="release"
            />
            <MovieCategorySection
              title="Comedy"
              movies={comedyMovies}
              type="release"
            />
            <MovieCategorySection
              title="Drama"
              movies={dramaMovies}
              type="release"
            />
            <MovieCategorySection
              title="Horror"
              movies={horrorMovies}
              type="release"
            />

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
                                  ? "https://cdn.builder.io/api/v1/image/assets/TEMP/a87d05c6f465996e2e45e3cae25a746e0c10574e"
                                  : "https://cdn.builder.io/api/v1/image/assets/TEMP/925fae185bd3c66b21f3bd0c8f0bb3fa49efdaa9"
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
