import { API_URL } from "@/const";
export default async function getSpecificGame(gameId: string | undefined) {
  try {
    const response = await fetch(API_URL + `/${gameId}`);
    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data.errors?.[0]?.message ||
        `Error: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }
    return data;
  } catch (err) {
    alert(err);
  }
}
