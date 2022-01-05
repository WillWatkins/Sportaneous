import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
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
  },
  inputField: {
    height: 55,
    width: 300,
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderColor: "#DADBDF",
    borderWidth: 1,
  },
  pickerContainer: {
    height: 50,
    width: 300,
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderColor: "#DADBDF",
    borderWidth: 1,
    fontSize: 18,
    color: "grey",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  catPicker: {
    height: 45,
    width: 200,
    backgroundColor: "#FFF",
    borderRadius: 5,
    fontSize: 18,
    color: "grey",
  },
  capacityPicker: {
    height: 45,
    width: 80,
    backgroundColor: "#FFF",
    borderRadius: 5,
    fontSize: 18,
    color: "grey",
  },
  pickerText: { textAlign: "left", color: "grey", alignSelf: "center" },
  picker: {
    width: 200,
    height: 45,
  },
  post: {
    alignItems: "center",
    justifyContent: "center",
  },
  postButton: {
    marginVertical: 13,
    padding: 8,
    backgroundColor: "#323B76",
    borderRadius: 5,
    width: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  postText: {
    textAlign: "center",
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 17,
    textTransform: "uppercase",
  },
});
