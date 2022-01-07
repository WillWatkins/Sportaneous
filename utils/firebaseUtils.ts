import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
} from "firebase/firestore";
import { db } from "./firestoreConfig.js";

type event = {
  id?: string;
  title: string;
  category: string;
  description: string;
  location: string;
  max_capacity: string;
  date: string | undefined;
  time: string | undefined;
  host_id: string;
  attendees: string[];
  pending_attendees: string[];
};

type users = {
  first_name?: string;
  hosted_events?: string[];
  last_name?: string;
  image_bitmap?: string;
  requested_events?: string[];
  description?: string;
  accepted_events?: string[];
  id?: string;
};

type userDetails = {
  first_name: string;
  last_name: string;
  userId: string;
};

type newChatroom = {
  host_id: string;
  attendees_id: string[];
  messages: chatObject[];
};

type chatObject = {
  userId: string;
  first_name: string;
  message_body: string;
  timestamp: { seconds: string; nanoseconds: string };
};

export const selectAllEvents = () => {
  return getDocs(collection(db, "events")).then((snapshot) => {
    let eventsArray: event[] = [];
    snapshot.docs.forEach((doc) => {
      eventsArray.push({ ...doc.data(), id: doc.id });
    });
    return eventsArray;
  });
};

export const selectEventsByUser = (userId: string) => {
  const q = query(collection(db, "events"), where("host_id", "==", userId));
  return getDocs(q).then((snapshot) => {
    let eventsArray: event[] = [];
    snapshot.docs.forEach((doc) => {
      eventsArray.push({ ...doc.data(), id: doc.id });
    });
    return eventsArray;
  });
};

export const selectEventById = (eventId: string) => {
  const docRef = doc(db, "events", eventId);
  return getDoc(docRef).then((snapshot) => {
    const event = snapshot.data();
    return event;
  });
};

export const addNewEvent = (newEvent: event) => {
  return addDoc(collection(db, "events"), newEvent).then((res) => res.id);
};

export const addNewUser = (newUser: users, uid: string) => {
  return setDoc(doc(db, "users", uid), newUser);
};

export const addNewChatroom = (newChatroom: newChatroom, eventId: string) => {
  return setDoc(doc(db, "chats", eventId), newChatroom);
};

export const selectFilteredEvents = (location: string) => {
  const q1 = query(collection(db, "events"), where("location", "==", location));
  return getDocs(q1).then((snapshot) => {
    let eventsArray: event[] = [];
    snapshot.docs.forEach((doc) => {
      eventsArray.push({ ...doc.data(), id: doc.id });
    });
    return eventsArray;
  });
};

export const deleteUser = (userId: string) => {
  return deleteDoc(doc(db, "users", userId));
};

export const deleteEvent = (eventId: string) => {
  return deleteDoc(doc(db, "events", eventId));
};

export const deleteChatroom = (chatId: string) => {
  return deleteDoc(doc(db, "chats", chatId));
};

export const getUsers = () => {
  return getDocs(collection(db, "users")).then((snapshot) => {
    let users: users[] = [];
    snapshot.docs.forEach((user) => {
      users.push({ ...user.data(), id: user.id });
    });
    return users;
  });
};

export const getUserById = (userId: string) => {
  const docRef = doc(db, "users", userId);
  return getDoc(docRef).then((snapshot) => snapshot.data());
};

export const selectChatById = (chatId: string) => {
  const docRef = doc(db, "chats", chatId);
  return getDoc(docRef).then((snapshot) => snapshot.data());
};

export const addChatMessage = (chatObject: chatObject, chatId: string) => {
  return updateDoc(doc(db, "chats", chatId), {
    messages: arrayUnion(chatObject),
  });
};

export const deleteChatMessage = (chatObject: chatObject, chatId: string) => {
  return updateDoc(doc(db, "chats", chatId), {
    messages: arrayRemove(chatObject),
  });
};

export const joinEvent = (userDetails: userDetails, eventId: string) => {
  return updateDoc(doc(db, "events", eventId), {
    pending_attendees: arrayUnion(userDetails),
  }).then(() => {
    return updateDoc(doc(db, "users", userDetails.userId), {
      requested_events: arrayUnion(eventId),
    });
  });
};

export const addAttendee = (eventId: string, userDetails: userDetails) => {
  return updateDoc(doc(db, "events", eventId), {
    attendees: arrayUnion(userDetails),
    pending_attendees: arrayRemove(userDetails),
  }).then(() => {
    return updateDoc(doc(db, "users", userDetails.userId), {
      accepted_events: arrayUnion(eventId),
      requested_events: arrayRemove(eventId),
    });
  });
};

export const removeAttendee = (eventId: String, userDetails: userDetails) => {
  return updateDoc(doc(db, "events", eventId), {
    attendees: arrayRemove(userDetails),
  });
};

export const removeSelfFromEvent = (
  userDetails: userDetails,
  eventId: String
) => {
  return updateDoc(doc(db, "events", eventId), {
    pending_attendees: arrayRemove(userDetails),
    attendees: arrayRemove(userDetails),
  }).then(() => {
    return updateDoc(doc(db, "users", userDetails.userId), {
      requested_events: arrayRemove(eventId),
      accepted_events: arrayRemove(eventId),
    });
  });
};

export const addNewEventToCurrentUserProfile = (
  userId: string,
  eventId: string
) => {
  return updateDoc(doc(db, "users", userId), {
    hosted_events: arrayUnion(eventId),
  });
};

export const updateUserDetails = (userDetails: userDetails, uid: string) => {
  return updateDoc(doc(db, "users", uid), userDetails);
};

export const deleteEventFromUsersHostedEvents = (
  userId: string,
  eventId: string
) => {
  return updateDoc(doc(db, "users", userId), {
    hosted_events: arrayRemove(eventId),
  });
};

export const deleteEventFromUsersRequestedEvents = (
  users: users[],
  eventId: string
) => {
  users.forEach((user) => {
    updateDoc(doc(db, "users", user), {
      requested_events: arrayRemove(eventId),
    });
  });
};
