import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MyHostedEvents } from "./subcomponents/MyHostedEvents/MyHostedEvents.component";
import { MyPendingRequests } from "./subcomponents/MyPendingsRequests/MyPendingRequests.component";
import { UserDetails } from "./subcomponents/UserDetails/UserDetails.component";
import { styles } from "./UserDetails.style";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../utils/firestoreConfig";
import { MyAcceptedRequests } from "./subcomponents/MyAcceptedRequests/MyAcceptedRequests.component";
import { props, user } from "./UserProfile.utils";

export const UserProfile = ({ navigation }: props) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [imgURL, setImgURL] = useState<string>("");

  //Storage Ref for IMG file
  const storageRef = ref(storage, currentUser.image_bitmap);

  useEffect(() => {
    //firebase storage request for IMG file
    try {
      getDownloadURL(storageRef)
        .then((res) => {
          setCurrentUser((user: user) => {
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

  return (
    <View style={styles.page}>
      <Text style={styles.header}>ACCOUNT DETAILS</Text>
      <ScrollView>
        <UserDetails navigation={navigation} />
        <MyHostedEvents user_id={currentUser.id} navigation={navigation} />
        <MyAcceptedRequests user_id={currentUser.id} navigation={navigation} />
        <MyPendingRequests user_id={currentUser.id} navigation={navigation} />
      </ScrollView>
    </View>
  );
};
