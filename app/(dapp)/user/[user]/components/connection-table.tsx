"use client";

import { Account, Provider } from "@prisma/client";
import { removeProvider, setCookie } from "../../../settings/actions/actions";
import Image from "next/image";
import {
  generateCodeChallenge,
  generateCodeVerifier,
} from "../../../settings/actions/challenge-code";
import { useTheme } from "next-themes";

const discordClientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
const discordRedirectUri = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI;
const discordScope = process.env.NEXT_PUBLIC_DISCORD_SCOPE;
const discordResponseType = "code";

const twitterClientId = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID;
const twitterRedirectUri = process.env.NEXT_PUBLIC_TWITTER_REDIRECT_URI;
const twitterScope = process.env.NEXT_PUBLIC_TWITTER_SCOPE;
const twitterResponseType = "code";

type Providers = {
  name: Provider;
  redirect_url: string;
};

const providers: Providers[] = [
  {
    name: "DISCORD",
    redirect_url: `https://discord.com/api/oauth2/authorize?client_id=${discordClientId}&redirect_uri=${discordRedirectUri}&response_type=${discordResponseType}&scope=${discordScope}`,
  },
  {
    // &code_challenge=challenge&code_challenge_method=plain
    name: "TWITTER",
    redirect_url: `https://twitter.com/i/oauth2/authorize?response_type=${twitterResponseType}&client_id=${twitterClientId}&redirect_uri=${encodeURIComponent(
      twitterRedirectUri!
    )}&scope=${twitterScope}&code_challenge_method=S256`,
  },
];

const ConnectionTable = ({ connectedOauth }: { connectedOauth: Account[] }) => {
  const commonClasses =
    "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white";
  const rowClasses = "bg-main dark:hover:bg-main/70";
  const linkClasses =
    "font-medium text-blue-600 dark:text-blue-500 hover:underline";

  const handleLink = async (provider: Provider, url: string) => {
    const state =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    setCookie("state", state);
    if (provider === "DISCORD") {
      window.location.href = url + "&state=" + state;
    }

    if (provider === "TWITTER") {
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);
      setCookie("code_verifier", codeVerifier);
      window.location.href =
        url + "&state=" + state + "&code_challenge=" + codeChallenge;
    }
  };

  const { theme } = useTheme();

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
      <thead className="text-xs text-gray-700 uppercase bg-main dark:text-gray-400">
        <tr>
          <th scope="col" className={commonClasses}>
            Provider
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
        {providers.map((provider, index) => {
          const connectedProvider = connectedOauth.find(
            (c) => c.provider === provider.name
          );

          return (
            <tr key={index} className={rowClasses}>
              <th scope="row" className={commonClasses}>
                <div className="flex items-center space-x-4">
                  <div className="relative h-8 w-8">
                    <Image
                      src={
                        provider.name === "DISCORD"
                          ? "/discord.svg"
                          : theme === "dark"
                          ? "/twitter_light.svg"
                          : "/twitter.svg"
                      }
                      alt={provider.name + "icon"}
                      fill
                      sizes="64px"
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <span className="capitalize">{provider.name}</span>
                </div>
              </th>
              <td className="px-6 py-6 ">
                {connectedProvider ? (
                  <div className="flex items-center">
                    <div className="relative w-6 h-6">
                      <Image
                        className="object-cover rounded-lg"
                        src={connectedProvider.image || "/diamond.svg"}
                        alt={`${connectedProvider.username} image`}
                        fill
                        sizes="100px"
                      />
                    </div>
                    <div className="ml-4">
                      <span className="text-xl">
                        {connectedProvider.username}
                      </span>
                    </div>
                  </div>
                ) : (
                  "Not Linked"
                )}
              </td>
              <td className="px-6 py-6">
                {connectedProvider ? (
                  <button
                    onClick={() => handleUnlink(connectedProvider.id)}
                    className={linkClasses}
                  >
                    Unlink
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleLink(provider.name, provider.redirect_url)
                    }
                    className={linkClasses}
                  >
                    Link
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

export default ConnectionTable;
