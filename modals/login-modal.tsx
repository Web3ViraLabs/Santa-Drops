"use client";

import { Dialog, Transition } from "@headlessui/react";
import { useModal } from "@/hooks/use-modal";
import { X } from "lucide-react";
import { Fragment } from "react";
import useLoginStore from "../hooks/login-store";
import Login from "@/components/connect/authenticate";

const LoginModal = () => {
  const { isOpen, onClose, type } = useModal();
  const { reset } = useLoginStore();

  const handleClose = () => {
    reset();
    onClose();
  };

  const isModalOpen = isOpen && type === "login";
  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden backdrop-blur-md">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 flex items-center justify-center max-w-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
              <Transition.Child
                as={Fragment}
                enter="transition-transform duration-200 ease-out"
                enterFrom="scale-0"
                enterTo="scale-100"
                leave="transition-transform duration-200 ease-in"
                leaveFrom="scale-100"
                leaveTo="scale-0"
              >
                <Dialog.Panel className="relative pointer-events-auto w-screen max-w-xl  bg-transparent flex items-center justify-center">
                  <button
                    aria-label="close"
                    onClick={handleClose}
                    className="absolute bg-white right-2 top-0 focus:ring-1"
                  >
                    <X />
                    <span className="sr-only">Close Drawer</span>
                  </button>
                  <Login />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LoginModal;
