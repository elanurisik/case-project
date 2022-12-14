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
  const [copyData, setCopyData] = useState([]);
  const [gender, setGender] = useState("Tümü");
  const head = [
    { name: "" },
    { name: "Ad", sort: true },
    { name: "Cinsiyet" },
    { name: "E-Posta" },
    { name: "Telefon No" },
    { name: "" },
  ];
  useEffect(() => {
    if (gender === "Tümü") {
      setCopyData(userData);
    } else {
      setCopyData(userData?.filter((item) => item.gender === gender));
    }
  }, [gender, userData]);

  const filtered = copyData?.filter((entry) =>
    Object.values(entry || {})?.some(
      (val) =>
        typeof val === "string" &&
        val.toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  useEffect(() => {
    fetch("https://62cf30a0486b6ce82653e89a.mockapi.io/userList")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        // setCopyData(data);
      });
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
        const copyArray = [...userData];
        setUserData(copyArray?.filter((item) => item.id !== id));
      });
  };

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
        setter={setUserData}
        setSearchValue={setSearchValue}
        fieldName="fullName"
        option={["Kadın", "Erkek", "Tümü"]}
        setFilter={setGender}
        filter={gender}
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
          userData={userData}
          selectedItem={selectedItem}
        />
      )}
    </Container>
  );
};

export default Users;
