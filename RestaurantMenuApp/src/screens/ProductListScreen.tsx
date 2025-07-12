import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../types/navigation";
import { Produto } from "../types/produto";
import {
  listarProdutos,
  excluirProdutoPorId,
} from "../services/productService";
import { produto_styles } from "../styles/produtoStyles";
import { useAuth } from "../context/AuthContext";

export const ProductListScreen = () => {
  const { user } = useAuth();
  const isAdmin = user?.tipo === "admin";

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filtro, setFiltro] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      carregarProdutos();
    }
  }, [isFocused]);

  const carregarProdutos = async () => {
    try {
      const lista = await listarProdutos();
      setProdutos(lista);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  const excluirProduto = (id: string) => {
    Alert.alert("Excluir Produto", "Tem certeza que deseja excluir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await excluirProdutoPorId(id);
          carregarProdutos();
        },
      },
    ]);
  };

  const editarProduto = (produto: Produto) => {
    navigation.navigate("ProductRegister", { produto });
  };

  const renderItem = ({ item }: { item: Produto }) => (
    <View style={produto_styles.card}>
      <Image
        source={
          item.imagem
            ? { uri: item.imagem }
            : require("../assets/placeholder-image.png")
        }
        style={produto_styles.image}
      />
      <View style={produto_styles.details}>
        <Text style={produto_styles.nome}>{item.nome}</Text>
        <Text style={produto_styles.descricao}>{item.descricao}</Text>
        <Text style={produto_styles.preco}>R$ {item.preco}</Text>

        {isAdmin && (
          <View style={produto_styles.actions}>
            <TouchableOpacity
              onPress={() => editarProduto(item)}
              style={produto_styles.buttonEdit}
            >
              <Text style={produto_styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => excluirProduto(item.id)}
              style={produto_styles.buttonDelete}
            >
              <Text style={produto_styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <View style={produto_styles.containerList}>
      <TextInput
        placeholder="Buscar produto..."
        value={filtro}
        onChangeText={setFiltro}
        style={produto_styles.input}
      />

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={produto_styles.empty}>Nenhum produto cadastrado.</Text>
        }
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};
