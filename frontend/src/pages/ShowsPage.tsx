import React from "react";
import styles from "./ShowsPage.module.css";
import { Play } from "lucide-react";
import Header from "../components/TopNavBar";
import Footer from "../components/Footer";
import ShowCategorySection from "../components/showsPage/ShowCategorySection";

const ShowsPage: React.FC = () => {
  // Sample data for shows
  const recommendedShows = [
    {
      id: 1,
      title: "Breaking Bad",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/13",
      duration: "8h 20min",
      seasons: "4 Season",
    },
    {
      id: 2,
      title: "Stranger Things",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/22",
      duration: "12h 23min",
      seasons: "5 Season",
    },
    {
      id: 3,
      title: "The Crown",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/31",
      duration: "14h 30min",
      seasons: "3 Season",
    },
    {
      id: 4,
      title: "Mindhunter",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/100",
      duration: "7h 40min",
      seasons: "2 Season",
    },
    {
      id: 5,
      title: "Dark",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/103",
      duration: "7h 40min",
      seasons: "2 Season",
    },
    {
      id: 6,
      title: "Ozark",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/110",
      duration: "7h 40min",
      seasons: "2 Season",
    },
  ];

  const parksAndRecShows = [
    {
      id: 7,
      title: "The Good Place",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/111",
      duration: "12h 23min",
      seasons: "5 Season",
    },
    {
      id: 8,
      title: "Brooklyn Nine-Nine",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/112",
      duration: "7h 40min",
      seasons: "2 Season",
    },
    {
      id: 9,
      title: "Community",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/113",
      duration: "8h 20min",
      seasons: "4 Season",
    },
    {
      id: 10,
      title: "Schitt's Creek",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/120",
      duration: "10h 30min",
      seasons: "3 Season",
    },
    {
      id: 11,
      title: "30 Rock",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/121",
      duration: "10h 30min",
      seasons: "3 Season",
    },
    {
      id: 12,
      title: "Arrested Development",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/122",
      duration: "10h 30min",
      seasons: "3 Season",
    },
  ];

  const newReleases = [
    {
      id: 13,
      title: "The Last of Us",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/123",
      duration: "12h 23min",
      seasons: "5 Season",
    },
    {
      id: 14,
      title: "House of the Dragon",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/130",
      duration: "7h 40min",
      seasons: "2 Season",
    },
    {
      id: 15,
      title: "Severance",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/131",
      duration: "8h 20min",
      seasons: "4 Season",
    },
    {
      id: 16,
      title: "The Bear",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/132",
      duration: "10h 30min",
      seasons: "3 Season",
    },
    {
      id: 17,
      title: "Andor",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/133",
      duration: "10h 30min",
      seasons: "3 Season",
    },
    {
      id: 18,
      title: "Wednesday",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/200",
      duration: "10h 30min",
      seasons: "3 Season",
    },
  ];

  const actionShows = [
    {
      id: 19,
      title: "The Boys",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/201",
      duration: "12h 23min",
      seasons: "5 Season",
    },
    {
      id: 20,
      title: "Reacher",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/202",
      duration: "7h 40min",
      seasons: "2 Season",
    },
    {
      id: 21,
      title: "Peaky Blinders",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/203",
      duration: "8h 20min",
      seasons: "4 Season",
    },
    {
      id: 22,
      title: "Daredevil",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/210",
      duration: "10h 30min",
      seasons: "3 Season",
    },
    {
      id: 23,
      title: "The Punisher",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/211",
      duration: "10h 30min",
      seasons: "3 Season",
    },
  ];

  const adventureShows = [
    {
      id: 24,
      title: "The Witcher",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/212",
      duration: "12h 23min",
      seasons: "5 Season",
    },
    {
      id: 25,
      title: "The Mandalorian",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/213",
      duration: "7h 40min",
      seasons: "2 Season",
    },
    {
      id: 26,
      title: "Stranger Things",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/220",
      duration: "8h 20min",
      seasons: "4 Season",
    },
    {
      id: 27,
      title: "Lost",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/221",
      duration: "10h 30min",
      seasons: "3 Season",
    },
    {
      id: 28,
      title: "Game of Thrones",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/222",
      duration: "10h 30min",
      seasons: "3 Season",
    },
    {
      id: 29,
      title: "The Expanse",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/223",
      duration: "10h 30min",
      seasons: "3 Season",
    },
  ];

  const comedyShows = [
    {
      id: 30,
      title: "The Office",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/230",
      duration: "12h 23min",
      seasons: "5 Season",
    },
    {
      id: 31,
      title: "Parks and Recreation",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/231",
      duration: "7h 40min",
      seasons: "2 Season",
    },
    {
      id: 32,
      title: "Brooklyn Nine-Nine",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/232",
      duration: "8h 20min",
      seasons: "4 Season",
    },
    {
      id: 33,
      title: "Friends",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/233",
      duration: "10h 30min",
      seasons: "3 Season",
    },
    {
      id: 34,
      title: "How I Met Your Mother",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/133",
      duration: "10h 30min",
      seasons: "3 Season",
    },
    {
      id: 35,
      title: "The Good Place",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/200",
      duration: "10h 30min",
      seasons: "3 Season",
    },
  ];

  const horrorShows = [
    {
      id: 36,
      title: "The Haunting of Hill House",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/300",
      duration: "12h 23min",
      seasons: "5 Season",
    },
    {
      id: 37,
      title: "American Horror Story",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/301",
      duration: "7h 40min",
      seasons: "2 Season",
    },
    {
      id: 38,
      title: "The Walking Dead",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/302",
      duration: "8h 20min",
      seasons: "4 Season",
    },
    {
      id: 39,
      title: "Stranger Things",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/303",
      duration: "10h 30min",
      seasons: "3 Season",
    },
    {
      id: 40,
      title: "Midnight Mass",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/310",
      duration: "10h 30min",
      seasons: "3 Season",
    },
    {
      id: 41,
      title: "Hannibal",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/311",
      duration: "10h 30min",
      seasons: "3 Season",
    },
  ];

  const mustWatchShows = [
    {
      id: 42,
      title: "Breaking Bad",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/312",
      duration: "7h 40min",
      rating: 4,
    },
    {
      id: 43,
      title: "Game of Thrones",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/322",
      duration: "12h 23min",
      rating: 5,
    },
    {
      id: 44,
      title: "The Wire",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/331",
      duration: "10h 30min",
      rating: 4,
    },
    {
      id: 45,
      title: "The Sopranos",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1001",
      duration: "8h 20min",
      rating: 4,
    },
    {
      id: 46,
      title: "Mad Men",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1011",
      duration: "8h 20min",
      rating: 5,
    },
    {
      id: 47,
      title: "Chernobyl",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1012",
      duration: "8h 20min",
      rating: 5,
    },
  ];

  return (
    <div className={styles.showsPage}>
      <Header
        selectedType={"Movie"}
        onTypeChange={function (_type: "Movie" | "TV Show"): void {
          throw new Error("Function not implemented.");
        }}
      />

      <div className={styles.contentContainer}>
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <button className={styles.tabButton}>Movies</button>
            <button className={`${styles.tabButton} ${styles.activeTab}`}>
              Shows
            </button>
          </div>
        </div>

        <div className={styles.heroSection}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3"
            alt="The Office"
            className={styles.heroImage}
          />
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>The Office</h1>
            <p className={styles.heroDescription}>
              In the heart of Scranton, Pennsylvania, the employees of a modest
              paper company find themselves entangled in the chaos of everyday
              absurdity. Led by a relentlessly awkward regional manager, they
              must navigate petty rivalries, painfully awkward meetings, and the
              occasional office romance. As tension builds and the copier breaks
              down for the third time this week, one thing becomes clear —
              surviving 9 to 5 here requires more than just staplers and
              spreadsheets.
              <br />
              Paper. Power. Shenanigans. Welcome to The Office.
            </p>
            <button className={styles.playButton}>
              <Play size={24} />
              <span>Play Now</span>
            </button>
          </div>
        </div>

        <div className={styles.categoriesContainer}>
          <ShowCategorySection
            title="Recommended For You"
            shows={recommendedShows}
            type="duration"
          />

          <ShowCategorySection
            title="Because You Watched Parks & Rec"
            shows={parksAndRecShows}
            type="duration"
          />

          <ShowCategorySection
            title="New Releases"
            shows={newReleases}
            type="duration"
          />

          <ShowCategorySection
            title="Action"
            shows={actionShows}
            type="duration"
          />

          <ShowCategorySection
            title="Adventure"
            shows={adventureShows}
            type="duration"
          />

          <ShowCategorySection
            title="Comedy"
            shows={comedyShows}
            type="duration"
          />

          <ShowCategorySection
            title="Horror"
            shows={horrorShows}
            type="duration"
          />

          <ShowCategorySection
            title="Must - Watch Shows"
            shows={mustWatchShows}
            type="rating"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShowsPage;
