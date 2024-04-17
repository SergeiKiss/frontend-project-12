import backend from ".";

export type loginBodyData = {
  username: string;
  password: string;
};

export type returnedLoginData = {
  username: string;
  token: string;
};

export const login = async ({ username, password }: loginBodyData) =>
  backend()
    .post("http://localhost:5001/api/v1/login", { username, password })
    .then((response) => response.data as returnedLoginData);
