import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styles from "../pages/AdminPage.module.css";
const Pagination = ({ currentPage, totalPages, rowNum, multiplier, // Destructure the multiplier
onPageChange, onRowNumChange, }) => {
    const getDisplayPages = () => {
        const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        const filteredPages = pages.filter((pageNum) => {
            return (pageNum === 1 ||
                pageNum === totalPages ||
                Math.abs(pageNum - currentPage) <= 1 ||
                pageNum <= 3 ||
                pageNum >= totalPages - 2);
        });
        return filteredPages.reduce((acc, curr, i, arr) => {
            if (i > 0 &&
                typeof curr === "number" &&
                typeof arr[i - 1] === "number" &&
                curr - arr[i - 1] > 1) {
                acc.push("...");
            }
            acc.push(curr);
            return acc;
        }, []);
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.pagination, children: [_jsx("button", { className: styles.paginationButton, onClick: () => onPageChange(currentPage - 1), disabled: currentPage === 1, children: "Previous" }), _jsx("div", { className: styles.pageNumbers, children: getDisplayPages().map((val, idx) => val === "..." ? (_jsx("span", { className: styles.pageNumber, children: "..." }, `ellipsis-${idx}`)) : (_jsx("button", { className: `${styles.pageNumber} ${currentPage === val ? styles.activePage : ""}`, onClick: () => onPageChange(val), children: val }, val))) }), _jsx("button", { className: styles.paginationButton, onClick: () => onPageChange(currentPage + 1), disabled: currentPage === totalPages, children: "Next" })] }), _jsx("br", {}), _jsxs("div", { className: styles.rowSelector, children: [_jsx("label", { className: styles.rowLabel, children: "Rows per page: " }), _jsx("select", { className: styles.rowSelect, value: rowNum / multiplier, onChange: (e) => {
                            const selectedValue = Number(e.target.value);
                            const newRowNum = selectedValue * multiplier; // Multiply by the multiplier
                            onRowNumChange(newRowNum); // Update rowNum state with the new value
                            onPageChange(1); // Reset to page 1
                        }, children: [1, 2, 3, 5, 10, 15].map((row) => (_jsx("option", { value: row, children: row }, row))) })] })] }));
};
export default Pagination;
