import { columns, styles } from "./utils";
import ColumnComponent from "./columnComponent";
import {
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import { useGetCountriesQuery, useGetTaxesQuery } from "../app/taxSlice";
import SkeletonComp from "./skeleton";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useEffect, useState } from "react";

const Table = () => {
  const { data: rows, isLoading: isTaxesLoading } = useGetTaxesQuery();
  const { data: countries } = useGetCountriesQuery();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleUpdateRows = (updatedRow, id) => {
    setFilteredRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? updatedRow : row))
    );
  };

  useEffect(() => {
    if (!selectedCountries.length) {
      setFilteredRows(rows || []);
    } else {
      setFilteredRows(
        (rows || []).filter((row) => selectedCountries.includes(row.country))
      );
    }
  }, [rows, selectedCountries]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCountryToggle = (country) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  if (isTaxesLoading) return <SkeletonComp />;
  return (
    <>
      <Grid container>
        {columns.map((column) => (
          <Grid
            key={column.valueKey}
            px={1.5}
            py={2}
            item
            size={column.xsValue}
            sx={styles.headerColumnStyle}
          >
            <Typography sx={{ color: "#706A85", fontWeight: 500 }}>
              {column.displayName}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Grid style={{ maxHeight: "calc(100% - 57px)", overflowY: "auto" }}>
        {filteredRows.map((row) => (
          <Grid key={row.id} container>
            {columns.map((column) => (
              <Grid
                key={column.valueKey}
                p={2}
                item
                size={column.xsValue}
                style={styles.compColumnStyle}
              >
                <ColumnComponent
                  row={row}
                  countries={countries}
                  column={column}
                  handleUpdateRows={handleUpdateRows}
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>

      <FilterAltOutlinedIcon
        onClick={handleClick}
        sx={styles.filterIconStyle}
      />
      <Popover
        id={id}
        sx={styles.popoverStyle}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Grid>
          <List sx={{ minWidth: 200 }}>
            {countries?.map(({ name }) => (
              <ListItem
                sx={styles.popoverItemStyleF}
                key={name}
                dense
                button
                onClick={() => handleCountryToggle(name)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedCountries.includes(name)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": name }}
                  />
                </ListItemIcon>
                <ListItemText id={name} primary={name} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Popover>
    </>
  );
};

export default Table;
