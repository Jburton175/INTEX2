import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminPage.module.css";
import Header from "../components/homePage/Header";
import Footer from "../components/homePage/Footer";
import ResultsPerPageSelector from "../components/admin/ResultsPerPageSelector";
import { Movies } from "../types/Movies";
import { fetchMovies } from "../api/API";

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const [Movies, setMovies] = useState<Movies[]>([]);
  const [movieLoading, setMovieLoading] = useState(true);
  const [movieError, setMovieError] = useState<string | null>(null);
  const [MoviePageSize, setMoviePageSize] = useState<number>(9);
  const [MoviePageNum, setMoviePageNum] = useState<number>(1);
  const [totalMovies, setTotalMovies] = useState<number>(0);
  const [totalMoviePages, setTotalMoviePages] = useState<number>(0);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies(
          MoviePageSize,
          MoviePageNum,
          [] // no categories added on this page
        );
        setMovies(data.movies);
        setTotalMovies(data.totalNumMovies);
        setTotalMoviePages(Math.ceil(totalMovies / MoviePageSize));
      } catch (err) {
        setMovieError((err as Error).message);
      } finally {
        setMovieLoading(false);
      }
    };

    loadMovies();
  }, [MoviePageSize, MoviePageNum, totalMovies]);

  if (movieLoading) return <p>Loading...</p>;
  if (movieError) return <p className="text-red-500">Error: {movieError}</p>;

  return (
    <div className={styles.adminPage}>
      <Header />

      <main className={styles.adminContent}>
        <div className={styles.adminHeader}>
          <h1 className={styles.adminTitle}>Admin Dashboard</h1>
        </div>

        <div className={styles.adminTabs}>
          <button
            className={`${styles.tabButton} ${activeTab === "dashboard" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "users" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "content" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("content")}
          >
            Content
          </button>
        </div>

        <div className={styles.adminPanel}>
          {activeTab === "dashboard" && (
            <div className={styles.dashboardPanel}>
              <div className={styles.statsGrid} style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={styles.statCard}>
                  <h3 className={styles.statTitle}>Total Users</h3>
                  <p className={styles.statValue}>12,345</p>
                </div>
                <div className={styles.statCard}>
                  <h3 className={styles.statTitle}>Total Movies</h3>
                  <p className={styles.statValue}>2,567</p>
                </div>
                <div className={styles.statCard}>
                  <h3 className={styles.statTitle}>Total Shows</h3>
                  <p className={styles.statValue}>894</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className={styles.usersPanel}>
              <div className={styles.panelHeader}>
                <h2 className={styles.panelTitle}>User Management</h2>
                <div className={styles.panelControls}>
                  <div className={styles.searchBox}>
                    <input
                      type="text"
                      placeholder="Search users..."
                      className={styles.searchInput}
                    />
                  </div>
                  <div className={styles.resultsPerPageContainer}>
                    <span className={styles.resultsLabel}>
                      Results per page:
                    </span>
                    <ResultsPerPageSelector />
                  </div>
                </div>
              </div>

              <div className={styles.userTable}>
                <div className={styles.tableHeader}>
                  <div className={styles.tableCell}>ID</div>
                  <div className={styles.tableCell}>Name</div>
                  <div className={styles.tableCell}>Email</div>
                  <div className={styles.tableCell}>Subscription</div>
                  <div className={styles.tableCell}>Actions</div>
                </div>

                {[1, 2, 3, 4, 5].map((user) => (
                  <div key={user} className={styles.tableRow}>
                    <div className={styles.tableCell}>#{user}001</div>
                    <div className={styles.tableCell}>User Name {user}</div>
                    <div className={styles.tableCell}>
                      user{user}@example.com
                    </div>
                    <div className={styles.tableCell}>Premium</div>
                    <div className={styles.tableCell}>
                      <button className={styles.actionButton}>Edit</button>
                      <button className={styles.actionButton}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.pagination}>
                <button className={styles.paginationButton}>Previous</button>
                <div className={styles.pageNumbers}>
                  <button
                    className={`${styles.pageNumber} ${styles.activePage}`}
                  >
                    1
                  </button>
                  <button className={styles.pageNumber}>2</button>
                  <button className={styles.pageNumber}>3</button>
                </div>
                <button className={styles.paginationButton}>Next</button>
              </div>
            </div>
          )}

          {activeTab === "content" && (
            <div className={styles.contentPanel}>
              <div className={styles.panelHeader}>
                <h2 className={styles.panelTitle}>Content Management</h2>
                <div className={styles.panelControls}>
                  <div className={styles.searchBox}>
                    <input
                      type="text"
                      placeholder="Search content..."
                      className={styles.searchInput}
                    />
                  </div>
                  <button className={styles.addButton}>Add New Content</button>
                </div>
              </div>

              <div className={styles.contentGrid}>
                {Movies.map((m) => (
                  <div key={m.show_id} className={styles.contentCard}>
                    <div className={styles.contentImageContainer}>
                      <div
                        className={styles.contentImage}
                        style={{
                          backgroundImage: `url(https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent(m.title || "default-title")}.jpg)`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                    </div>
                    <div className={styles.contentInfo}>
                      <h3 className={styles.contentTitle}>{m.title}</h3>
                      <p className={styles.contentType}>{m.type}</p>
                      <div className={styles.contentActions}>
                        <button
                          className={styles.contentActionButton}
                          onClick={() => navigate(`/update-movie/${m.show_id}`)}
                        >
                          Edit
                        </button>
                        <button className={styles.contentActionButton}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.pagination}>
                <button className={styles.paginationButton}>Previous</button>
                <div className={styles.pageNumbers}>
                  <button
                    className={`${styles.pageNumber} ${styles.activePage}`}
                  >
                    1
                  </button>
                  <button className={styles.pageNumber}>2</button>
                  <button className={styles.pageNumber}>3</button>
                </div>
                <button className={styles.paginationButton}>Next</button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPage;
