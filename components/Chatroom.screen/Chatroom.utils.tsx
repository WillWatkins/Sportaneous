import { UserDetails } from "../UserProfile.screen/subcomponents/UserDetails/UserDetails.component";

export type props = {
  navigation: {
    navigate: (
      component: string,
      params?: { chat_id: string; eventName: string }
    ) => {};
  };
  route: {
    params: { eventId: string; eventTitle: string };
  };
};

export type userDetails = {
  first_name: string;
  last_name: string;
  userId: string;
};

export type eventDetails = {
  attendees: userDetails[];
  category: string;
  date: string;
  description: string;
  host_id: string;
  id: string;
  location: string;
  max_capacity: string;
  pending_attendees: string[];
  time: string;
  title: string;
};
