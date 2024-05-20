import { useEffect } from "react";
import { animateScroll } from "react-scroll";
import { getChannels } from "../api/channelsApi";
import { getMessages } from "../api/messagesApi";
import { useAppSelector } from "../redux/hooks";
import NewMessageForm from "./NewMessageForm";

type MessageProps = {
  username: string;
  body: string;
};

const Message = ({ username, body }: MessageProps) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    {": "}
    {body}
  </div>
);

const ChatBox = () => {
  const { data: channels } = getChannels();
  const { data: allMessages } = getMessages();

  const channel = useAppSelector((state) => {
    const { currentChannelId } = state.ui;
    return channels?.find((c) => c.id === currentChannelId);
  });

  const messages = useAppSelector((state) => {
    const { currentChannelId } = state.ui;
    const channelMessages = allMessages?.filter(
      (m) => m.channelId === currentChannelId,
    );
    return channelMessages;
  });

  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: "messages-box",
      delay: 0,
      duration: 0,
    });
  }, [messages?.length]);

  if (!messages) {
    return null;
  }

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${channel?.name}`}</b>
        </p>
        <span className="text-muted">${messages.length} messages</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {messages.map(({ id, username, body }) => (
          <Message key={id} username={username} body={body} />
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <NewMessageForm channel={channel} />
      </div>
    </div>
  );
};

export default ChatBox;
