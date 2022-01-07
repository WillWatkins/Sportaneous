export type props = {
  route: {
    params: { chat_id: string; eventName: string };
  };
};

export type ChatItem = {
  first_name: string;
  userId: string;
  message_body: string;
  timestamp: { seconds: number; nanoseconds: number };
  id: string;
};
