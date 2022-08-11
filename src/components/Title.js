import { Button, Grid, Typography } from "@mui/material";
import React from "react";

const Title = ({ title = "", buttonText = "", OnClickAdd }) => {
  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <Typography sx={{ fontSize: 30, py: 3 }}>{title}</Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={OnClickAdd}>
          {buttonText}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Title;
