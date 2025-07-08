import { StyleSheet } from "react-native";

export const produto_styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 48,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginVertical: 16,
    alignSelf: "center",
  },
  containerList: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  input: {
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 12,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  details: {
    flex: 1,
  },
  nome: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  descricao: {
    fontSize: 14,
    color: "#555",
  },
  preco: {
    fontSize: 14,
    color: "#1D4ED8",
    marginTop: 6,
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  buttonEdit: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonDelete: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  empty: {
    textAlign: "center",
    marginTop: 32,
    fontSize: 16,
    color: "#888",
  },
});
