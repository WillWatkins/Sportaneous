export type props = {
  route: {
    params: { chat_id: String; eventName: String };
  };
};

export type ChatItem = {
  first_name: String;
  userId: String;
  message_body: String;
  timestamp: { seconds: String; nanoseconds: String };
  id: String;
};
