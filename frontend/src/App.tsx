import { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import NotFoundPage from "./pages/NotFound";
import ChatPage from "./pages/Chat";

function App() {
  type routeObj = {
    path: string;
    element: ReactNode;
  };

  const router: Array<routeObj> = [
    {
      path: "/",
      element: <ChatPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ];

  return (
    <Routes>
      {router.map((el) => (
        <Route path={el.path} element={el.element} key={el.path} />
      ))}
    </Routes>
  );
}

export default App;
