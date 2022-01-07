export type props = {
  navigation: {
    navigate: (
      component: string,
      navigationParam?: { eventId?: string; eventTitle?: string }
    ) => {};
  };
  user_id?: string;
};

export type event = {
  title: string;
  host_id: string;
  location: string;
  date: string;
  category: string;
  time: string;
  description: string;
  id: string;
};

export type user = {
  accepted_events: string[];
  description: string;
  first_name: string;
  hosted_events: string[];
  id: string;
  image_bitmap: string;
  last_name: string;
  requested_events: string[];
};
