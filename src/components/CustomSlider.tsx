import Slider from "react-slick";
import { Box } from "@mui/material";
import ml from "../../public/assets/ml.jpg";
import ff from "../../public/assets/ff.jpg";
import pubg from "../../public/assets/pubg.jpg";
interface ImageItem {
  name: string;
  img: string;
}
const images: ImageItem[] = [
  { name: "MobileLegends", img: ml },
  { name: "FreeFire", img: ff },
  { name: "PUBG", img: pubg },
];

const CustomSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", my: 4 }}>
      <Slider {...settings}>
        {images.map((img, idx) => (
          <Box key={idx}>
            <img
              src={ml}
              alt={`slide-${idx}`}
              style={{ width: "100%", borderRadius: "12px" }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CustomSlider;
