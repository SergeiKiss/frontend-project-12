import { MouseEventHandler, useEffect } from "react";
import { Button, Dropdown, ButtonGroup } from "react-bootstrap";
import { animateScroll } from "react-scroll";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCurrentChannel, openModal } from "../redux/slices/ui";
import { getChannels } from "../api/channelsApi";
import type { ChannelBody } from "../types";
import { RootState } from "../redux/store";

type ChannelProps = {
  channel: ChannelBody;
  isCurrent: boolean;
  handleChoose: MouseEventHandler<HTMLButtonElement>;
  handleRemove: MouseEventHandler<HTMLElement>;
  handleRename: MouseEventHandler<HTMLElement>;
};

const Channel = ({
  channel,
  isCurrent,
  handleChoose,
  handleRemove,
  handleRename,
}: ChannelProps) => {
  const variant = isCurrent ? "secondary" : undefined;

  return (
    <li key={channel.id} className="nav-item w-100">
      {channel.removable ? (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            type="button"
            key={channel.id}
            className="w-100 rounded-0 text-start text-truncate"
            onClick={handleChoose}
            variant={variant}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
          <Dropdown.Toggle split className="flex-grow-0" variant={variant}>
            <span className="visually-hidden">Menu</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleRemove}>Remove</Dropdown.Item>
            <Dropdown.Item onClick={handleRename}>Rename</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          type="button"
          variant={variant}
          key={channel.id}
          className="w-100 rounded-0 text-start"
          onClick={handleChoose}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      )}
    </li>
  );
};

const ChannelsBox = () => {
  const dispatch = useAppDispatch();
  const { currentChannelId, defaultChannelId } = useAppSelector(
    (state: RootState) => state.ui,
  );
  const { data: channels } = getChannels();
  const lastChannelsItemId = channels ? channels?.at(-1)?.id : null;

  useEffect(() => {
    if (currentChannelId === defaultChannelId) {
      animateScroll.scrollToTop({
        containerId: "channels-box",
        delay: 0,
        duration: 0,
      });
    }
    if (currentChannelId === lastChannelsItemId) {
      animateScroll.scrollToBottom({
        containerId: "channels-box",
        delay: 0,
        duration: 0,
      });
    }
  }, [currentChannelId, lastChannelsItemId]);

  const handleChooseChannel = (channelId: string) => () => {
    dispatch(setCurrentChannel({ channelId }));
  };
  const handleAddChannel = () => {
    dispatch(openModal({ type: "addChannel" }));
  };
  const handleRemoveChannel = (channelId: string) => () => {
    dispatch(openModal({ type: "removeChannel", extra: { channelId } }));
  };
  const handleRenameChannel = (channelId: string) => () => {
    dispatch(openModal({ type: "renameChannel", extra: { channelId } }));
  };

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Channels</b>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={handleAddChannel}
        >
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels?.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            isCurrent={channel.id === currentChannelId}
            handleChoose={handleChooseChannel(channel.id)}
            handleRemove={handleRemoveChannel(channel.id)}
            handleRename={handleRenameChannel(channel.id)}
          />
        ))}
      </ul>
    </>
  );
};

export default ChannelsBox;
