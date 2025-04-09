import React from "react";
import TopNavBar from "../components/TopNavBar";
import CookieConsentBanner from "../components/CookieConsentBanner";
import Footer from "../components/Footer";
// import "../components/HomePage.css";

function HomePage() {
  return (
    <>
      <TopNavBar selectedType={"Movie"} onTypeChange={function (type: "Movie" | "TV Show"): void {
        throw new Error("Function not implemented.");
      } } />
      <main
        style={{
          padding: "6rem 2rem 2rem", // Top padding accounts for navbar height
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h1>Welcome to CineNiche!</h1>
        <p>
          Discover unique, niche, and classic films. Your curated movie
          experience starts here.
        </p>

        {[...Array(25)].map((_, i) => (
          <section key={i} style={{ margin: "2rem 0" }}>
            <h2>Feature #{i + 1}</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              bibendum pulvinar nisl, sed vehicula mauris facilisis at. Duis
              vitae nunc a sapien fermentum hendrerit sed non eros.
            </p>
          </section>
        ))}
      </main>
      <CookieConsentBanner />
      <Footer />
    </>
  );
}

export default HomePage;
