import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

const SortDropdown = ({ sortOption, handleSortChange, options }) => {
  return (
    <FormControl sx={{ minWidth: 120 }}>
      <Select
        labelId="sort-select-label"
        id="sort-select"
        value={sortOption || "created_at-desc"} // Default to "new to old"
        onChange={handleSortChange}
        autoWidth
        sx={{ fontFamily: "Amiri serif", fontSize: "14px", color: "#333" }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{ fontFamily: "Amiri serif", fontSize: "14px", color: "#333" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortDropdown;
