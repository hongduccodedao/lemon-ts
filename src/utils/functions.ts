export const getToken = (): string | null => {
  const localStorageData = window.localStorage.getItem("persist:lemon/user");

  if (localStorageData) {
    const parsedData = JSON.parse(localStorageData);

    if (typeof parsedData === "object" && "token" in parsedData) {
      const accessToken = parsedData.token;
      return accessToken.replace(/"/g, "");
    }
  }

  return null;
};

