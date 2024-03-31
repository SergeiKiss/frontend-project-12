import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFound";
import { ReactNode } from "react";

type routeObj = {
  path: string;
  element: ReactNode;
};

const router: Array<routeObj> = [
  //   {
  //     path: "/",
  //     element: ???,
  //   },
  //   {
  //     path: "/login",
  //     element: ???,
  //   },
  {
    path: "*",
    element: NotFoundPage(),
  },
];

const routes = (
  <Routes>
    {router.map((el: routeObj) => (
      <Route path={el.path} element={el.element} key={el.path} />
    ))}
  </Routes>
);

export default routes;
