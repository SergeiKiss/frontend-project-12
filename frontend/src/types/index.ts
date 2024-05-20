export interface ChannelBody {
  id: string;
  name: string;
  removable: boolean;
}

export interface MessageBody {
  id: string;
  body: string;
  channelId: string;
  username: string;
}
