import Image from "next/image";
import React from "react";

import styles from "./HouseImage.module.scss";

export default function HouseImage({ srcUrl }: { srcUrl: string }) {
  return (
    <div className={styles.image__container}>
      <Image src={srcUrl} alt="img" width={600} height={300} />
    </div>
  );
}
