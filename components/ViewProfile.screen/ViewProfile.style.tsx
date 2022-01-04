import { Dimensions, StyleSheet } from "react-native";

const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // backgroundColor: "blue",
    padding: 10,
  },
  avatar: {
    borderRadius: 100,
    height: 200,
    width: 200,
    alignSelf: "center",
  },
  title: {
    alignSelf: "center",
    fontSize: 24,
    paddingBottom: 5,
  },
  backButton: {
    backgroundColor: "#323B76",
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
  },
  buttonText: { fontSize: 20, color: "#fff" },
});
