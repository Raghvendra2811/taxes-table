import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import { formatDateToShortMonth } from "./utils";
import { useUpdateTaxMutation } from "../app/taxSlice";
import { useState } from "react";

const getChipStyle = (value) => ({
  backgroundColor: value === "male" ? "#FCF2F3" : "#EBF5FB",
  color: value === "male" ? "#BF1A2F" : "#2D7BB9",
  borderRadius: "16px",
  width: "fit-content",
});

const ColumnComponent = ({ row, column, countries }) => {
  const [updateTax] = useUpdateTaxMutation();
  const [country, setCountry] = useState(row.country);
  const value = row[column.valueKey];

  switch (column.columnType) {
    case "text":
      return <Typography sx={{ color: "#5622FF" }}>{value}</Typography>;

    case "chip":
      return (
        <Typography sx={{ ...getChipStyle(value) }} px={1.5} py={0.5}>
          {value}
        </Typography>
      );

    case "date":
      return (
        <Typography sx={{ color: "#41395C" }}>
          {formatDateToShortMonth(value)}
        </Typography>
      );

    case "dropdown":
      const handleChangeCountry = async (event) => {
        const newValue = event.target.value;
        setCountry(newValue);
        await updateTax({ row: { ...row, country: newValue }, id: row.id });
      };

      return (
        <FormControl size="small" sx={{ minWidth: 80 }}>
          <Select
            size="small"
            value={country}
            onChange={handleChangeCountry}
            sx={{
              "& .MuiSelect-select": {
                py: 0.5,
                px: 1,
              },
            }}
          >
            {countries?.map(({ name }) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );

    default:
      return <Typography>{value || "—"}</Typography>;
  }
};

export default ColumnComponent;
