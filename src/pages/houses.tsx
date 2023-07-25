import React from "react";

import { useGetData } from "@/services/useGetHousesData";
import HouseCard from "@/components/HouseCard";
import { HouseType } from "@/types/HouseType";

export default function Houses() {
  const { houses, loading } = useGetData();

  return (
    <div>
      {loading ? <p>...Loading</p> : ""}
      {houses.map((el: HouseType, i: number) => (
        <HouseCard data={el} key={i} />
      ))}
    </div>
  );
}
