// import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
// import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect, ChangeEvent, FormEvent } from "react";
// import { voucherData, GameVoucher } from "../../data/VoucherData";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";

// const EditProductPage = () => {
//   const { gameName } = useParams();
//   const navigate = useNavigate();
//   const [voucher, setVoucher] = useState<GameVoucher | null>(null);

//   useEffect(() => {
//     const data = voucherData.find((item) => item.name === gameName);
//     if (data) {
//       setVoucher(JSON.parse(JSON.stringify(data)));
//     }
//   }, [gameName]);

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     path: string
//   ) => {
//     if (!voucher) return;

//     const [section, index, field] = path.split(".");
//     const updated: GameVoucher = JSON.parse(JSON.stringify(voucher));

//     if (section === "inputs" && index !== undefined && field) {
//       updated.inputs[+index] = {
//         ...updated.inputs[+index],
//         [field]: e.target.value,
//       };
//     } else if (section === "options" && index !== undefined && field) {
//       updated.options[+index] = {
//         ...updated.options[+index],
//         [field]: field === "price" ? Number(e.target.value) : e.target.value,
//       };
//     } else if (!index && !field) {
//       if (section === "id") updated.id = e.target.value;
//       else if (section === "name") updated.name = e.target.value;
//       else if (section === "image") updated.image = e.target.value;
//       else if (section === "description") updated.description = e.target.value;
//     }

//     setVoucher(updated);
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     console.log("Updated Voucher:", voucher);
//     navigate("/dashboard/products");
//   };

//   const handleAddInput = () => {
//     if (!voucher) return;
//     setVoucher({
//       ...voucher,
//       inputs: [...voucher.inputs, { label: "", name: "" }],
//     });
//   };

//   const handleRemoveInput = (index: number) => {
//     if (!voucher) return;
//     const newInputs = voucher.inputs.filter((_, i) => i !== index);
//     setVoucher({ ...voucher, inputs: newInputs });
//   };

//   const handleAddOption = () => {
//     if (!voucher) return;
//     setVoucher({
//       ...voucher,
//       options: [
//         ...voucher.options,
//         { label: "", icon: "", price: 0, type: "" },
//       ],
//     });
//   };

//   const handleRemoveOption = (index: number) => {
//     if (!voucher) return;
//     const newOptions = voucher.options.filter((_, i) => i !== index);
//     setVoucher({ ...voucher, options: newOptions });
//   };

//   if (!voucher) return <Typography>Loading...</Typography>;

//   return (
//     <Box component="form" onSubmit={handleSubmit}>
//       {/* Header */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={3}
//       >
//         <Typography variant="h5">Edit Voucher - {voucher.name}</Typography>
//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           mb={3}
//           sx={{ display: { xs: "none", sm: "flex" } }} // Sembunyikan di mobile
//         >
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             sx={{ borderRadius: 2, textTransform: "none", px: 3 }}
//           >
//             Update Produk
//           </Button>
//         </Box>
//       </Box>

//       {/* General Info */}
//       <TextField
//         label="ID"
//         fullWidth
//         margin="normal"
//         value={voucher.id}
//         onChange={(e) => handleChange(e, "id")}
//       />
//       <TextField
//         label="Name"
//         fullWidth
//         margin="normal"
//         value={voucher.name}
//         onChange={(e) => handleChange(e, "name")}
//       />
//       <TextField
//         label="Image URL"
//         fullWidth
//         margin="normal"
//         value={voucher.image}
//         onChange={(e) => handleChange(e, "image")}
//       />
//       <TextField
//         label="Description"
//         fullWidth
//         multiline
//         rows={3}
//         margin="normal"
//         value={voucher.description}
//         onChange={(e) => handleChange(e, "description")}
//       />

//       {/* Inputs Section */}
//       <Box mt={4}>
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography fontWeight={600}>Inputs</Typography>
//           <Button size="small" onClick={handleAddInput} startIcon={<AddIcon />}>
//             Tambah Input
//           </Button>
//         </Box>
//         {voucher.inputs.map((input, index) => (
//           <Box
//             key={index}
//             display="flex"
//             flexDirection={{ xs: "column", sm: "row" }}
//             gap={2}
//             mt={1}
//           >
//             <TextField
//               label="Label"
//               fullWidth
//               value={input.label}
//               onChange={(e) => handleChange(e, `inputs.${index}.label`)}
//             />
//             <TextField
//               label="Name"
//               fullWidth
//               value={input.name}
//               onChange={(e) => handleChange(e, `inputs.${index}.name`)}
//             />
//             <IconButton onClick={() => handleRemoveInput(index)} color="error">
//               <DeleteIcon />
//             </IconButton>
//           </Box>
//         ))}
//       </Box>

//       {/* Options Section */}
//       <Box mt={4}>
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography fontWeight={600}>Options</Typography>
//           <Button
//             size="small"
//             onClick={handleAddOption}
//             startIcon={<AddIcon />}
//           >
//             Tambah Option
//           </Button>
//         </Box>
//         {voucher.options.map((option, index) => (
//           <Box
//             key={index}
//             display="flex"
//             flexDirection={{ xs: "column", sm: "row" }}
//             gap={2}
//             mt={1}
//           >
//             <TextField
//               label="Label"
//               fullWidth
//               value={option.label}
//               onChange={(e) => handleChange(e, `options.${index}.label`)}
//             />
//             <TextField
//               label="Icon"
//               fullWidth
//               value={option.icon}
//               onChange={(e) => handleChange(e, `options.${index}.icon`)}
//             />
//             <TextField
//               label="Price"
//               type="number"
//               fullWidth
//               value={option.price}
//               onChange={(e) => handleChange(e, `options.${index}.price`)}
//             />
//             <TextField
//               label="Type"
//               fullWidth
//               value={option.type}
//               onChange={(e) => handleChange(e, `options.${index}.type`)}
//             />
//             <IconButton onClick={() => handleRemoveOption(index)} color="error">
//               <DeleteIcon />
//             </IconButton>
//             {/* Fixed Update Button for Mobile */}
//             <Box
//               sx={{
//                 position: "fixed",
//                 bottom: 0,
//                 left: 0,
//                 right: 0,
//                 p: 2,
//                 backgroundColor: "#fff",
//                 borderTop: "1px solid #ddd",
//                 display: { xs: "flex", sm: "none" },
//                 zIndex: 1000,
//               }}
//             >
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 sx={{ borderRadius: 2, textTransform: "none", py: 1.5 }}
//               >
//                 Update Produk
//               </Button>
//             </Box>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default EditProductPage;

import { Box } from "@mui/material";

const EditProductPage = () => {
  return <Box component="form">EditProductPage</Box>;
};

export default EditProductPage;
