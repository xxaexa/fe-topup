import { Card, CardActionArea, CardMedia } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  name: string;
  image: string;
}

const VoucherCard = ({ name, image }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname.includes("dashboard")) {
      navigate(`/dashboard/product/edit/${name}`);
    } else {
      navigate(`/voucher/${name}`);
    }
  };
  return (
    <Card sx={{ width: 180, borderRadius: 2 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia component="img" height="220" image={image} alt={name} />
      </CardActionArea>
    </Card>
  );
};

export default VoucherCard;
