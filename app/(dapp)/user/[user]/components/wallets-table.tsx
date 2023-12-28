"use client";

import { Wallet } from "@prisma/client";
import {
  removeProvider,
  unlinkWallet,
} from "../../../settings/actions/actions";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

const WalletTable = ({ wallets }: { wallets: Wallet[] }) => {
  const commonClasses =
    "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white";
  const rowClasses = "bg-main dark:hover:bg-main/70";
  const linkClasses =
    "font-medium text-blue-600 dark:text-blue-500 hover:underline";

  const [clicked, setClicked] = useState({
    id: "",
  });

  const handleUnlink = async (id: string) => {
    const account = await unlinkWallet(id);

    if (!account) {
      return null;
    }

    return account;
  };

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-main dark:text-gray-400">
        <tr>
          <th scope="col" className={commonClasses}>
            Address
          </th>
          <th scope="col" className={commonClasses}>
            Network
          </th>
          <th scope="col" className={commonClasses}>
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {wallets.map((wallet, index) => {
          return (
            <tr key={index} className={rowClasses}>
              <th scope="row" className={cn(commonClasses)}>
                <div className="flex items-center space-x-5">
                  <span className="  px-4 py-0.5 rounded-lg">
                    {wallet.address.replace(/^(.{4}).*(.{4})$/, "$1...$2")}
                  </span>
                  {clicked.id === wallet.id ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(wallet.address);
                        setClicked({ id: wallet.id });
                        setTimeout(() => {
                          setClicked({ id: "" });
                        }, 1500);
                      }}
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </th>
              <td className="px-6 py-6">
                <div className="relative w-6 h-6 flex items-center space-x-3 ">
                  {wallet.symbol === "ETH" && (
                    <>
                      <Image src={"/eth.png"} alt="eth" fill sizes={"24px"} />
                      <Image src={"/matic.png"} alt="eth" fill sizes={"24px"} />
                    </>
                  )}
                  {wallet.symbol === "SOL" && (
                    <Image src={"/sol.png"} alt="eth" fill sizes={"24px"} />
                  )}
                </div>
              </td>
              <td className="px-6 py-6">
                {wallets.length === 1 ? (
                  <span className="text-md dark:bg-[#09141B] p-2 dark:text-white rounded-lg">
                    Cannot unlink last wallet
                  </span>
                ) : (
                  <button
                    onClick={() => handleUnlink(wallet.id)}
                    className={linkClasses}
                  >
                    Unlink
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default WalletTable;
