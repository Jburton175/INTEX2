import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./ShowCard.module.css";
import { Clock, Tv } from "lucide-react";
const ShowCard = ({ image, duration, rating, seasons, type, }) => {
    return (_jsxs("div", { className: styles.showCard, children: [_jsx("img", { src: image, alt: "", className: styles.showImage }), _jsxs("div", { className: styles.showDetails, children: [type === "duration" && duration && (_jsxs("div", { className: styles.durationBadge, children: [_jsx(Clock, { size: 20, className: styles.clockIcon }), _jsx("span", { className: styles.durationText, children: duration })] })), seasons && (_jsxs("div", { className: styles.seasonsBadge, children: [_jsx(Tv, { size: 20, className: styles.tvIcon }), _jsx("span", { className: styles.seasonsText, children: seasons })] })), type === "rating" && rating !== undefined && (_jsxs("div", { className: styles.ratingBadge, children: [_jsx("div", { className: styles.ratingStars, children: [...Array(5)].map((_, i) => (_jsx("span", { className: `${styles.star} ${i < Math.floor(rating) ? styles.starFilled : ""}`, children: "\u2605" }, i))) }), _jsx("span", { className: styles.ratingCount, children: `${rating}K` })] }))] })] }));
};
export default ShowCard;
