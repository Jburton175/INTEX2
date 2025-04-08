import React from "react";
import styles from "./MovieGrid.module.css";

const MovieGrid: React.FC = () => {
  // URLs for movie images - these will be replaced with actual URLs
  const movieUrls = [
    "https://cdn.builder.io/api/v1/image/assets/TEMP/7d070b596a99677bef7f541f0efac5e7a0f3a1af",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/89be5edcc39709eb0c4b581311327aea03abe2e4",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/47ba89a27c0de49cd519dbfc58cd4ab9a37ea813",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/34e83b87d309f5ef8b61e9942022617a51bf4add",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/f10105c3eb9d57716826ba34b6757c9a95b96462",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/2608314a2720793c6bbefe8fa795fea76c2317bf",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/d9baeeed2314ebaed75ff6f6d92888db45d0182b",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/7cf8cc1fd4f9b5fc5c44b9d778b3f649e56ee696",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/a77d275ce54efa56f96a289a7c813ed8e1e06927",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/e4562ab34aff003266b9a9fdd1f67c9e390f3b53",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/6858474e7fd41f5e9a510ac187be1ac1f15dfc26",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/36046bafbdfecfc07d73979a45c5c92de720ed70",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/7b8bf19da077826fa424b25c0200be21f619b60c",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/0321bc4118b2f55386f9a0d26b2eaf3b368ab444",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/8b7fda10b99e62e6414c143f5bd961c4ade5737e",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/7ab26a8861d7b310cc94c1cdc1f2b9537128aebd",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/7fe6d13fd798d64e7677460d7ee3c81296c90dc4",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/09d6a028a0a27b7daa03f17d5da37fc7eb0f57e1",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/75e750c6f742d10ee60e93c7d3f5ba4d2ca91f20",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/8f004e068c77d713376cadaa83f0cba0271d613c",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/ccd1ca33c0c4d1adf8c11e005a4868ca169fa2a4",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/a3bb96320da3709f607505d77ede9b2d0bdf8fc1",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/ba7384cbfcfc1a56f242645929213ec102abb07d",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/19afd675cc51a1b375123a129abbe2000bc04e5b",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/375b2212d4acbaa27217031e1925c34b33b4a238",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/31944eb7d1e661d82bc905680be4d8d7918b463f",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/42d94adc039e15a784a5668906f219f800775fb1",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/1bb764f0a7cd2b9d601eb07c7af924089bc0e7ee",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/415af64bd71fea2984c12ce6885afbe28af581bb",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/827fef7f952b0647bc5cd60327de1effb6131179",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/b1eee04594b16b222dd44c2b657f9eade14ca04a",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/1e4a196f720c06bf1887ae96dd3910684d8d5590",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/f2dca340945b4b313ca9bc1cda20adf0630da8cf",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/39cc833be18ee73fdd6f6e1e396c445845d9b000",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/f7cad8b1e1e1fc9bf688f317ec16c73f4e4b5cfa",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/d768e7e937ae80c03f6d4c64ba841f7d4436c6be",
  ];

  // Split URLs into rows of 9 for the grid
  const row1 = movieUrls.slice(0, 9);
  const row2 = movieUrls.slice(9, 18);
  const row3 = movieUrls.slice(18, 27);
  const row4 = movieUrls.slice(27, 36);

  return (
    <div className={styles.movieGridContainer}>
      <div className={styles.row}>
        {row1.map((url, index) => (
          <img
            key={`row1-${index}`}
            src={url}
            alt=""
            className={styles.movieItem}
          />
        ))}
      </div>
      <div className={styles.row}>
        {row2.map((url, index) => (
          <img
            key={`row2-${index}`}
            src={url}
            alt=""
            className={styles.movieItem}
          />
        ))}
      </div>
      <div className={styles.row}>
        {row3.map((url, index) => (
          <img
            key={`row3-${index}`}
            src={url}
            alt=""
            className={styles.movieItem}
          />
        ))}
      </div>
      <div className={styles.row}>
        {row4.map((url, index) => (
          <img
            key={`row4-${index}`}
            src={url}
            alt=""
            className={styles.movieItem}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
