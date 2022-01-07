type navigationParams = {
  userId: String;
  eventId: String;
  eventTitle: String;
};

export type props = {
  navigation: {
    navigate: (component: string, params?: navigationParams) => {};
  };
  route: {
    params: { eventId: string; eventTitle: String };
  };
};

export type userNameAndId = {
  first_name: String;
  last_name: String;
  userId: String;
};
