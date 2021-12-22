import { View, Text, Image } from "react-native";
import { styles } from "./HostInfo.style";
import React, { useEffect, useState } from "react";
import { props } from "../../singleEvent.utils";
import { getUserById } from "../../../../utils/utils";

export const HostInfo = ({ hostDetails }: props) => {
  const [imgURL, setImgURL] = useState("");
  useEffect(() => {
    if (hostDetails?.id !== "") {
      getUserById(hostDetails?.id)
        .then((userData: any) => {
          setImgURL(userData?.image_bitmap);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [hostDetails]);

  return (
    <View style={styles.hostView}>
      <Text style={styles.text}>About the host:</Text>
      <Text
        style={styles.capitalizedText}
      >{`${hostDetails?.first_name} ${hostDetails?.last_name}`}</Text>
      {imgURL ? <Image source={{ uri: imgURL }} /> : null}
      <Text style={styles.text}>{hostDetails?.description}</Text>
    </View>
  );
};
