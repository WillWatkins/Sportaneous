import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#323B76",
  },
  item: {
    backgroundColor: "#FFF",
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    flex: 1,
    justifyContent: "space-between",
    borderColor: "#FFF",
    borderWidth: 1,
    borderBottomColor: "#DADBDF",
    borderTopColor: "#DADBDF",
    borderRadius: 5,
  },
  header: {
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    backgroundColor: "#323B76",
    textTransform: "uppercase",
    width: windowWidth / 1,
  },
  hidden: {},
  topRowContainer: { justifyContent: "space-between", flexDirection: "row" },
  deleteButton: {
    padding: 2,
    borderRadius: 20,
    justifyContent: "space-between",
  },
  name: {
    color: "grey",
    fontStyle: "italic",
    textAlign: "left",
  },
  message: {
    color: "black",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "white",
  },
  time: {
    marginTop: 5,
    color: "grey",
    fontStyle: "italic",
    textAlign: "right",
    alignSelf: "flex-end",
    width: windowWidth / 3,
  },
  delete: {
    color: "black",
    textAlign: "right",
  },
  sendMessagecontainer: {
    backgroundColor: "white",
    flexWrap: "wrap",
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
    height: 50,
    borderRadius: 10,
    padding: 10,
  },
  inputMessage: { color: "black" },

  sendText: {
    marginRight: 5,
    fontSize: 20,
  },
});
