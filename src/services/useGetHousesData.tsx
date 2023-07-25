import React, { useEffect, useState } from "react";
import db, { storage } from "./config";
import {
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  collection,
  DocumentData,
} from "firebase/firestore";
import { HouseType } from "@/types/HouseType";

const colletionRef = collection(db, "houses");
export const useGetData = () => {
  const [houses, setHouses] = useState<DocumentData>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const unsub = onSnapshot(colletionRef, (querySnapshot) => {
      const items: DocumentData = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setHouses(items);
      setLoading(false);
    });
    return () => {
      unsub();
    };
  }, []);
  return { houses, loading };
};

export const addHouse = async (data: HouseType) => {
  try {
    const houseRef = doc(colletionRef, data.id);
    await setDoc(houseRef, data);
  } catch (error) {
    console.error(error);
  }
};

export const deleteHouse = async (dataId: string) => {
  try {
    const houseRef = doc(colletionRef, dataId);
    await deleteDoc(houseRef);
  } catch (error) {
    console.error(error);
  }
};
