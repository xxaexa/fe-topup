import { Box, Container, Typography, Divider } from "@mui/material";

const reasons = [
  {
    icon: "⚡",
    title: "Proses Cepat & Otomatis",
    desc: "Transaksi Anda diproses dalam hitungan detik tanpa hambatan.",
  },
  {
    icon: "💸",
    title: "Harga Terjangkau",
    desc: "Kami menawarkan harga yang kompetitif untuk semua produk game.",
  },
  {
    icon: "🔒",
    title: "Keamanan Terjamin",
    desc: "Sistem pembayaran aman dan terenkripsi untuk kenyamanan Anda.",
  },
  {
    icon: "🕒",
    title: "Layanan 24/7",
    desc: "Tim support kami siap membantu Anda kapan saja, bahkan tengah malam.",
  },
  {
    icon: "💳",
    title: "Banyak Metode Pembayaran",
    desc: "QRIS, e-wallet, dan transfer bank semuanya tersedia dengan mudah.",
  },
];

const AboutPage = () => {
  return (
    <Box sx={{ bgcolor: (theme) => theme.palette.background.default, py: 6 }}>
      <Container maxWidth="xl" sx={{ maxWidth: "1440px", mx: "auto" }}>
        {/* Judul */}
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Tentang GameZone Digital Store
        </Typography>

        {/* Latar Belakang */}
        <Box mb={5}>
          <Typography variant="h6" color="primary" gutterBottom>
            Latar Belakang
          </Typography>
          <Typography variant="body1" color="text.secondary">
            GameZone Digital Store didirikan dengan semangat untuk menyediakan
            layanan top-up game yang cepat, aman, dan terpercaya bagi seluruh
            gamer di Indonesia. Kami memahami betapa pentingnya waktu dan
            kenyamanan saat bermain, itulah mengapa kami hadir sebagai solusi
            digital terbaik untuk kebutuhan top-up Anda. Kami telah dipercaya
            oleh ribuan pelanggan sejak awal berdiri, dengan dukungan tim
            customer service yang responsif dan profesional.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Keunggulan */}
        <Box>
          <Typography variant="h6" color="primary" gutterBottom>
            Kenapa Harus Topup di Sini?
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              mt: 2,
            }}
          >
            {reasons.map((item, index) => (
              <Box
                key={index}
                sx={(theme) => ({
                  flex: {
                    xs: "100%",
                    sm: "calc(50% - 8px)",
                    md: "calc(33.33% - 8px)",
                  },
                  p: 3,
                  borderRadius: 2,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? theme.palette.background.paper
                      : theme.palette.grey[100],
                  minHeight: 150,
                })}
              >
                <Typography variant="h4" mb={1}>
                  {item.icon}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutPage;
