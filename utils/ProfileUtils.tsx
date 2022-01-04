import { Alert } from "react-native";
import { removeSelfFromEvent } from "./utils";
import { deleteEventAndCascade } from "../components/SingleEvent.screen/singleEvent.utils";

export const confirmDelete = (eventId, { navigation }, user_id, eventDetails) =>
  Alert.alert("Warning!", "Are you sure you want to delete this event?", [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    {
      text: "OK",
      onPress: () => {
        deleteEventAndCascade(eventId, { navigation }, user_id, eventDetails);
      },
    },
  ]);

export const confirmLeave = (userInfo, eventID) =>
  Alert.alert("Warning!", "Are you sure you want to leave this event?", [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    {
      text: "OK",
      onPress: () => {
        removeSelfFromEvent(userInfo, eventID);
      },
    },
  ]);
