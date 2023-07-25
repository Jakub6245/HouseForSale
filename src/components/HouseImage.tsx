import Image from "next/image";
import React from "react";

export default function HouseImage({ srcUrl }: { srcUrl: string }) {
  return (
    <div>
      <Image src={srcUrl} alt="img" width={500} height={500} />
    </div>
  );
}
