import { storage } from "./config";

import { useState, useEffect } from "react";

import { ref, getDownloadURL, listAll, deleteObject } from "firebase/storage";

const addImages = (image: File | Blob, houseId: string) => {
  const upload = () => {
    const imageRef = storage
      .ref(`images/${houseId}`)
      .put(image)
      .on("state_changed", () => alert("success"));
    imageRef();
  };
  upload();
};

const deleteImages = (imageId: string) => {
  const imageRef = ref(storage, `images/${imageId}`);
  deleteObject(imageRef);
};

const useGetImages = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const imagesListRef = ref(storage, "images/");

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  return imageUrls;
};

export { addImages, useGetImages, deleteImages };
