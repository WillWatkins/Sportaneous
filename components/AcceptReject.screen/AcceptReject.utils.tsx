type navigationParams = {
  userId: string;
  eventId: string;
  eventTitle: string;
};

export type props = {
  navigation: {
    navigate: (component: string, params?: navigationParams) => {};
  };
  route: {
    params: { eventId: string; eventTitle: string };
  };
};

export type userNameAndId = {
  first_name: string;
  last_name: string;
  userId: string;
};
