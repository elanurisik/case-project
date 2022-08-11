import { TableCell, Avatar, IconButton, Grid } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const UserList = ({ item, onClickEdit, onClickDelete }) => {
  return (
    <>
      <TableCell>
        <Avatar src={item?.avatar}></Avatar>
      </TableCell>
      <TableCell>{item?.name}</TableCell>
      <TableCell>{item?.surname}</TableCell>

      <TableCell>{item?.email}</TableCell>
      <TableCell>
        <Grid container direction="column">
          {item?.phones?.map((item) => (
            <Grid item> {item.number}</Grid>
          ))}
        </Grid>
      </TableCell>
      <TableCell>
        <IconButton sx={{ p: 0 }} onClick={onClickEdit}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton sx={{ p: 0 }} onClick={() => onClickDelete(item?.id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </>
  );
};

export default UserList;
