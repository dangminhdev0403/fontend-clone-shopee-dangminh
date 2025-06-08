import { Box, IconButton, InputBase } from "@mui/material";
import { useState } from "react";

export default function QuantityInput({ max }: { max?: number }) {
  const [quantity, setQuantity] = useState(1);

  const handleChange = (value: number) => {
    if (value < 1) return;
    if (max && value > max) return;
    setQuantity(value);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      border={1}
      borderColor="grey.300"
      borderRadius={1}
      height={32}
    >
      <IconButton
        size="small"
        onClick={() => handleChange(quantity - 1)}
        sx={{
          borderRight: "1px solid #ccc",
          borderRadius: 0,
          width: 32,
          height: 32,
        }}
      >
        –
      </IconButton>

      <InputBase
        value={quantity}
        onChange={(e) => {
          const value = parseInt(e.target.value) || 1;
          handleChange(value);
        }}
        slotProps={{
          input: {
            style: {
              textAlign: "center",
              padding: 0,
              fontSize: 16,
              width: 80,
            },
          },
        }}
        sx={{
          "& .MuiInputBase-root": {
            justifyContent: "center",
            textAlign: "center",
          },
        }}
      />

      <IconButton
        size="small"
        onClick={() => handleChange(quantity + 1)}
        sx={{
          borderLeft: "1px solid #ccc",
          borderRadius: 0,
          width: 32,
          height: 32,
        }}
      >
        +
      </IconButton>
    </Box>
  );
}
