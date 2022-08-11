import { Container } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import TableComp from "../components/TableComp";
import Title from "../components/Title";
import UserList from "../components/UserList";
import UserModal from "../components/UserModal";

const Users = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [userData, setUserData] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [searchValue, setSearchValue] = useState("");
  const head = ["", "Ad", "Soyad", "E-Posta", "Telefon No", ""];
  const filtered = userData?.filter((entry) =>
    Object.values(entry || {})?.some(
      (val) =>
        typeof val === "string" &&
        val.toLowerCase().includes(searchValue.toLowerCase())
    )
  );
  useEffect(() => {
    fetch("https://62cf30a0486b6ce82653e89a.mockapi.io/userList")
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, []);

  const handleDelete = (id) => {
    const myHeaders = new Headers();
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://62cf30a0486b6ce82653e89a.mockapi.io/userList/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const copyArray = [...filtered];
        setUserData(copyArray?.filter((item) => item.id !== id));
      });
  };
  console.log("selectedItem", selectedItem);
  return (
    <Container>
      <Title
        title="Kullanıcılar"
        buttonText="Yeni"
        OnClickAdd={() => {
          setOpenModal(true);
          setIsUpdate(false);
          setSelectedItem({});
        }}
      />
      <TableComp
        tableHeader={head}
        array={filtered}
        setSearchValue={setSearchValue}
        body={(item, index) => (
          <UserList
            item={item}
            onClickEdit={() => {
              setOpenModal(true);
              setIsUpdate(true);
              setSelectedItem(item);
            }}
            onClickDelete={handleDelete}
          />
        )}
      />
      {openModal && (
        <UserModal
          open={openModal}
          title={isUpdate ? "Kullanıcı Bilgilerini Düzenle" : "Kullanıcı Ekle"}
          setter={setOpenModal}
          isUpdate={isUpdate}
          setUserData={setUserData}
          userData={filtered}
          selectedItem={selectedItem}
        />
      )}
    </Container>
  );
};

export default Users;
