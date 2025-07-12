import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  card: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9fafb",
  },
  details: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  endereco: {
    fontSize: 14,
    color: "#444",
    marginBottom: 2,
  },
  cnpj: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  coord: {
    fontSize: 13,
    color: "#666",
    marginBottom: 6,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
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
  input: {
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
});
