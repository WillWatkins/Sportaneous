import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 17,
    paddingTop: 10,
    paddingBottom: 10,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: "#323B76",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 8,
    marginBottom: 5,
    width: windowWidth / 1.089,
    alignSelf: "center",
  },
  lowerButtonContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },
  lowerButtonClear: {
    borderWidth: 0.5,
    borderColor: "#323B76",
    padding: 8,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 5,
    width: windowWidth / 2.25,
  },
  lowerButtonApply: {
    borderWidth: 0.5,
    borderColor: "#323B76",
    padding: 8,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 5,
    width: windowWidth / 2.25,
  },
  refreshButton: {
    borderWidth: 1,
    borderColor: "#323B76",
    padding: 8,
    alignSelf: "center",
    width: windowWidth / 1.089,

    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  buttonTitle: {
    textAlign: "center",
    fontWeight: "bold",
    color: "whitesmoke",
  },
  checkBoxContainer: {
    flexDirection: "column",
    height: windowHeight * 0.2,
    alignItems: "center",
  },
  checkBox: {
    backgroundColor: "#FFF",
    width: windowWidth / 2.75,
    borderWidth: 1,
    borderColor: "#323B76",
    borderRadius: 5,
    paddingLeft: 9,
    paddingTop: 7,
    padding: 5,
    margin: 3,
  },
  checkBoxText: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
