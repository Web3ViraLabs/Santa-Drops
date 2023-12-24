"use client";

import { useEffect, useState } from "react";
import ProfileDrawer from "../modals/profile-drawer";
import LoginModal from "../login/login-modal";

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
      <LoginModal />
    </>
  );
};
