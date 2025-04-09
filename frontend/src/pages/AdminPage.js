import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminPage.module.css";
import Header from "../components/TopNavBar";
import Footer from "../components/Footer";
import ResultsPerPageSelector from "../components/admin/ResultsPerPageSelector";
import { deleteMovie, fetchMovies, fetchUsers, deleteUser } from "../api/API";
import Pagination from "../components/Pagination";
const AdminPage = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [userPageSize, setUserPageSize] = useState(10);
    const [userPageNum, setUserPageNum] = useState(1);
    const navigate = useNavigate();
    // Movies
    const [Movies, setMovies] = useState([]);
    const [movieLoading, setMovieLoading] = useState(true);
    const [movieError, setMovieError] = useState(null);
    const [MoviePageSize, setMoviePageSize] = useState(9);
    const [MoviePageNum, setMoviePageNum] = useState(1);
    const [totalMovies, setTotalMovies] = useState(0);
    const [totalMoviePages, setTotalMoviePages] = useState(0);
    const [users, setUsers] = useState([]);
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState(null);
    useEffect(() => {
        const loadMovies = async () => {
            try {
                const data = await fetchMovies(MoviePageSize, MoviePageNum, []);
                setMovies(data.movies);
                setTotalMovies(data.totalNumMovies);
                setTotalMoviePages(Math.ceil(data.totalNumMovies / MoviePageSize));
            }
            catch (err) {
                setMovieError(err.message);
            }
            finally {
                setMovieLoading(false);
            }
        };
        loadMovies();
    }, [MoviePageSize, MoviePageNum, totalMovies]);
    useEffect(() => {
        if (activeTab === "users") {
            const loadUsers = async () => {
                try {
                    const userData = await fetchUsers();
                    setUsers(userData);
                }
                catch (err) {
                    setUserError(err.message);
                }
                finally {
                    setUserLoading(false);
                }
            };
            loadUsers();
        }
    }, [activeTab]);
    // delete user
    const handleDeleteUser = async (id) => {
        const confirmDeleteUser = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDeleteUser)
            return;
        try {
            await deleteUser(id);
            setUsers((prev) => prev.filter((u) => u.user_id !== id));
        }
        catch (err) {
            alert("Failed to delete user");
        }
    };
    // delete movie
    const handleDeleteMovie = async (show_id) => {
        const confirmDeleteMovie = window.confirm("Are you sure you want to delete this movie?");
        if (!confirmDeleteMovie)
            return;
        try {
            await deleteMovie(show_id);
            setMovies(Movies.filter((m) => m.show_id !== show_id));
        }
        catch (error) {
            alert("Failed to delete movie. Please try again.");
        }
    };
    if (movieLoading)
        return _jsx("p", { children: "Loading..." });
    if (movieError)
        return _jsxs("p", { className: "text-red-500", children: ["Error: ", movieError] });
    return (_jsxs("div", { className: styles.adminPage, children: [_jsx(Header, { selectedType: "Movie", onTypeChange: function (type) {
                    throw new Error("Function not implemented.");
                } }), _jsx("br", {}), _jsx("br", {}), _jsxs("main", { className: styles.adminContent, children: [_jsx("div", { className: styles.adminHeader, children: _jsx("h1", { className: styles.adminTitle, children: "Admin Dashboard" }) }), _jsxs("div", { className: styles.adminTabs, children: [_jsx("button", { className: `${styles.tabButton} ${activeTab === "dashboard" ? styles.activeTab : ""}`, onClick: () => setActiveTab("dashboard"), children: "Dashboard" }), _jsx("button", { className: `${styles.tabButton} ${activeTab === "users" ? styles.activeTab : ""}`, onClick: () => setActiveTab("users"), children: "Users" }), _jsx("button", { className: `${styles.tabButton} ${activeTab === "content" ? styles.activeTab : ""}`, onClick: () => setActiveTab("content"), children: "Content" })] }), _jsxs("div", { className: styles.adminPanel, children: [activeTab === "dashboard" && (_jsx("div", { className: styles.dashboardPanel, children: _jsxs("div", { className: styles.statsGrid, style: { display: "flex", justifyContent: "center" }, children: [_jsxs("div", { className: styles.statCard, children: [_jsx("h3", { className: styles.statTitle, children: "Total Users" }), _jsx("p", { className: styles.statValue, children: users.length })] }), _jsxs("div", { className: styles.statCard, children: [_jsx("h3", { className: styles.statTitle, children: "Total Movies" }), _jsx("p", { className: styles.statValue, children: Movies.length })] }), _jsxs("div", { className: styles.statCard, children: [_jsx("h3", { className: styles.statTitle, children: "Total Shows" }), _jsx("p", { className: styles.statValue, children: "894" })] })] }) })), activeTab === "users" && (_jsxs("div", { className: styles.usersPanel, children: [_jsxs("div", { className: styles.panelHeader, children: [_jsx("h2", { className: styles.panelTitle, children: "User Management" }), _jsx("button", { className: styles.addButton, onClick: () => navigate("/signup"), children: "Add a User" }), _jsxs("div", { className: styles.panelControls, children: [_jsx("div", { className: styles.searchBox, children: _jsx("input", { type: "text", placeholder: "Search users...", className: styles.searchInput }) }), _jsxs("div", { className: styles.resultsPerPageContainer, children: [_jsx("span", { className: styles.resultsLabel, children: "Results per page:" }), _jsx(ResultsPerPageSelector, { defaultValue: userPageSize, onChange: (val) => {
                                                                    setUserPageSize(val);
                                                                    setUserPageNum(1); // reset to first page when changed
                                                                } })] })] })] }), _jsx(_Fragment, { children: userLoading ? (_jsx("p", { children: "Loading users..." })) : userError ? (_jsxs("p", { className: "text-red-500", children: ["Error: ", userError] })) : (_jsxs("div", { className: styles.userTable, children: [_jsxs("div", { className: styles.tableHeader, children: [_jsx("div", { className: styles.tableCell, children: "Name" }), _jsx("div", { className: styles.tableCell, children: "Email" }), _jsx("div", { className: styles.tableCell, children: "Phone" }), _jsx("div", { className: styles.tableCell, children: "Actions" })] }), users
                                                    .slice((userPageNum - 1) * userPageSize, userPageNum * userPageSize)
                                                    .map((user) => (_jsxs("div", { className: styles.tableRow, children: [_jsx("div", { className: styles.tableCell, children: user.name }), _jsx("div", { className: styles.tableCell, children: user.email }), _jsx("div", { className: styles.tableCell, children: user.phone ?? "—" }), _jsx("div", { className: styles.tableCell, children: _jsx("button", { className: styles.actionButton, onClick: () => {
                                                                    const confirmed = window.confirm("Are you sure you want to delete this user?");
                                                                    if (confirmed) {
                                                                        handleDeleteUser(user.user_id);
                                                                    }
                                                                }, children: "Delete" }) })] }, user.user_id)))] })) }), _jsxs("div", { className: styles.pagination, children: [_jsx("button", { className: styles.paginationButton, onClick: () => setUserPageNum((prev) => Math.max(prev - 1, 1)), disabled: userPageNum === 1, children: "Previous" }), _jsx("div", { className: styles.pageNumbers, children: Array.from({
                                                    length: Math.ceil(users.length / userPageSize),
                                                })
                                                    .map((_, idx) => idx + 1)
                                                    .filter((pageNum) => {
                                                    const totalPages = Math.ceil(users.length / userPageSize);
                                                    return (pageNum === 1 ||
                                                        pageNum === totalPages ||
                                                        Math.abs(pageNum - userPageNum) <= 1 ||
                                                        pageNum <= 3 ||
                                                        pageNum >= totalPages - 2);
                                                })
                                                    .reduce((acc, curr, i, arr) => {
                                                    if (i > 0 &&
                                                        typeof curr === "number" &&
                                                        typeof arr[i - 1] === "number" &&
                                                        curr - arr[i - 1] > 1) {
                                                        acc.push("...");
                                                    }
                                                    acc.push(curr);
                                                    return acc;
                                                }, [])
                                                    .map((val, idx) => val === "..." ? (_jsx("span", { className: styles.pageNumber, children: "..." }, `ellipsis-${idx}`)) : (_jsx("button", { className: `${styles.pageNumber} ${userPageNum === val ? styles.activePage : ""}`, onClick: () => setUserPageNum(val), children: val }, val))) }), _jsx("button", { className: styles.paginationButton, onClick: () => setUserPageNum((prev) => prev < Math.ceil(users.length / userPageSize)
                                                    ? prev + 1
                                                    : prev), disabled: userPageNum >= Math.ceil(users.length / userPageSize), children: "Next" })] })] })), activeTab === "content" && (_jsxs("div", { className: styles.contentPanel, children: [_jsxs("div", { className: styles.panelHeader, children: [_jsx("h2", { className: styles.panelTitle, children: "Content Management" }), _jsxs("div", { className: styles.panelControls, children: [_jsx("div", { className: styles.searchBox, children: _jsx("input", { type: "text", placeholder: "Search content...", className: styles.searchInput }) }), _jsx("button", { className: styles.addButton, children: "Add New Content" })] })] }), _jsx("div", { className: styles.contentGrid, children: Movies.map((m) => (_jsxs("div", { className: styles.contentCard, children: [_jsx("div", { className: styles.contentImageContainer, children: _jsx("div", { className: styles.contentImage, style: {
                                                            backgroundImage: `url(https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent((m.title || "default-title").replace(/['’:\-.!?–&()]/g, "") // Remove special characters
                                                            )}.jpg)`,
                                                            backgroundSize: "cover",
                                                            backgroundPosition: "center",
                                                            backgroundRepeat: "no-repeat",
                                                        } }) }), _jsxs("div", { className: styles.contentInfo, children: [_jsx("h3", { className: styles.contentTitle, children: m.title }), _jsx("p", { className: styles.contentType, children: m.type }), _jsxs("div", { className: styles.contentActions, children: [_jsx("button", { className: styles.contentActionButton, onClick: () => navigate(`/update-movie/${m.show_id}`), children: "Edit" }), _jsx("button", { className: styles.contentActionButton, onClick: () => handleDeleteMovie(m.show_id), children: "Delete" })] })] })] }, m.show_id))) }), _jsx(Pagination, { currentPage: MoviePageNum, totalPages: totalMoviePages, rowNum: MoviePageSize, multiplier: 3, onPageChange: setMoviePageNum, onRowNumChange: setMoviePageSize })] }))] })] }), _jsx(Footer, {})] }));
};
export default AdminPage;
