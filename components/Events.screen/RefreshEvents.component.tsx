import React from "react";
import { Pressable, View, Text } from "react-native";
import { selectAllEvents } from "../../utils/firebaseUtils";
import { styles } from "./Filter.style";
import { resetSelection } from "./utils/FilterUtils";

export const RefreshEvents = ({ setEvents, setCategoryIsChecked }) => {
  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? "rgba(50, 59, 118, 0.5)"
              : "rgba(50, 59, 118, 1)",
          },
          styles.refreshButton,
        ]}
        onPress={() => {
          selectAllEvents().then((res) => {
            resetSelection(setCategoryIsChecked);
            setEvents(res);
          });
        }}
      >
        <Text style={styles.buttonTitle}>Reload Event List</Text>
      </Pressable>
    </View>
  );
};
