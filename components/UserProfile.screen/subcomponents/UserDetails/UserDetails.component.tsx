import { styles } from "../../UserDetails.style";
import { Image, View, Text, Pressable } from "react-native";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import { props } from "../../UserProfile.utils";

export const UserDetails = ({ navigation }: props) => {
  const { currentUser } = useContext(UserContext);

  useEffect(() => {}, [currentUser]);

  return (
    <View>
      <View style={styles.detailsContainer}>
        {currentUser.image_bitmap ? (
          <Image
            source={{ uri: currentUser.image_bitmap }}
            style={styles.avatar}
          />
        ) : null}
        <Text
          style={styles.detailsName}
        >{`${currentUser.first_name} ${currentUser.last_name}`}</Text>
        <Text style={styles.detailsBio}>{currentUser.description}</Text>
      </View>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? "rgba(50, 59, 118, 0.5)"
              : "rgba(50, 59, 118, 1)",
          },
          styles.editButton,
        ]}
        onPress={() => {
          navigation.navigate("Edit Profile");
        }}
      >
        <Text style={styles.buttonTitle}>Edit Details</Text>
      </Pressable>
    </View>
  );
};
