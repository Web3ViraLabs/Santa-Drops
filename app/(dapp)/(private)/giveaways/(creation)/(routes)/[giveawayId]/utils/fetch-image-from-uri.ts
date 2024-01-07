import axios from "axios";

export const fetchImage = async (url: string) => {
  try {
    const data = await axios.get(url);
    console.log(data.data);

    return data.data.image;
  } catch (error) {
    console.log("[FETCH_IMAGE_SOLANA_ERROR] ", error);
  }
};
