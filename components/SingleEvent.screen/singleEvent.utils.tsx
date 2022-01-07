import {
  deleteChatroom,
  deleteEvent,
  deleteEventFromUsersHostedEvents,
  deleteEventFromUsersRequestedEvents,
} from "../../utils/firebaseUtils";

export type navigationWithEventId = {
  eventId: string;
};

export type hostDetails = {
  first_name: string;
  last_name: string;
  description: string;
  image_bitmap: string;
  id: string;
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
};

export type props = {
  navigation?: {
    navigate: (component: string, eventId?: navigationWithEventId) => {};
  };
  route?: {
    params: { eventId: string };
  };
  eventDetails?: eventDetails;
  hostDetails?: hostDetails;
};

export type doc = {
  data: () => { eventDetails: eventDetails };
  exists: () => boolean;
};

export function checkAcceptedOrRequested(
  object: any,
  currentUser: any
): boolean {
  if (object.attendees.includes(currentUser.id)) {
    return true;
  } else {
    for (let i = 0; i < object.pending_attendees.length; i++) {
      if (object.pending_attendees[i].userId === currentUser.id) {
        return true;
      }
    }
    return false;
  }
}

export function deleteEventAndCascade(
  eventId: string,
  { navigation }: props,
  userId: string,
  eventDetails: eventDetails
) {
  try {
    const attendeesToUpdate = eventDetails.attendees.concat(
      eventDetails.pending_attendees
    );
    deleteEvent(eventId);
    deleteChatroom(eventId);
    deleteEventFromUsersHostedEvents(userId, eventId);
    deleteEventFromUsersRequestedEvents(attendeesToUpdate, eventId);
    navigation?.navigate("Events");
  } catch (error) {
    console.log(error);
    alert("Unable to delete event at this time, please try again later");
  }
}

export function checkCapacity(attending: boolean, eventDetails: any) {
  if (
    eventDetails.attendees.length >= parseInt(eventDetails.max_capacity) &&
    attending === false
  ) {
    return true;
  }
  return false;
}
export function joinButtonText(
  acceptedOrRequested: boolean,
  eventDetails: eventDetails
) {
  if (checkCapacity(acceptedOrRequested, eventDetails)) {
    return "Event full";
  } else if (acceptedOrRequested) {
    return "Leave event?";
  }
  return "Request to join event?";
}
