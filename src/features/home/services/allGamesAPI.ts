import { API_URL } from "@/const";
export default async function getAllGames() {
  try {
    const response = await fetch(API_URL);
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
