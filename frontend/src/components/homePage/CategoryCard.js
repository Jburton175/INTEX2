import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./CategoryCard.module.css";
const CategoryCard = ({ name, images }) => {
    return (_jsx("article", { className: styles.categoryCard, children: _jsxs("div", { className: styles.imageContainer, children: [_jsxs("div", { className: styles.imageRow, children: [_jsx("img", { src: images[0], alt: "", className: styles.categoryImage }), _jsx("img", { src: images[1], alt: "", className: styles.categoryImage })] }), _jsxs("div", { className: styles.imageRow, children: [_jsx("img", { src: images[2], alt: "", className: styles.categoryImage }), _jsx("img", { src: images[3], alt: "", className: styles.categoryImage })] }), _jsx("div", { className: styles.gradient }), _jsx("h3", { className: styles.categoryName, children: name })] }) }));
};
export default CategoryCard;
