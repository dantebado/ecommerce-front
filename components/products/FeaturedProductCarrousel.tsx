import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function FeaturedProductCarrousel() {
  return (
    <div>
      <Carousel showThumbs={false} showStatus={false} dynamicHeight={true} infiniteLoop={true} autoPlay={true}>
        <div>
          <img src="https://i.imgur.com/8g3fipI.jpg" />
        </div>
        <div>
          <img src="https://i.imgur.com/jcuhep6.jpg" />
        </div>
        <div>
          <img src="https://i.imgur.com/nEFk7jK.jpg" />
        </div>
        <div>
          <img src="https://i.imgur.com/5C47VSn.jpg" />
        </div>
        <div>
          <img src="https://i.imgur.com/ZYxLxag.jpg" />
        </div>
      </Carousel>
    </div>
  )
}
