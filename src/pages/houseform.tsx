import { useAuthContext } from "@/context/AuthContext";
import { addHouse } from "@/services/useGetHousesData";
import { addImages } from "@/services/useGetHousesImages";

import { useRouter } from "next/router";
import React, { useState } from "react";
import { uuid } from "uuidv4";

export default function HouseForm() {
  const [file, setFile] = useState<File | Blob>();

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
      addImages(file, id);
    } else {
      router.push("/login");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log(event.target.files[0]);
      setFile(event.target.files[0]);
    }
  };

  const handleInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    setInputs({ ...inputs, [name]: value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Image:</label>
        <input
          name="image"
          type="file"
          accept="image/*"
          multiple={true}
          onChange={handleImageChange}
        />
        <label>Title:</label>
        <input
          name="title"
          value={inputs.title}
          type="text"
          onChange={handleInputs}
        />

        <label>Description:</label>
        <input
          name="description"
          value={inputs.description}
          type="text"
          onChange={handleInputs}
        />
        <label>Location:</label>
        <input
          name="location"
          value={inputs.location}
          type="text"
          onChange={handleInputs}
        />
        <label>Phone:</label>
        <input
          name="phone"
          value={inputs.phone}
          type="number"
          onChange={handleInputs}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
