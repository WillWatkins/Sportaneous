import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  TextInput,
  Image,
  Platform,
  View,
  Alert,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { styles } from "./EditProfile.style";
import { UserContext } from "../../contexts/UserContext";
import { updateUserDetails, deleteUser } from "../../utils/firebaseUtils";
import { ScrollView } from "react-native-gesture-handler";
import { useKeyboard } from "@react-native-community/hooks";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../utils/firestoreConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

type UpdateUserProps = {
  navigation: {
    navigate: (component: string) => {};
  };
};

export const EditProfile = ({ navigation }: UpdateUserProps) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [imgURL, setImgURL] = useState("");
  const [userDetails, setUserDetails] = useState(currentUser);
  const windowHeight = Dimensions.get("window").height;
  const keyboard = useKeyboard();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, [imgURL]);

  const handleChange = (text: string, stateKey: string) => {
    setUserDetails({ ...userDetails, [stateKey]: text });
  };

  const updateUser = () => {
    updateUserDetails(userDetails, currentUser.id);
    setCurrentUser(userDetails);
    navigation.navigate("Profile");
  };

  const deleteUserDetails = () => {
    deleteUser(currentUser.id)
      .then(() => {})
      .catch(() => {});
  };

  const uploadImage = async (uri: string, imageName: string) => {
    if (!uri) return;
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const storageRef = ref(storage, `/images/${imageName}`);
    const result = await uploadBytes(storageRef, blob);

    blob.close();

    getDownloadURL(storageRef)
      .then((url) => {
        handleChange(url, "image_bitmap");
        setImgURL(url);
        return imgURL;
      })
      .catch((err) => {
        err;
      });
  };

  const selectPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      uploadImage(result.uri, `avatar/img/${currentUser.id}`)
        .then((res) => {
          Alert.alert("Upload Successful");
        })
        .catch((err) => {
          Alert.alert(err);
        });
    }
  };

  const [size, setSize] = useState(windowHeight);
  useEffect(() => {
    keyboard.keyboardShown
      ? setSize(windowHeight * 0.82 - keyboard.keyboardHeight)
      : setSize(windowHeight * 0.82);
    setSize;
  }, [keyboard.keyboardShown]);

  return (
    <View>
      <Text style={styles.title}>UPDATE DETAILS</Text>
      <View style={{ height: size }}>
        <ScrollView>
          <View style={styles.inputContainer}>
            {currentUser.image_bitmap ? (
              <Image
                source={{ uri: currentUser.image_bitmap }}
                style={styles.avatar}
              />
            ) : null}
            <TouchableOpacity style={styles.submitButton} onPress={selectPhoto}>
              <Text style={styles.submitText}>Update Photo</Text>
            </TouchableOpacity>

            <Text style={styles.inputTitle}>First Name:</Text>
            <TextInput
              style={styles.inputField}
              onChangeText={(text) => handleChange(text, "first_name")}
              placeholder="First Name"
            />
            <Text style={styles.inputTitle}>Last Name:</Text>
            <TextInput
              style={styles.inputField}
              onChangeText={(text) => handleChange(text, "last_name")}
              placeholder="Last Name"
            />
            <Text style={styles.inputTitle}>Description:</Text>
            <TextInput
              style={styles.inputField}
              onChangeText={(text) => handleChange(text, "description")}
              placeholder="Description"
            />
            <TouchableOpacity style={styles.submitButton} onPress={updateUser}>
              <Text style={styles.submitText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.deleteUserButton}
            onPress={deleteUserDetails}
          >
            <Text style={styles.deleteButtonText}>Delete account?</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};
