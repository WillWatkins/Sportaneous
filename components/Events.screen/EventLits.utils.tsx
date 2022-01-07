export type categoryIsChecked = {
  [category: string]: boolean;
};

export type props = {
  navigation: {
    navigate: (component: string, navigationParam: { eventId: string }) => {};
  };
};

type attendess = {
  first_name: string;
  last_name: string;
  userId: string;
};
export type eventDetails = {
  attendees: attendess[];
  category: string;
  date: string;
  description: string;
  host_id: string;
  location: string;
  max_capacity: string;
  pending_attendees: attendess[];
  title: string;
  time: string;
  id: string;
};
