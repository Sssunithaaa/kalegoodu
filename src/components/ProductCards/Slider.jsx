import {Carousel} from './Carousel';
import { img17, img18, img19, img20 } from "../../assets/images"

const thumbnails = [
  img17,img18,img19,img20
]


export const Slider = () => {
  return (
    <div className="relative md:w-auto md:h-full md:max-w-[500px]">
      <Carousel>
        {thumbnails.map((s, index) => (
          <img
            className="object-cover"
            key={index}
            src={s}
            alt={`Slide ${index + 1}`}
          />
        ))}
      </Carousel>
    </div>
  );
};
