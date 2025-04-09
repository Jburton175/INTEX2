import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Header.module.css";
import { LogoIcon, BellIcon } from "./Icons";
const Header = () => {
    return (_jsxs("header", { className: styles.header, children: [_jsxs("div", { className: styles.brandContainer, children: [_jsx(LogoIcon, {}), _jsx("h1", { className: styles.brandName, children: "CineNiche" })] }), _jsx("nav", { className: styles.navigation, children: _jsxs("div", { className: styles.navTabs, children: [_jsx("button", { className: styles.activeTab, children: "Home" }), _jsx("a", { href: "/movies", className: styles.tabLabel, children: "Movies" }), _jsx("a", { href: "/shows", className: styles.tabLabel, children: "Shows" })] }) }), _jsx("button", { className: styles.notificationButton, "aria-label": "Notifications", children: _jsx(BellIcon, {}) })] }));
};
export default Header;
