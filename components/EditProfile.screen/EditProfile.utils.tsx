export type props = {
  navigation: {
    navigate: (component: string) => {};
  };
};

export type currentUser = {
  accepted_events: string[];
  description: string;
  first_name: string;
  hosted_events: string[];
  id: string;
  image_bitmap: string;
  last_name: string;
  requested_events: string[];
};
