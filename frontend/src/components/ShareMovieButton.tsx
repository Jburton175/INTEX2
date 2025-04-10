import React from "react";
import { Mail } from "lucide-react"; // Optional: replace with another icon if not using lucide
import styles from "./ShareMovieButton.module.css";

interface ShareMovieButtonProps {
  title: string;
}

const ShareMovieButton: React.FC<ShareMovieButtonProps> = ({ title }) => {
  const mailSubject = `Check out this movie: ${title}`;
  const mailBody = `Hey, I found this movie called "${title}" and thought you might like it!

Let me know what you think.`;

  const mailtoLink = `mailto:?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

  return (
    <a href={mailtoLink} className={styles.shareButton}>
      <Mail className={styles.icon} />
      Share via Email
    </a>
  );
};

export default ShareMovieButton;