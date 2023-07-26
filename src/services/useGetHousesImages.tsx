import { storage } from "./config";

import { useState, useEffect } from "react";

import { ref, getDownloadURL, listAll } from "firebase/storage";

const addImages = (images: FileList | Blob[], houseId: string) => {
  const upload = () => {
    for (let i = 0; i < images.length; i++) {
      const imageRef = storage
        .ref(`images/${houseId}-${images[i].name}`)
        .put(images[i])
        .on("state_changed", () => alert("success"));
      imageRef();
    }
  };
  upload();
};

const deleteImages = (images: string[]) => {
  console.log(images);
  for (let i = 0; i < images.length; i++) {
    const imageRef = storage.refFromURL(images[i]);

    imageRef
      .delete()
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }
};

const useGetImagesUrls = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const imagesListRef = ref(storage, `images/`);
  const arrWithoutDuplicates = imageUrls.filter(
    (value, index, array) => array.indexOf(value) === index
  );
  console.log(imageUrls);
  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  return arrWithoutDuplicates;
};

export { addImages, useGetImagesUrls, deleteImages };
