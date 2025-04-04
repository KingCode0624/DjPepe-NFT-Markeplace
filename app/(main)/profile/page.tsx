"use client";
import Image from "next/image";
import { Tabs, Tab, BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useDisclosure } from "@nextui-org/react";
import { useMediaQuery, useTheme } from "@mui/material";

import NFTModal from "@/lib/components/modal/NFTModal";
import { CopyLink } from "@/lib/components/profile/profile-kit/ProfileHeader";
import TabNFT from "./tabs/TabNFT";
import TabListed from "./tabs/TabList";

import type { NFTData } from "./tabs/TabNFT";
import Backbutton from "@/lib/components/button/Backbutton";

const ProfilePage = () => {
  const theme = useTheme();
  const screenSize = {
    isSmall: useMediaQuery(theme.breakpoints.down("md")),
    isMedium: useMediaQuery(theme.breakpoints.between("md", "xl")),
    isLarge: useMediaQuery(theme.breakpoints.up("xl")),
  };

  const { address } = useAccount();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [selectedData, setSelectedData] = useState<NFTData>();
  const [modalType, setModalType] = useState<"list" | "delist">("list");

  return (
    <div className="main-pt relative px-4">
      <Breadcrumbs
        separator=">>"
        itemClasses={{
          separator: "px-2",
        }}
        className="my-6"
      >
        <BreadcrumbItem href="https://djpepe.rocks/">Home</BreadcrumbItem>
        <BreadcrumbItem>My NFTs</BreadcrumbItem>
      </Breadcrumbs>
      <Backbutton className="absolute top-36 right-10 z-10" />
      <div className="container">
        <div className="flex flex-col items-center gap-6 pt-16">
          <Image src="/profile.png" width={200} height={200} alt="Avatar" />
          <CopyLink url={address as string} className="text-lg" />
        </div>
        <div className="flex justify-center">
          <div className="w-full flex flex-col items-center">
            <Tabs
              classNames={{
                tabList: "mx-4 mt-6 text-medium bg-white/5 py-2",
                tabContent: "text-large",
              }}
              size="lg"
            >
              <Tab
                key="nft"
                textValue="NFTs"
                title={
                  <div className="flex items-center gap-1.5">
                    <Icon icon="ri:nft-line" width={20} />
                    <p>NFTs</p>
                  </div>
                }
              >
                <TabNFT
                  setModalType={setModalType}
                  setSelected={setSelectedData}
                  open={onOpen}
                  cols={screenSize.isLarge ? 4 : screenSize.isMedium ? 3 : 2}
                />
              </Tab>
              <Tab
                key="list"
                textValue="Listing"
                title={
                  <div className="flex items-center gap-1.5">
                    <Icon icon="gg:list" width={20} />
                    <p>Listing</p>
                  </div>
                }
              >
                <TabListed
                  setModalType={setModalType}
                  setSelected={setSelectedData}
                  open={onOpen}
                  cols={screenSize.isLarge ? 4 : screenSize.isMedium ? 3 : 2}
                />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
      <NFTModal
        type={modalType}
        isOpen={isOpen}
        onClose={onClose}
        data={selectedData}
      />
    </div>
  );
};

export default ProfilePage;
