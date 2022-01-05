import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { SafeAreaView, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MyHostedEvents } from "./subcomponents/MyHostedEvents/MyHostedEvents.component";
import { MyPendingRequests } from "./subcomponents/MyPendingsRequests/MyPendingRequests.component";
import { UserDetails } from "./subcomponents/UserDetails/UserDetails.component";
import { styles } from "./UserDetails.style";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../utils/firestoreConfig";
import { MyAcceptedRequests } from "./subcomponents/MyAcceptedRequests/MyAcceptedRequests.component";

export const UserProfile = ({ navigation }: any) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [imgURL, setImgURL] = useState("");

  //Storage Ref for IMG file
  const storageRef = ref(storage, currentUser.image_bitmap);

  useEffect(() => {
    //firebase storage request for IMG file
    try {
      getDownloadURL(storageRef)
        .then((res) => {
          setCurrentUser((user) => {
            const updateUser = { ...user };
            updateUser.image_bitmap = res;
            return updateUser;
          });
          setImgURL(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, [imgURL]);

  console.log(currentUser);
  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.header}>ACCOUNT DETAILS</Text>
      <ScrollView>
        <UserDetails navigation={navigation} imgURL={imgURL} />
        <MyHostedEvents user_id={currentUser.id} navigation={navigation} />
        <MyAcceptedRequests user_id={currentUser.id} navigation={navigation} />
        <MyPendingRequests user_id={currentUser.id} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};
