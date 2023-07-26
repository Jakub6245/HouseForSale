import Navigation from "@/components/Navigation/Navigation";
import { useAuthContext } from "@/context/AuthContext";
import { addHouse } from "@/services/useGetHousesData";
import { addImages } from "@/services/useGetHousesImages";
import styles from "../styles/pagesStyle/houseform.module.scss";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { uuid } from "uuidv4";

export default function HouseForm() {
  const [file, setFile] = useState<FileList | Blob[]>([]);

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    location: "",
    phone: "",
  });
  const router = useRouter();
  const ctx = useAuthContext();
  console.log(ctx);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const id = uuid();
    if (ctx.currentUser) {
      addHouse({ ...inputs, email: ctx.currentUser?.email, id });
      if (!file) return;
      console.log(file);
      addImages(file, id);
      router.push("/");
    } else {
      router.push("/login");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log(event.target.files);
      setFile(event.target.files);
    }
  };

  const handleInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    setInputs({ ...inputs, [name]: value });
  };
  return (
    <div className={styles.houseform}>
      <Navigation />
      <div className={styles.houseform__container}>
        <form className={styles.houseform__form} onSubmit={handleSubmit}>
          <label>Image:</label>
          <input
            className={styles.houseform__file}
            name="image"
            type="file"
            required
            accept="image/*"
            multiple={true}
            onChange={handleImageChange}
          />
          <label>Title:</label>
          <input
            className={styles.houseform__input}
            name="title"
            required
            value={inputs.title}
            type="text"
            onChange={handleInputs}
          />

          <label>Description:</label>
          <input
            className={styles.houseform__input}
            name="description"
            required
            value={inputs.description}
            type="text"
            onChange={handleInputs}
          />
          <label>Location:</label>
          <input
            className={styles.houseform__input}
            name="location"
            required
            value={inputs.location}
            type="text"
            onChange={handleInputs}
          />
          <label>Phone:</label>
          <input
            className={styles.houseform__input}
            name="phone"
            required
            value={inputs.phone}
            type="text"
            onChange={handleInputs}
          />
          <input className={styles.houseform__submit} type="submit" />
        </form>
      </div>
    </div>
  );
}
