import Cookies from "js-cookie";

interface Tokens {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

export const getTokensFromCookies = (): Tokens => {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  return { accessToken, refreshToken };
};
