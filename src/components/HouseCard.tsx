import React, { useMemo } from "react";

import { HouseType } from "@/types/HouseType";
import HouseImage from "./HouseImage";
import { useGetImages } from "@/services/useGetHousesImages";

export default function HouseCard({ data }: { data: HouseType }) {
  const images = useGetImages();
  const findHouseImage = useMemo(
    () => images.find((el) => el.includes(data.id)),
    [images, data.id]
  );
  return (
    <div>
      {findHouseImage ? <HouseImage srcUrl={findHouseImage} /> : "Loading..."}
      <h2>{data.title}</h2>
      <p>{data.location}</p>
      <p>{data.description}</p>
      <p>{data.phone}</p>
      <p>{data.email}</p>
    </div>
  );
}
