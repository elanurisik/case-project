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
  ListItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
const TableComp = ({
  tableHeader = [],
  array = [],
  body,
  header,
  setSearchValue,
}) => {
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
          <Grid container>
            <Grid
              item
              mr={-1}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <ListItem>
                <TextField
                  margin="normal"
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
              </ListItem>
            </Grid>
          </Grid>
        </Box>
        <TableContainer component={Paper}>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeader.map((item, index) => (
                    <TableCell>{item}</TableCell>
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
