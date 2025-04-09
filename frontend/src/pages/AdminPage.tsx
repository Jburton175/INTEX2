import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminPage.module.css";
import Header from "../components/homePage/Header";
import Footer from "../components/homePage/Footer";
import ResultsPerPageSelector from "../components/admin/ResultsPerPageSelector";
import { Movies } from "../types/Movies";
import { User } from "../types/Users";
import { deleteMovie, fetchMovies, fetchUsers, deleteUser } from "../api/API";
import UpdateMoviePage from "./UpdateMoviePage";

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userPageSize, setUserPageSize] = useState<number>(10);
  const [userPageNum, setUserPageNum] = useState<number>(1);
  const navigate = useNavigate();

  // Movies
  const [Movies, setMovies] = useState<Movies[]>([]);
  const [movieLoading, setMovieLoading] = useState(true);
  const [movieError, setMovieError] = useState<string | null>(null);
  const [MoviePageSize, setMoviePageSize] = useState<number>(9);
  const [MoviePageNum, setMoviePageNum] = useState<number>(1);
  const [totalMovies, setTotalMovies] = useState<number>(0);
  const [totalMoviePages, setTotalMoviePages] = useState<number>(0);
  const [editingMovies, setEditingMovies] = useState<Movies | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies(MoviePageSize, MoviePageNum, []);
        setMovies(data.movies);
        setTotalMovies(data.totalNumMovies);
        setTotalMoviePages(Math.ceil(data.totalNumMovies / MoviePageSize));
      } catch (err) {
        setMovieError((err as Error).message);
      } finally {
        setMovieLoading(false);
      }
    };
    loadMovies();
  }, [MoviePageSize, MoviePageNum]);

  useEffect(() => {
    if (activeTab === "users") {
      const loadUsers = async () => {
        try {
          const userData = await fetchUsers();
          setUsers(userData);
        } catch (err) {
          setUserError((err as Error).message);
        } finally {
          setUserLoading(false);
        }
      };
      loadUsers();
    }
  }, [activeTab]);

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.user_id !== id));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  if (movieLoading) return <p>Loading...</p>;
  if (movieError) return <p className="text-red-500">Error: {movieError}</p>;

  return (
    <div className={styles.adminPage}>
      {/* {editingMovies && (
        <UpdateMoviePage
          movie={editingMovies}
          onSuccess={() => {
            setEditingMovies(null);
            fetchMovies(MoviePageSize, MoviePageNum, []).then((data) =>
              setMovies(data.movies)
            );
          }}
          onCancel={() => setEditingMovies(null)}
        />
      )} */}

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
              <div
                className={styles.statsGrid}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className={styles.statCard}>
                  <h3 className={styles.statTitle}>Total Users</h3>
                  <p className={styles.statValue}>{users.length}</p>
                </div>
                <div className={styles.statCard}>
                  <h3 className={styles.statTitle}>Total Movies</h3>
                  <p className={styles.statValue}>{Movies.length}</p>
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
                    <ResultsPerPageSelector
                      defaultValue={userPageSize}
                      onChange={(val) => {
                        setUserPageSize(val);
                        setUserPageNum(1); // reset to first page when changed
                      }}
                    />

                  </div>
                </div>
              </div>

              <>
              {userLoading ? (
                  <p>Loading users...</p>
                ) : userError ? (
                  <p className="text-red-500">Error: {userError}</p>
                ) : (
                  <div className={styles.userTable}>
                    <div className={styles.tableHeader}>
                      <div className={styles.tableCell}>Name</div>
                      <div className={styles.tableCell}>Email</div>
                      <div className={styles.tableCell}>Phone</div>
                      <div className={styles.tableCell}>Actions</div>
                    </div>

                    {users.slice(
                      (userPageNum - 1) * userPageSize,
                      userPageNum * userPageSize
                    ).map((user) => (
                      <div key={user.user_id} className={styles.tableRow}>
                        <div className={styles.tableCell}>{user.name}</div>
                        <div className={styles.tableCell}>{user.email}</div>
                        <div className={styles.tableCell}>{user.phone ?? "—"}</div>
                        <div className={styles.tableCell}>
                          <button className={styles.actionButton}>Edit</button>
                          <button
                            className={styles.actionButton}
                            onClick={() => handleDeleteUser(user.user_id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>

              <div className={styles.pagination}>
                <button
                  className={styles.paginationButton}
                  onClick={() => setUserPageNum((prev) => Math.max(prev - 1, 1))}
                  disabled={userPageNum === 1}
                >
                  Previous
                </button>

                <div className={styles.pageNumbers}>
                  {Array.from({ length: Math.ceil(users.length / userPageSize) })
                    .map((_, idx) => idx + 1)
                    .filter((pageNum) => {
                      const totalPages = Math.ceil(users.length / userPageSize);
                      return (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        Math.abs(pageNum - userPageNum) <= 1 ||
                        pageNum <= 3 ||
                        pageNum >= totalPages - 2
                      );
                    })
                    .reduce((acc: (number | string)[], curr, i, arr) => {
                      if (i > 0 && typeof curr === "number" && typeof arr[i - 1] === "number" && curr - (arr[i - 1] as number) > 1) {
                        acc.push("...");
                      }
                      acc.push(curr);
                      return acc;
                    }, [])
                    .map((val, idx) =>
                      val === "..." ? (
                        <span key={`ellipsis-${idx}`} className={styles.pageNumber}>
                          ...
                        </span>
                      ) : (
                        <button
                          key={val}
                          className={`${styles.pageNumber} ${
                            userPageNum === val ? styles.activePage : ""
                          }`}
                          onClick={() => setUserPageNum(val as number)}
                        >
                          {val}
                        </button>
                      )
                    )}
                </div>

                <button
                  className={styles.paginationButton}
                  onClick={() =>
                    setUserPageNum((prev) =>
                      prev < Math.ceil(users.length / userPageSize) ? prev + 1 : prev
                    )
                  }
                  disabled={userPageNum >= Math.ceil(users.length / userPageSize)}
                >
                  Next
                </button>
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
                        <button
                          className={styles.contentActionButton}
                          onClick={() => handleMovieDelete(m.show_id)}
                        >
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
                  <button className={`${styles.pageNumber} ${styles.activePage}`}>1</button>
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

function setUsers(userData: Users[]) {
  throw new Error("Function not implemented.");
}
function setUserError(message: string) {
  throw new Error("Function not implemented.");
}

function setUserLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

