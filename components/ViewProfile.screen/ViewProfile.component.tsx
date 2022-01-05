import React, { useState, useEffect } from "react";
import { Text, Image, View, Pressable } from "react-native";
import { styles } from "./ViewProfile.style";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserById } from "../../utils/firebaseUtils";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../utils/firestoreConfig.js";
import { HostInfo } from "../SingleEvent.screen/subcomponents/HostInfo/HostInfo.component";

export const ViewProfile = ({ route, navigation }) => {
  const { userId, eventId, eventTitle } = route.params;
  const [imgURL, setImgURL] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [userDetails, setUserDetails] = useState({
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
        setImgURL(userData?.image_bitmap);
        setUserDetails(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userImage, userId]);

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
