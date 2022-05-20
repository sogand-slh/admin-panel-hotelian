import { PostPage, LoginPage, HomePage } from "../pages";

export const ROUTES = {
  root: { Component: HomePage, element: "/" },
  login: { Component: LoginPage, element: "/login" },
  post: { Component: PostPage, element: "/post" },
};
