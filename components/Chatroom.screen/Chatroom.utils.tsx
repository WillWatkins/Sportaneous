import { UserDetails } from "../UserProfile.screen/subcomponents/UserDetails/UserDetails.component";

export type props = {
  navigation: {
    navigate: (
      component: string,
      params?: { chat_id: String; eventName: String }
    ) => {};
  };
  route: {
    params: { eventId: string; eventTitle: String };
  };
};

export type userDetails = {
  first_name: String;
  last_name: String;
  userId: String;
};

export type eventDetails = {
  attendees: userDetails[];
  category: String;
  date: String;
  description: String;
  host_id: String;
  id: String;
  location: String;
  max_capacity: String;
  pending_attendees: String[];
  time: String;
  title: String;
};
