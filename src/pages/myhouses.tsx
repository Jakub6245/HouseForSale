import HouseCard from "@/components/HouseCard";
import { useAuthContext } from "@/context/AuthContext";
import { deleteHouse, useGetData } from "@/services/useGetHousesData";
import { deleteImages } from "@/services/useGetHousesImages";
import { HouseType } from "@/types/HouseType";
import React from "react";

const handleBtnDelete = (houseId: string) => {
  deleteHouse(houseId);
  deleteImages(houseId);
};

export default function MyHouses() {
  const { houses, loading } = useGetData();
  const { currentUser } = useAuthContext();
  const filterHouses: HouseType[] = houses.filter(
    (el: HouseType) => el.email === currentUser?.email
  );
  return (
    <div>
      {loading ? <p>...Loading</p> : ""}
      {filterHouses.map((el, i) => (
        <div key={i}>
          <HouseCard data={el} />
          <button onClick={() => handleBtnDelete(el.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
