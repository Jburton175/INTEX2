import styles from "../pages/AdminPage.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  rowNum: number; // Row number before multiplication
  multiplier: number; // Multiplier to adjust the rows per page
  onPageChange: (newPage: number) => void;
  onRowNumChange: (newSize: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  rowNum,
  multiplier, // Destructure the multiplier
  onPageChange,
  onRowNumChange,
}: PaginationProps) => {
  const getDisplayPages = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const filteredPages = pages.filter((pageNum) => {
      return (
        pageNum === 1 ||
        pageNum === totalPages ||
        Math.abs(pageNum - currentPage) <= 1 ||
        pageNum <= 3 ||
        pageNum >= totalPages - 2
      );
    });

    return filteredPages.reduce<(number | string)[]>((acc, curr, i, arr) => {
      if (
        i > 0 &&
        typeof curr === "number" &&
        typeof arr[i - 1] === "number" &&
        curr - (arr[i - 1] as number) > 1
      ) {
        acc.push("...");
      }
      acc.push(curr);
      return acc;
    }, []);
  };

  return (
    <>
      {/* Pagination Control */}
      <div className={styles.pagination}>
        <button
          className={styles.paginationButton}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <div className={styles.pageNumbers}>
          {getDisplayPages().map((val, idx) =>
            val === "..." ? (
              <span key={`ellipsis-${idx}`} className={styles.pageNumber}>
                ...
              </span>
            ) : (
              <button
                key={val}
                className={`${styles.pageNumber} ${
                  currentPage === val ? styles.activePage : ""
                }`}
                onClick={() => onPageChange(val as number)}
              >
                {val}
              </button>
            )
          )}
        </div>

        <button
          className={styles.paginationButton}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <br />

      {/* Row Selector */}
      <div className={styles.rowSelector}>
        <label className={styles.rowLabel}>Rows per page: </label>
        <select
          className={styles.rowSelect}
          value={rowNum / multiplier} // Display the original value before multiplication
          onChange={(e) => {
            const selectedValue = Number(e.target.value);
            const newRowNum = selectedValue * multiplier; // Multiply by the multiplier
            onRowNumChange(newRowNum); // Update rowNum state with the new value
            onPageChange(1); // Reset to page 1
          }}
        >
          {[1, 2, 3, 5, 10, 15].map((row) => (
            <option key={row} value={row}>
              {row}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Pagination;
