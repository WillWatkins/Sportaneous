import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { SafeAreaView, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MyHostedEvents } from "./subcomponents/MyHostedEvents/MyHostedEvents.component";
import { MyJoinedEvents } from "./subcomponents/MyJoinedEvents/MyJoinedEvents.component";
import { UserDetails } from "./subcomponents/UserDetails/UserDetails.component";
import { styles } from "./UserDetails.style";
import { getDownloadURL, ref } from "firebase/storage";

import { storage } from "../../utils/firestoreConfig";

export const UserProfile = ({ navigation }: any) => {
  const { currentUser } = useContext(UserContext);
  const [imgURL, setImgURL] = useState("");

  useEffect(() => {
    //firebase storage request for IMG file
    try {
      getDownloadURL(storageRef)
        .then((res) => {
          setImgURL(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, [imgURL, currentUser]);

  //Storage Ref for IMG file
  const storageRef = ref(storage, currentUser.image_bitmap);

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView>
        <Text style={styles.title}>Account Details</Text>
        <UserDetails navigation={navigation} imgURL={imgURL} />
        <MyHostedEvents user_id={currentUser.id} navigation={navigation} />
        <MyJoinedEvents user_id={currentUser.id} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};
