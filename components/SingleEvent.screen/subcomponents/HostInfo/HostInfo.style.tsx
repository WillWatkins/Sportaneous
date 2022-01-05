import { StyleSheet, Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  hostView: {
    backgroundColor: "#FFF",
    flex: 3,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 25,
    marginTop: 10,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: "#DADBDF",
    maxHeight: windowHeight / 2,
  },
  text: {
    fontSize: 18,
    margin: 5,
    alignSelf: "center",
  },
  capitalizedText: {
    fontSize: 18,
    margin: 5,
    textTransform: "capitalize",
    alignSelf: "center",
  },
  hostAvatar: {
    borderRadius: 100,
    height: 100,
    width: 100,
    alignSelf: "center",
  },
});
