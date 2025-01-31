import { View, Text, Image } from "react-native";
import { styles } from "./HostInfo.style";
import React, { useEffect, useState } from "react";
import { props } from "../../singleEvent.utils";
import { getUserById } from "../../../../utils/firebaseUtils";

export const HostInfo = ({ hostDetails }: props) => {
  const [imgURL, setImgURL] = useState("");
  useEffect(() => {
    if (hostDetails?.id !== "") {
      getUserById(hostDetails!.id)
        .then((hostData) => {
          setImgURL(hostData?.image_bitmap);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [hostDetails]);

  return (
    <View style={styles.hostView}>
      {imgURL ? (
        <Image source={{ uri: imgURL }} style={styles.hostAvatar} />
      ) : null}
      <Text
        style={styles.capitalizedText}
      >{`${hostDetails?.first_name} ${hostDetails?.last_name}`}</Text>
      <Text style={styles.text}>{hostDetails?.description}</Text>
    </View>
  );
};
