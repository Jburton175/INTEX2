import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Footer.module.css";
const Footer = () => {
    return (_jsx("footer", { className: styles.footer, children: _jsxs("div", { className: styles.footerContent, children: [_jsx("hr", { className: styles.divider }), _jsxs("div", { className: styles.footerBottom, children: [_jsx("p", { className: styles.copyright, children: "@2025 CineNiche, All Rights Reserved" }), _jsxs("div", { className: styles.policyLinks, children: [_jsx("a", { href: "/privacypolicy", className: styles.policyLink, children: "Privacy Policy" }), _jsx("div", { className: styles.separator }), _jsx("a", { href: "/cookie", className: styles.policyLink, children: "Cookie Policy" })] })] })] }) }));
};
export default Footer;
