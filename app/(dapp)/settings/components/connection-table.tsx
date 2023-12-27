"use client";

import { Account } from "@prisma/client";
import { removeProvider, setStateCookie } from "../actions/actions";
import Image from "next/image";

const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI;
const scope = process.env.NEXT_PUBLIC_DISCORD_SCOPE;
const responseType = "code";

const providers = [
  {
    name: "discord",
    redirect_url: `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`,
  },
];

const ConnectionTable = ({ connectedOauth }: { connectedOauth: Account[] }) => {
  const commonClasses =
    "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white";
  const rowClasses =
    "dark:bg-gray-900 dark:border-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600";
  const linkClasses =
    "font-medium text-blue-600 dark:text-blue-500 hover:underline";

  const handleLink = (url: string) => {
    const state =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    setStateCookie(state);
    window.location.href = url + "&state=" + state;
  };

  const handleUnlink = async (id: string) => {
    if (!id) {
      return null;
    }

    const account = await removeProvider(id);

    if (!account) {
      return null;
    }

    return account;
  };

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
        <tr>
          <th scope="col" className={commonClasses}>
            Providers
          </th>
          <th scope="col" className={commonClasses}>
            Linked Account
          </th>
          <th scope="col" className={commonClasses}>
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {providers.map((provider, index) => (
          <tr key={index} className={rowClasses}>
            <th scope="row" className={commonClasses}>
              <span className="capitalize">{provider.name}</span>
            </th>
            <td className="px-6 py-6">
              {connectedOauth.filter((c) => c.provider === provider.name)
                .length > 0 ? (
                <div className="flex items-center">
                  <div className="relative w-10 h-10">
                    <Image
                      className="object-cover rounded-lg"
                      src={connectedOauth[0].image || "/diamond.svg"}
                      alt={`${connectedOauth[0].username} image`}
                      fill
                      sizes="100px"
                    />
                  </div>
                  <div className="ml-4">
                    <span className="text-xl">
                      {connectedOauth[0].username}
                    </span>
                  </div>
                </div>
              ) : (
                "Not Linked"
              )}
            </td>
            <td className="px-6 py-6">
              {connectedOauth.filter((c) => c.provider === provider.name)
                .length > 0 ? (
                <button
                  onClick={() => handleUnlink(connectedOauth[0].id)}
                  className={linkClasses}
                >
                  Unlink
                </button>
              ) : (
                <button
                  onClick={() => handleLink(provider.redirect_url)}
                  className={linkClasses}
                >
                  Link
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ConnectionTable;
