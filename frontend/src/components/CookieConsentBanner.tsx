import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const CookieConsentBanner: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(true);
  const [currentTheme, setCurrentTheme] = useState<string>(
    document.documentElement.getAttribute("data-theme") || "light"
  );

  const getCookie = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length);
      }
    }
    return null;
  };

  useEffect(() => {
    const consent = getCookie("cookieConsent");
    if (!consent) {
      setVisible(true);
    }

    console.log("Cookies on page load:", document.cookie);

    const observer = new MutationObserver(() => {
      const updatedTheme =
        document.documentElement.getAttribute("data-theme") || "light";
      setCurrentTheme(updatedTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const handleAccept = () => {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);

    document.cookie =
      "cookieConsent=accepted; path=/; expires=" + expires.toUTCString();
    setVisible(false);

    console.log("Cookie consent accepted:", document.cookie);
  };

  if (!visible) return null;

  const isDark = currentTheme === "dark";

  const baseColor = isDark ? "#333" : "#f8f9fa";
  const textColor = isDark ? "#ccc" : "#333";
  const buttonBg = isDark ? "#ccc" : "#333";
  const buttonText = isDark ? "#333" : "#f8f9fa";

  const bannerStyle: React.CSSProperties = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: baseColor,
    color: textColor,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: expanded ? "center" : "flex-end",
    overflow: "hidden",
    padding: expanded ? "1.5rem" : "0.25rem 1rem",
    height: expanded ? "auto" : "2.5rem",
    transition: "all 0.3s ease",
    boxShadow: "0 -2px 6px rgba(0,0,0,0.1)",
  };

  const messageStyle: React.CSSProperties = {
    fontSize: "1.1rem",
    display: expanded ? "inline" : "none",
    marginRight: "1.5rem",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "0.75rem 1.5rem",
    background: buttonBg,
    color: buttonText,
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    fontSize: "1rem",
    display: expanded ? "inline-block" : "none",
  };

  const iconStyle: React.CSSProperties = {
    color: textColor,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    marginLeft: expanded ? "1.5rem" : "0",
  };

  return (
    <div style={bannerStyle}>
      {expanded && (
        <>
          <span style={messageStyle}>
            We use cookies to enhance your experience. By continuing to use our
            site, you agree to our cookie policy.
          </span>

          <button style={buttonStyle} onClick={handleAccept}>
            Accept
          </button>
        </>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        style={iconStyle}
        aria-label={expanded ? "Collapse banner" : "Expand banner"}
      >
        {expanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
      </button>
    </div>
  );
};

export default CookieConsentBanner;
