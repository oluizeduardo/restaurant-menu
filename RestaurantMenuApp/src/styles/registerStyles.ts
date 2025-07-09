// register_styles.ts - criado automaticamente
import { StyleSheet, Dimensions } from "react-native";

const register_styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginTop: 8,
  },
  toggle: {
    fontSize: 16,
    color: "#6B7280",
  },
  activeToggle: {
    color: "#2563EB",
    fontWeight: "bold",
  },
  link: {
    color: "#2563EB",
    marginTop: 16,
  },
});
export default register_styles;
