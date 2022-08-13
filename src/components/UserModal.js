import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import NumberFormat from "react-number-format";
import CloseIcon from "@mui/icons-material/Close";
import EmailComp from "./EmailComp";
const UserModal = ({
  open,
  handleClose,
  title = "",
  setter,
  isUpdate,
  setUserData,
  userData,
  selectedItem,
}) => {
  const [fullName, setFullName] = useState(selectedItem?.fullName);
  const [gender, setGender] = useState(selectedItem?.gender);
  const [email, setEmail] = useState(selectedItem?.email);
  const [errorEmailText, setErrorEmailText] = useState("");
  const [phones, setPhones] = useState(
    selectedItem?.phones || [{ number: "" }]
  );

  function reqBody() {
    let obj = {};
    if (fullName) obj = { ...obj, fullName };
    if (email) obj = { ...obj, email };
    if (gender) obj = { ...obj, gender };
    if (selectedItem?.id) obj = { ...obj, id: selectedItem?.id };
    if (phones.length > 0) obj = { ...obj, phones };
    return obj;
  }
  const getList = () => {
    fetch("https://62cf30a0486b6ce82653e89a.mockapi.io/userList")
      .then((response) => response.json())
      .then((data) => setUserData(data));
  };
  const handleEdit = (body) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(body),
      redirect: "follow",
    };

    fetch(
      `https://62cf30a0486b6ce82653e89a.mockapi.io/userList/${selectedItem?.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        // const copyArray = [...userData];
        // const foundedIndex = copyArray.findIndex(
        //   (itm) => itm.id === selectedItem?.id
        // );
        // copyArray[foundedIndex] = data;
        // setUserData(copyArray);
        getList();
      });
  };
  const handleAdd = (body) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body),
      redirect: "follow",
    };

    fetch(
      `https://62cf30a0486b6ce82653e89a.mockapi.io/userList`,
      requestOptions
    )
      .then((response) => {
        response.json();
        console.log(response);
      })
      .then((data) => {
        console.log("first", data);
        // let copyArray = [...userData];
        // copyArray = [...copyArray, data];
        // setUserData(copyArray);
        getList();
      });
  };

  function handleChangePhone({ index, event }) {
    const backupArray = [...phones];
    backupArray[index].number = event.target.value;
    setPhones(backupArray);
  }

  function handleRemovePhone({ index }) {
    if (phones.length > 1) {
      if (phones[index].number.length > 0) {
        const backupArray = [...phones];
        backupArray[index].number = "";
        setPhones(backupArray);
      } else {
        phones.splice(index, 1);
        setPhones([...phones]);
      }
    } else setPhones([{ number: "" }]);
  }
  function handleDeletePhone({ index }) {
    if (phones.length > 1) {
      phones.splice(index, 1);

      setPhones([...phones]);
    } else {
      setPhones([{ number: "" }]);
    }
  }
  const phoneLabel = ({ item, index }) => (
    <Box sx={{ pt: 1 }}>
      <Grid container>
        <Grid
          item
          sm={
            (item.number.length === 0 && index !== 0 && 11) ||
            item.number.length > 0
              ? 11
              : 12
          }
          xs={item.number.length > 0 ? 11 : 12}
        >
          <NumberFormat
            format="(###)###-####"
            mask="_"
            customInput={TextField}
            value={item.number}
            onChange={(e) => handleChangePhone({ event: e, index })}
            fullWidth
            label="Telefon"
            name="name"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => {
                    handleRemovePhone({ index });
                  }}
                >
                  {item.number.length > 0 && <CloseIcon fontSize="small" />}
                </IconButton>
              ),
              autoComplete: "off",
            }}
          />
        </Grid>
        {item.number.length > 0 && (
          <Grid
            item
            xs={1}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <IconButton
              onClick={() => {
                setPhones([...phones, { number: "" }]);
              }}
            >
              <AddCircleOutlineIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => {
                handleDeletePhone({ index });
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </Box>
  );
  const style = {
    "& .MuiDialog-container > div": {
      width: "400px",
      height: "500px",

      "& .css-m1b0vd-MuiDialogTitle-root": {
        padding: "16px 24px 0px",
      },
      "& .css-1y6f8wu-MuiDialogContent-root": {
        "& .css-wffnfh": {
          padding: "0px 24px",
        },
      },
    },
  };
  return (
    <Box sx={{ p: 3 }}>
      <Dialog open={open} sx={style} onClose={() => setter(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item sx={{ mt: 2 }}>
              <TextField
                label="Ad Soyad"
                fullWidth
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Grid>
            <Grid item>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-label">Cinsiyet</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  fullWidth
                  onChange={(e) => setGender(e.target.value)}
                  label="Cinsiyet"
                >
                  <MenuItem value="Kadın">Kadın</MenuItem>
                  <MenuItem value="Erkek">Erkek</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <EmailComp
                variant="outlined"
                email={email}
                setEmail={setEmail}
                errorEmailText={errorEmailText}
                setErrorEmailText={setErrorEmailText}
              />
            </Grid>
            <Grid item>
              {phones?.map((item, index) => phoneLabel({ item, index }))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: "white",
              color: "#001D6E",
              borderColor: "#001D6E",
            }}
            onClick={() => setter(false)}
          >
            İptal
          </Button>
          <Button
            variant="outlined"
            sx={{ backgroundColor: "#001D6E", color: "white" }}
            onClick={() => {
              if (isUpdate) handleEdit(reqBody());
              else handleAdd(reqBody());
              setter(false);
            }}
          >
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserModal;
