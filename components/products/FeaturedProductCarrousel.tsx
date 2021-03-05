import useTranslation from "next-translate/useTranslation";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function FeaturedProductCarrousel() {
  const styles = {
    overflow: "hidden",
    maxHeight: "32rem",
  };

  const elemStyles = (bgImage) => ({
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: `url("${bgImage}")`,
    minHeight: "20rem",
  });

  const { t } = useTranslation("common");

  const classes = "flex flex-row items-center justify-center px-4 py-3";

  return (
    <div style={styles}>
      <Carousel
        showThumbs={false}
        showStatus={false}
        dynamicHeight={true}
        infiniteLoop={true}
        autoPlay={true}
      >
        <div
          className={classes}
          style={elemStyles("https://i.imgur.com/bw9ADT2.jpg")}
        >
          <p className="text-4xl font-bold text-white">Walen.Ga</p>
        </div>
        <div
          className={classes}
          style={elemStyles("https://i.imgur.com/I39g2UV.jpg")}
        >
          <p className="text-white text-lg px-12">{t("footer-line")}</p>
        </div>
        <div
          className={classes}
          style={elemStyles("https://i.imgur.com/FZUqZpE.jpg")}
        >
          <p className="text-white text-2xl md:text-5xl font-extrabold">
            #CompartamosElCarrito
          </p>
        </div>
        <div
          className={classes}
          style={elemStyles("https://i.imgur.com/kG63LvD.jpg")}
        ></div>
      </Carousel>
    </div>
  );
}
