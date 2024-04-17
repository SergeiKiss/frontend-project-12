import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const MainPage = () => {
  const { username, token } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (username === null && token === null) navigate("/login");
  }, [username]);

  return (
    <div>
      <h1>Main page</h1>
    </div>
  );
};

export default MainPage;
