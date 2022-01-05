import { styles } from "../../UserDetails.style";
import { Image, View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext";

export const UserDetails = ({ navigation, imgURL }: any) => {
  const { currentUser } = useContext(UserContext);

  return (
    <View>
      <View style={styles.detailsContainer}>
        {imgURL ? (
          <Image source={{ uri: imgURL }} style={styles.avatar} />
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
