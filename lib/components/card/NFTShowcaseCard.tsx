"use client";

import { Card, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { useState, type FC } from "react";

type Props = {
  asset: string;
  nftId?: number;
};

const NFTShowcaseCard: FC<Props> = ({ asset, nftId }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="flex justify-center items-center border-none p-2 bg-white/5 "
    >
      <Image
        alt="Woman listing to music"
        src={asset}
        isZoomed
        className="hover:cursor-pointer w-[300px] aspect-square"
        onClick={() => router.push(`/nft/${nftId}`)}
        onLoad={() => setLoading(true)}
      />
    </Card>
  );
};

export default NFTShowcaseCard;
