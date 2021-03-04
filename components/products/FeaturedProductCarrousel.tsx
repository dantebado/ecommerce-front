import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function FeaturedProductCarrousel() {
  const styles = {
    overflow: "hidden",
    maxHeight: "32rem",
  };

  return (
    <div style={styles}>
      <Carousel
        showThumbs={false}
        showStatus={false}
        dynamicHeight={true}
        infiniteLoop={true}
        autoPlay={true}
      >
        <div>
          <img src="https://i.imgur.com/bw9ADT2.jpg" />
        </div>
        <div>
          <img src="https://i.imgur.com/I39g2UV.jpg.jpg" />
        </div>
        <div>
          <img src="https://i.imgur.com/FZUqZpE.jpg.jpg" />
        </div>
        <div>
          <img src="https://i.imgur.com/kG63LvD.jpg.jpg" />
        </div>
      </Carousel>
    </div>
  );
}
