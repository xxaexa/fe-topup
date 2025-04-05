import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { Voucher } from "../types";
import { useCreateTransactionMutation } from "../redux/api/transactionApi";
import { useNavigate } from "react-router-dom";

interface VoucherFormProps {
  game: Voucher;
}

declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        callbacks?: {
          onSuccess?: (result: unknown) => void;
          onPending?: (result: unknown) => void;
          onError?: (result: unknown) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

const VoucherForm = ({ game }: VoucherFormProps) => {
  const [selectedType, setSelectedType] = useState<"package" | "satuan">(
    "package"
  );
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  const [createTransaction, { isLoading, isError, isSuccess, error }] =
    useCreateTransactionMutation();

  const filteredOptions = game.variants?.filter(
    (variant) => variant.type === selectedType
  );
  const selectedOption = filteredOptions?.find(
    (variant) => variant.id === selectedOptionId
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, boolean> = {};
    game.inputs.forEach((input) => {
      if (!formValues[input.name] || formValues[input.name].trim() === "") {
        newErrors[input.name] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    if (!selectedOption) return;

    const payload = {
      name: game.name,
      image: game.image,
      variants: selectedOption,
      inputs: game.inputs.map((input) => ({
        label: input.label,
        name: input.name,
        value: formValues[input.name],
      })),
    };

    try {
      const response = await createTransaction(payload).unwrap();
      const snapToken = response.data.midtransToken;
      const transactionId = response.data.transactionId;

      window.snap.pay(snapToken, {
        onSuccess: () => {
          navigate(`/transaksi/${transactionId}`);
        },
        onPending: () => {
          setSnackbar({
            open: true,
            message: "Transaksi masih dalam proses. Silakan cek status nanti.",
            severity: "error",
          });
        },
        onError: () => {
          setSnackbar({
            open: true,
            message: "Terjadi kesalahan saat memproses pembayaran.",
            severity: "error",
          });
        },
        onClose: () => {
          setSnackbar({
            open: true,
            message: "Pembayaran dibatalkan oleh pengguna.",
            severity: "error",
          });
        },
      });
    } catch (err) {
      console.error("Gagal membuat transaksi:", err);
      setSnackbar({
        open: true,
        message: "Gagal membuat transaksi.",
        severity: "error",
      });
    }
  };

  // midtrans
  useEffect(() => {
    const snapSrcUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const script = document.createElement("script");
    const myMidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
    script.setAttribute("data-client-key", myMidtransClientKey);
    script.src = snapSrcUrl;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setSnackbar({
        open: true,
        message: "Pesanan berhasil dikirim!",
        severity: "success",
      });
      // Reset form
      setSelectedOptionId(null);
      setFormValues({});
      setVoucherCode("");
    }

    if (isError) {
      setSnackbar({
        open: true,
        message: "Gagal mengirim pesanan.",
        severity: "error",
      });
      console.error(error);
    }
  }, [isSuccess, isError, error]);

  return (
    <Box
      maxWidth={700}
      mx="auto"
      p={2}
      component="form"
      onSubmit={handleSubmit}
    >
      <Box display="flex" gap={2} mb={3}>
        {game.inputs.map((input) => (
          <TextField
            key={input.name}
            label={input.label}
            name={input.name}
            fullWidth
            value={formValues[input.name] || ""}
            onChange={handleInputChange}
            error={!!formErrors[input.name]}
            helperText={
              formErrors[input.name] ? `${input.label} tidak boleh kosong` : ""
            }
          />
        ))}
      </Box>

      {/* package */}
      <ToggleButtonGroup
        value={selectedType}
        exclusive
        onChange={(e, value) => value && setSelectedType(value)}
        sx={{ mb: 3 }}
      >
        <ToggleButton value="normal">Normal</ToggleButton>
        <ToggleButton value="package">Package</ToggleButton>
      </ToggleButtonGroup>

      {/* option */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
        {filteredOptions.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          return (
            <Box
              key={opt.id}
              onClick={() => setSelectedOptionId(opt.id)}
              sx={{
                cursor: "pointer",
                flex: "1 1 calc(33.333% - 16px)",
                border: "2px solid",
                borderColor: isSelected ? "primary.main" : "grey.300",
                borderRadius: 2,
                p: 2,
                transition: "0.3s",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography fontSize={20}>{opt.icon}</Typography>
                  <Typography>{opt.label}</Typography>
                </Box>
                <Typography fontWeight={600} color="primary">
                  Rp{opt.price.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>

      <TextField
        label="Kode Voucher (Opsional)"
        fullWidth
        value={voucherCode}
        onChange={(e) => setVoucherCode(e.target.value)}
        sx={{ mb: 2 }}
      />

      {selectedOption && (
        <Typography fontWeight={500} mb={2}>
          Total Harga:{" "}
          <strong>Rp{selectedOption.price.toLocaleString()}</strong>
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={!selectedOption || isLoading}
      >
        {isLoading ? "Memproses..." : "Order Sekarang"}
      </Button>

      {/* Snackbar feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VoucherForm;
