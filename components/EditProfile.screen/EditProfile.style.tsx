import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  title: {
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#323B76",
    padding: 30,
    width: windowWidth / 1,
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    backgroundColor: "#FFF",
    flex: 1,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 25,
    marginTop: 10,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: "#DADBDF",
  },
  avatar: {
    borderRadius: 100,
    height: 200,
    width: 200,
    alignSelf: "center",
    marginTop: 10,
  },
  inputTitle: {
    textAlign: "left",
    textTransform: "uppercase",
    paddingBottom: 3,
  },
  inputField: {
    height: 45,
    width: 250,
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderColor: "#DADBDF",
    borderWidth: 1,
  },
  submit: {
    alignItems: "center",
    justifyContent: "center",
  },
  submitButton: {
    marginVertical: 10,
    padding: 8,
    backgroundColor: "#323B76",
    borderRadius: 8,
  },
  submitText: {
    textAlign: "center",
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 17,
    textTransform: "uppercase",
  },
  deleteUserButton: {
    alignSelf: "center",
    marginVertical: 20,
    padding: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "red",
    fontSize: 17,
    textTransform: "uppercase",
  },
});
