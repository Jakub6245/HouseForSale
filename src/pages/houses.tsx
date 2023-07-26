import React from "react";
import styles from "../styles/pagesStyle/houses.module.scss";
import { useGetData } from "@/services/useGetHousesData";
import HouseCard from "@/components/HouseCard/HouseCard";
import { HouseType } from "@/types/HouseType";

export default function Houses() {
  const { houses, loading } = useGetData();

  return (
    <div className={styles.houses__container}>
      {loading ? <p>...Loading</p> : ""}
      {houses.map((el: HouseType, i: number) => (
        <HouseCard data={el} key={i} />
      ))}
    </div>
  );
}
