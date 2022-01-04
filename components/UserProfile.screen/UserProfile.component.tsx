import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { SafeAreaView, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MyHostedEvents } from "./subcomponents/MyHostedEvents/MyHostedEvents.component";
import { MyJoinedEvents } from "./subcomponents/MyJoinedEvents/MyJoinedEvents.component";
import { UserDetails } from "./subcomponents/UserDetails/UserDetails.component";
import { styles } from "./UserDetails.style";

export const UserProfile = ({ navigation }: any) => {
  const { currentUser } = useContext(UserContext);

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView>
        <Text style={styles.title}>Account Details</Text>
        <UserDetails />
        <MyHostedEvents user_id={currentUser.id} navigation={navigation} />
        <MyJoinedEvents user_id={currentUser.id} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};
