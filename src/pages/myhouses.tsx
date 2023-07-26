import HouseCard from "@/components/HouseCard/HouseCard";
import Navigation from "@/components/Navigation/Navigation";
import { useAuthContext } from "@/context/AuthContext";
import { deleteHouse, useGetData } from "@/services/useGetHousesData";
import { deleteImages, useGetImagesUrls } from "@/services/useGetHousesImages";
import { HouseType } from "@/types/HouseType";
import React from "react";
import styles from "../styles/pagesStyle/myhouses.module.scss";

const handleBtnDelete = (images: string[], houseId: string) => {
  deleteHouse(houseId);
  deleteImages(images);
};

export default function MyHouses() {
  const { houses, loading } = useGetData();
  const { currentUser } = useAuthContext();
  const images = useGetImagesUrls();
  const filterHouses: HouseType[] = houses.filter(
    (el: HouseType) => el.email === currentUser?.email
  );

  return (
    <div className={styles.myhouses}>
      <Navigation />
      <div className={styles.myhouses__container}>
        {filterHouses.length === 0 ? <p>You havent add any offer</p> : ""}
        {filterHouses.map((el, i) => (
          <div key={i}>
            <HouseCard data={el} />
            <button
              className={styles.myhouses__button}
              onClick={() => handleBtnDelete(images, el.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
