import React, { useState } from "react";
import styles from "./HouseCard.module.scss";
import { HouseType } from "@/types/HouseType";
import HouseImage from "../houseImage/HouseImage";
import { useGetImagesUrls } from "@/services/useGetHousesImages";

export default function HouseCard({ data }: { data: HouseType }) {
  const images = useGetImagesUrls();
  const [currImg, setCurrImg] = useState(0);
  const filteredImages = images.filter((img) => img.includes(data.id));
  const handlePrevImg = () => setCurrImg((prev) => (prev > 0 ? prev - 1 : 0));
  const handleNextImg = () =>
    setCurrImg((prev) =>
      prev < filteredImages.length - 1 ? prev + 1 : filteredImages.length - 1
    );
  console.log(currImg);
  console.log(filteredImages);
  return (
    <div className={styles.house__card}>
      <div className={styles.house__card__img__container}>
        {filteredImages.length > 1 && (
          <button
            className={styles.house__card__button__left}
            onClick={handlePrevImg}
          >
            Back
          </button>
        )}

        {images ? (
          <HouseImage srcUrl={filteredImages[currImg]} />
        ) : (
          "Loading..."
        )}
        {filteredImages.length > 1 && (
          <button
            className={styles.house__card__button__right}
            onClick={handleNextImg}
          >
            Next
          </button>
        )}
      </div>
      <h2>{data.title}</h2>
      <p>Location: {data.location}</p>
      <p>Phone number: {data.phone}</p>
      <p>Email: {data.email}</p>
      <p>{data.description}</p>
    </div>
  );
}
