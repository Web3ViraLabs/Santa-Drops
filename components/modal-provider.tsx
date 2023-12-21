"use client";

import { useEffect, useState } from "react";
import ProfileDrawer from "./modals/profile-drawer";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ProfileDrawer />
    </>
  );
};
