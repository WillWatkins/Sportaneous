import { styles } from "../../UserDetails.style";
import { Image, View, Text, Pressable } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { storage } from "../../../../utils/firestoreConfig";
import { UserContext } from "../../../../contexts/UserContext";

import { getDownloadURL, ref } from "firebase/storage";

export const UserDetails = ({ navigation }: any) => {
  const [imgURL, setImgURL] = useState("");
  const { currentUser } = useContext(UserContext);

  //Storage Ref for IMG file
  const storageRef = ref(storage, currentUser.image_bitmap);

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

  return (
    <View>
      {imgURL ? <Image source={{ uri: imgURL }} style={styles.avatar} /> : null}
      <View style={styles.detailsContainer}>
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
