import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import ChannelsBox from "../components/ChannelsBox";
import ChatBox from "../components/ChatBox";
import { getChannels } from "../api/channelsApi";
import { getMessages } from "../api/messagesApi";
import { useAppSelector } from "../redux/hooks";

const ChatPage = () => {
  const { username, token } = useAppSelector((state) => state.user);
  const { isLoading: isChannelsLoading } = getChannels();
  const { isLoading: isMessagessLoading } = getMessages();
  const navigate = useNavigate();

  useEffect(() => {
    if (username === null && token === null) navigate("/login");
  }, [username, token]);

  return isChannelsLoading || isMessagessLoading ? (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading</span>
      </Spinner>
    </div>
  ) : (
    <>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <ChannelsBox />
          </div>
          <div className="col p-0 h-100">
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
