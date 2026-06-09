export default async function getAllGames() {
  try {
    const response = await fetch(`https://v2.api.noroff.dev/old-games`);
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
