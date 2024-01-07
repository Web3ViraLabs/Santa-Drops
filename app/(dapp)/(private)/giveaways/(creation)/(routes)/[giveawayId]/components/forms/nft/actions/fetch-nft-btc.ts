"use server";

export async function fetchBtcNft(
  inscriptionNumber: string
): Promise<{ name: string; image: string }> {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY":
          "oxyisop123_sk_0d1f7b4a-92d5-4ce0-8fb3-5a71e6aa74e5_tijmvy0arf5nowfj",
      },
    };

    const btcNft = await fetch(
      `https://api.simplehash.com/api/v0/nfts/bitcoin/inscription_number/${inscriptionNumber}`,
      options
    );

    const data = await btcNft.json();
    console.log(data, data.name);

    return {
      name: data.name || "",
      image: data.image_url || data.video_url || "",
    };
  } catch (error) {
    console.log("[fetchBtcNft] ", error);
    return {
      name: "",
      image: "",
    };
  }
}
