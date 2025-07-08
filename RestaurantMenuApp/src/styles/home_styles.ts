import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const itemSize = (screenWidth - 60) / 2;

const home_styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  welcome: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  menuContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menuItem: {
    width: itemSize,
    height: itemSize,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 20,
  },
  menuText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  page: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default home_styles;
