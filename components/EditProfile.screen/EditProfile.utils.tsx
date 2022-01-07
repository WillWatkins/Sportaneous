export type props = {
  navigation: {
    navigate: (component: string) => {};
  };
};

export type currentUser = {
  accepted_events: String[];
  description: String;
  first_name: String;
  hosted_events: String[];
  id: String;
  image_bitmap: String;
  last_name: String;
  requested_events: String[];
};
