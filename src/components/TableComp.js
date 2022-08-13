import {
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Grid,
  TextField,
  InputAdornment,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
const TableComp = ({
  tableHeader = [],
  array = [],
  option = [],
  body,
  header,
  setSearchValue,
  setter,
  filter,
  setFilter,
}) => {
  const [sort, setSort] = useState(false);
  const onClickSort = () => {
    if (sort) {
      setter([...array].sort((a, b) => (a.fieldName > b.fieldName ? 1 : -1)));
      console.log(
        "az",
        [...array].sort((a, b) => (a.fieldName > b.fieldName ? 1 : -1))
      );
    } else {
      setter([...array].sort((a, b) => (a.fieldName > b.fieldName ? 1 : -1)));
      console.log(
        "za",
        [...array].sort((a, b) => (a.fieldName > b.fieldName ? 1 : -1))
      );
    }
  };

  useEffect(() => {
    onClickSort();
  }, [sort]);

  return (
    <Box>
      <Card>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            m: -1,
            p: 2,
          }}
        >
          <Grid container justifyContent="flex-start" alignItems="flex-start">
            <Grid item>
              <TextField
                variant="outlined"
                size="large"
                onChange={(e) => setSearchValue(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item sx={{ width: "270px", pl: 1 }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-label">Cinsiyet</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filter}
                  fullWidth
                  onChange={(e) => setFilter(e.target.value)}
                  label="Cinsiyet"
                >
                  {option.map((itm) => (
                    <MenuItem value={itm}>{itm}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <TableContainer component={Paper}>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeader.map((item, index) => (
                    <TableCell>
                      <Grid container>
                        <Typography
                          sx={{ fontWeight: 500, alignSelf: "center" }}
                        >
                          {item.name}
                        </Typography>
                        {item.sort && (
                          <IconButton onClick={() => setSort((prev) => !prev)}>
                            <SortByAlphaIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Grid>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {array &&
                  Object.keys(array).length > 0 &&
                  array?.map((item, index) => (
                    <TableRow hover>{body(item, index)}</TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default TableComp;
