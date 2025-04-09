import React, { useState, useRef, useEffect } from "react";
import styles from "./ResultsPerPageSelector.module.css";

interface ResultsPerPageSelectorProps {
  defaultValue?: number;
  onChange?: (value: number) => void;
}

const ResultsPerPageSelector: React.FC<ResultsPerPageSelectorProps> = ({
  defaultValue = 10,
  onChange,
}) => {
  const [resultsPerPage, setResultsPerPage] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [5, 10, 20, 50];

  const handleSelect = (value: number) => {
    setResultsPerPage(value);
    setIsOpen(false);
    if (onChange) {
      onChange(value);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.selectorContainer} ref={dropdownRef}>
      <button
        className={styles.selectorButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{resultsPerPage}</span>
        <svg
          className={`${styles.arrow} ${isOpen ? styles.arrowUp : ""}`}
          width="12"
          height="6"
          viewBox="0 0 12 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L6 5L11 1"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="listbox">
          {options.map((option) => (
            <button
              key={option}
              className={`${styles.option} ${resultsPerPage === option ? styles.selectedOption : ""}`}
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={resultsPerPage === option}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsPerPageSelector;
