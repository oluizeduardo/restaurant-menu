import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "../types/navigation";
import { Produto } from "../types/produto";
import { salvarProduto } from "../services/productService";
import { produto_styles } from "../styles/produto_styles";

type Props = NativeStackScreenProps<AppStackParamList, "ProductRegister">;

export const ProductRegisterScreen = ({ route, navigation }: Props) => {
  const produtoEdicao = route.params?.produto;

  const [nome, setNome] = useState(produtoEdicao?.nome || "");
  const [descricao, setDescricao] = useState(produtoEdicao?.descricao || "");
  const [preco, setPreco] = useState(produtoEdicao?.preco || "");
  const [imagem, setImagem] = useState(produtoEdicao?.imagem || "");

  useEffect(() => {
    if (produtoEdicao) {
      navigation.setOptions({ title: "Editar Produto" });
    }
  }, []);

  const limparCampos = () => {
    setNome("");
    setDescricao("");
    setPreco("");
    setImagem("");
  };

  const selecionarImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão negada",
        "Precisamos de acesso à galeria para selecionar imagens."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImagem(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!nome || !descricao || !preco) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    const id = produtoEdicao?.id ?? Date.now().toString();

    const novoProduto: Produto = {
      id,
      nome,
      descricao,
      preco,
      imagem,
    };

    try {
      await salvarProduto(novoProduto);

      Alert.alert(
        "Sucesso",
        produtoEdicao
          ? "Produto atualizado com sucesso!"
          : "Produto cadastrado com sucesso!"
      );

      if (produtoEdicao) {
        navigation.goBack();
      } else {
        limparCampos();
        navigation.navigate("ProductList");
      }
    } catch (error) {
      Alert.alert("Erro", "Erro ao salvar o produto.");
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={produto_styles.container}>
        <Text style={produto_styles.title}>
          {produtoEdicao ? "Editar Produto" : "Cadastro de Produto"}
        </Text>

        <Input label="Nome do Produto" value={nome} onChangeText={setNome} />
        <Input
          label="Descrição"
          value={descricao}
          onChangeText={setDescricao}
        />
        <Input
          label="Preço"
          value={preco}
          onChangeText={setPreco}
          keyboardType="numeric"
        />

        <Button title="Selecionar Imagem" onPress={selecionarImagem} />

        {imagem !== "" && (
          <Image source={{ uri: imagem }} style={produto_styles.previewImage} />
        )}

        <Button
          title={produtoEdicao ? "Salvar Alterações" : "Cadastrar Produto"}
          onPress={handleSubmit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
