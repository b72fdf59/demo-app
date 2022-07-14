export const checkToken = async (token: string) => {
  try {
    await fetch("/api/authorized", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (err) {
    return false;
  }
};
