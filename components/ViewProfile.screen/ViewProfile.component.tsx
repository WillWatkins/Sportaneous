import React, { useState, useEffect } from "react";
import { Text, Pressable } from "react-native";
import { styles } from "./ViewProfile.style";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserById } from "../../utils/firebaseUtils";
import { HostInfo } from "../SingleEvent.screen/subcomponents/HostInfo/HostInfo.component";
import { props, userDetails } from "./ViewProfile.utils";

export const ViewProfile = ({ route, navigation }: props) => {
  const { userId, eventId, eventTitle } = route.params;
  const [userDetails, setUserDetails] = useState<userDetails>({
    first_name: "",
    hosted_events: [],
    last_name: "",
    image_bitmap: "",
    requested_events: [],
    description: "",
    accepted_events: [],
    id: "",
  });

  useEffect(() => {
    getUserById(userId)
      .then((userData) => {
        setUserDetails(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  return (
    <SafeAreaView style={styles.container}>
      <HostInfo hostDetails={userDetails} />
      <Pressable
        style={styles.backButton}
        onPress={() => {
          navigation.navigate("AcceptReject", { eventId, eventTitle });
        }}
      >
        <Text style={styles.buttonText}>Back to attendee review</Text>
      </Pressable>
    </SafeAreaView>
  );
};
