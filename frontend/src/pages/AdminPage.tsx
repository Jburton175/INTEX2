import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminPage.module.css";
import Header from "../components/homePage/Header";
import Footer from "../components/homePage/Footer";
import ResultsPerPageSelector from "../components/admin/ResultsPerPageSelector";

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  return (
    <div className={styles.adminPage}>
      <Header />

      <main className={styles.adminContent}>
        <div className={styles.adminHeader}>
          <h1 className={styles.adminTitle}>Admin Dashboard</h1>
          <p className={styles.adminSubtitle}>
            Manage your CineNiche streaming platform
          </p>
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
          <button
            className={`${styles.tabButton} ${activeTab === "settings" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </div>

        <div className={styles.adminPanel}>
          {activeTab === "dashboard" && (
            <div className={styles.dashboardPanel}>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <h3 className={styles.statTitle}>Total Users</h3>
                  <p className={styles.statValue}>12,345</p>
                </div>
                <div className={styles.statCard}>
                  <h3 className={styles.statTitle}>Active Subscriptions</h3>
                  <p className={styles.statValue}>8,721</p>
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
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className={styles.contentCard}>
                    <div className={styles.contentImageContainer}>
                      <div className={styles.contentImage} />
                    </div>
                    <div className={styles.contentInfo}>
                      <h3 className={styles.contentTitle}>
                        Content Title {item}
                      </h3>
                      <p className={styles.contentType}>
                        {item % 2 === 0 ? "Movie" : "TV Show"}
                      </p>
                      <div className={styles.contentActions}>
                        <button
                          className={styles.contentActionButton}
                          onClick={() => navigate(`/update-movie/${item}`)}
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

          {activeTab === "settings" && (
            <div className={styles.settingsPanel}>
              <h2 className={styles.panelTitle}>Platform Settings</h2>

              <div className={styles.settingsForm}>
                <div className={styles.settingGroup}>
                  <h3 className={styles.settingGroupTitle}>General Settings</h3>

                  <div className={styles.settingItem}>
                    <label className={styles.settingLabel}>Platform Name</label>
                    <input
                      type="text"
                      className={styles.settingInput}
                      defaultValue="CineNiche"
                    />
                  </div>

                  <div className={styles.settingItem}>
                    <label className={styles.settingLabel}>Contact Email</label>
                    <input
                      type="email"
                      className={styles.settingInput}
                      defaultValue="contact@cineniche.com"
                    />
                  </div>

                  <div className={styles.settingItem}>
                    <label className={styles.settingLabel}>
                      Results Per Page
                    </label>
                    <div className={styles.settingInputContainer}>
                      <ResultsPerPageSelector />
                    </div>
                  </div>
                </div>

                <div className={styles.settingGroup}>
                  <h3 className={styles.settingGroupTitle}>
                    Subscription Plans
                  </h3>

                  <div className={styles.planCard}>
                    <div className={styles.planHeader}>
                      <h4 className={styles.planTitle}>Basic Plan</h4>
                      <input
                        type="text"
                        className={styles.planPriceInput}
                        defaultValue="9.99"
                      />
                    </div>
                    <ul className={styles.planFeatures}>
                      <li className={styles.planFeature}>HD Streaming</li>
                      <li className={styles.planFeature}>Watch on 1 device</li>
                      <li className={styles.planFeature}>Limited content</li>
                    </ul>
                  </div>

                  <div className={styles.planCard}>
                    <div className={styles.planHeader}>
                      <h4 className={styles.planTitle}>Premium Plan</h4>
                      <input
                        type="text"
                        className={styles.planPriceInput}
                        defaultValue="14.99"
                      />
                    </div>
                    <ul className={styles.planFeatures}>
                      <li className={styles.planFeature}>4K Streaming</li>
                      <li className={styles.planFeature}>Watch on 4 devices</li>
                      <li className={styles.planFeature}>
                        All content included
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={styles.settingsActions}>
                  <button className={styles.saveButton}>Save Changes</button>
                  <button className={styles.resetButton}>Reset</button>
                </div>
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
