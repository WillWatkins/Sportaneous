import { styles } from "./EventInfo.style";
import { Text, View } from "react-native";
import React from "react";
import { props } from "../../singleEvent.utils";

export const EventInfo = ({ eventDetails }: props) => {
  return (
    <View style={styles.eventView}>
      <Text style={styles.title}>{eventDetails?.title}</Text>
      <Text style={styles.capitalizedText}>
        Location: {eventDetails?.location}
      </Text>
      <Text style={styles.capitalizedText}>
        Category: {eventDetails?.category}
      </Text>
      <Text style={styles.text}>Description: {eventDetails?.description}</Text>
      <Text style={styles.text}>Time: {eventDetails?.time}</Text>
      <Text style={styles.text}>Date: {eventDetails?.date}</Text>
      <Text style={styles.text}>
        Places filled: {eventDetails?.attendees.length}/
        {eventDetails?.max_capacity}
      </Text>
    </View>
  );
};
