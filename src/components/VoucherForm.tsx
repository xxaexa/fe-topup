import { useState } from "react";
import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  TextField,
} from "@mui/material";
import { GameVoucher } from "../data/VoucherData";

interface VoucherFormProps {
  game: GameVoucher;
}

const VoucherForm = ({ game }: VoucherFormProps) => {
  const [selectedType, setSelectedType] = useState<"package" | "satuan">(
    "package"
  );
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});

  const filteredOptions = game.options.filter(
    (opt) => opt.type === selectedType
  );

  const selectedOption = filteredOptions.find(
    (opt) => opt.id === selectedOptionId
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: false })); // Reset error saat diketik
  };

  const handleSubmit = (e: React.FormEvent) => {
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

    const payload = {
      game: game.name,
      type: selectedType,
      selectedOption,
      voucherCode,
      inputs: formValues,
    };

    console.log("Form Submitted:", payload);
    alert("Pesanan berhasil dikirim!");
  };

  return (
    <Box
      maxWidth={700}
      mx="auto"
      p={2}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" fontWeight={600} mb={2}>
        {game.name}
      </Typography>

      <ToggleButtonGroup
        value={selectedType}
        exclusive
        onChange={(e, value) => value && setSelectedType(value)}
        sx={{ mb: 3 }}
      >
        <ToggleButton value="package">Package</ToggleButton>
        <ToggleButton value="satuan">Satuan</ToggleButton>
      </ToggleButtonGroup>

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
        disabled={!selectedOption}
      >
        Order Sekarang
      </Button>
    </Box>
  );
};

export default VoucherForm;
