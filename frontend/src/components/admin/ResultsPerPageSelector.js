import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import styles from "./ResultsPerPageSelector.module.css";
const ResultsPerPageSelector = ({ defaultValue = 10, onChange, }) => {
    const [resultsPerPage, setResultsPerPage] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const options = [5, 10, 20, 50];
    const handleSelect = (value) => {
        setResultsPerPage(value);
        setIsOpen(false);
        if (onChange) {
            onChange(value);
        }
    };
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current &&
                !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (_jsxs("div", { className: styles.selectorContainer, ref: dropdownRef, children: [_jsxs("button", { className: styles.selectorButton, onClick: () => setIsOpen(!isOpen), "aria-haspopup": "listbox", "aria-expanded": isOpen, children: [_jsx("span", { children: resultsPerPage }), _jsx("svg", { className: `${styles.arrow} ${isOpen ? styles.arrowUp : ""}`, width: "12", height: "6", viewBox: "0 0 12 6", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M1 1L6 5L11 1", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })] }), isOpen && (_jsx("div", { className: styles.dropdown, role: "listbox", children: options.map((option) => (_jsx("button", { className: `${styles.option} ${resultsPerPage === option ? styles.selectedOption : ""}`, onClick: () => handleSelect(option), role: "option", "aria-selected": resultsPerPage === option, children: option }, option))) }))] }));
};
export default ResultsPerPageSelector;
