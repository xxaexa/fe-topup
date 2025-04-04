import {
  Box,
  Typography,
  IconButton,
  Stack,
  Link,
  useTheme,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TikTokIcon from "@mui/icons-material/MusicNote"; // ikon alternatif TikTok

const Footer = () => {
  const theme = useTheme(); // untuk akses palette dari theme

  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        py: 4,
        px: 2,
        // warna latar belakang mengikuti theme saat ini
        bgcolor: theme.palette.background.paper,
        // warna teks juga mengikuti mode terang/gelap
        color: theme.palette.text.primary,
        textAlign: "center",
        borderTop: `1px solid ${theme.palette.divider}`, // garis atas opsional
      }}
    >
      {/* nama toko */}
      <Typography variant="h6" gutterBottom>
        TokoSaya
      </Typography>

      {/* teks copyright */}
      <Typography variant="body2" mb={2}>
        © {new Date().getFullYear()} TokoSaya. All rights reserved.
      </Typography>

      {/* ikon sosial media */}
      <Stack direction="row" spacing={2} justifyContent="center">
        <Link href="https://instagram.com" target="_blank" color="inherit">
          <IconButton color="inherit">
            <InstagramIcon />
          </IconButton>
        </Link>
        <Link href="https://wa.me/your_number" target="_blank" color="inherit">
          <IconButton color="inherit">
            <WhatsAppIcon />
          </IconButton>
        </Link>
        <Link href="https://youtube.com" target="_blank" color="inherit">
          <IconButton color="inherit">
            <YouTubeIcon />
          </IconButton>
        </Link>
        <Link href="https://tiktok.com" target="_blank" color="inherit">
          <IconButton color="inherit">
            <TikTokIcon />
          </IconButton>
        </Link>
      </Stack>
    </Box>
  );
};

export default Footer;
