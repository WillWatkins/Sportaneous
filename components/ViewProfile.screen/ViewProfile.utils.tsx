export type props = {
  navigation: {
    navigate: (
      component: string,
      navigationParams: { eventId: string; eventTitle: string }
    ) => {};
  };
  route: {
    params: { userId: string; eventId: string; eventTitle: string };
  };
};

export type userDetails = {
  first_name: string;
  hosted_events: string[];
  last_name: string;
  image_bitmap: string;
  requested_events: string[];
  description: string;
  accepted_events: string[];
  id: string;
};
