import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginBottom: 60,
  },
  avatar: {
    borderRadius: 100,
    height: 200,
    width: 200,
    alignSelf: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    marginVertical: 15,
  },
  detailsContainer: {
    width: windowWidth * 0.9,
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: "#DADBDF",
    borderWidth: 2,
    backgroundColor: "#FFF",
    justifyContent: "center",
  },
  detailsField: {
    borderBottomWidth: 1,
    borderColor: "#DADBDF",
    marginTop: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    textAlign: "left",
    width: windowWidth / 3,
    fontSize: 17,
  },
  detailsName: {
    borderBottomWidth: 1,
    borderColor: "#DADBDF",
    marginTop: 5,
    paddingBottom: 5,
    padding: 5,
    fontSize: 25,
    textAlign: "center",
  },
  detailsBio: {
    borderBottomWidth: 1,
    borderColor: "#DADBDF",
    marginTop: 5,
    paddingBottom: 5,
    padding: 5,
    fontSize: 18,
  },
  editButton: {
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "#DADBDF",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 5,
    width: windowWidth * 0.9,
    alignSelf: "center",
  },
  buttonTitle: {
    textAlign: "center",
    fontWeight: "bold",
    color: "whitesmoke",
  },
});
