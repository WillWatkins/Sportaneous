import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    height: windowHeight,
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
    width: windowWidth,
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
    // marginBottom: 40,
  },
  inputMessage: {
    flex: 6,
    height: 30,
    // marginBottom: 10,
  },
  sendContainer: {
    backgroundColor: "#323B76",
    flex: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  sendText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  noMessages: { alignSelf: "center", color: "#FFF" },
  spacing: {
    justifyContent: "flex-end",
    flex: 1,
  },
});
