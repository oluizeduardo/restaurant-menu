import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../types/navigation";
import register_styles from "../styles/registerStyles";
import { STORAGE_KEYS } from "../config/storage";

interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  tipo: "cliente" | "admin";
}

export const RegisterScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState<"cliente" | "admin">("cliente");

  const validarEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert("Erro", "E-mail inválido.");
      return;
    }

    try {
      const usuariosJSON = await AsyncStorage.getItem(STORAGE_KEYS.USUARIOS);
      const usuarios: Usuario[] = usuariosJSON ? JSON.parse(usuariosJSON) : [];

      const emailExistente = usuarios.some((u) => u.email.toLowerCase() === email.toLowerCase());

      if (emailExistente) {
        Alert.alert("Erro", "Este e-mail já está cadastrado.");
        return;
      }

      const novoUsuario: Usuario = {
        id: Date.now().toString(),
        nome,
        email,
        senha,
        tipo,
      };

      usuarios.push(novoUsuario);
      await AsyncStorage.setItem(STORAGE_KEYS.USUARIOS, JSON.stringify(usuarios));

      Alert.alert("Sucesso", "Cadastro realizado com sucesso!", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível salvar o usuário.");
    }
  };

  return (
    <View style={register_styles.container}>
      <Text style={register_styles.title}>Criar Conta</Text>

      <Input label="Nome" value={nome} onChangeText={setNome} />
      <Input
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Input
        label="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <View style={register_styles.toggleContainer}>
        <TouchableOpacity onPress={() => setTipo("cliente")}>
          <Text
            style={[
              register_styles.toggle,
              tipo === "cliente" && register_styles.activeToggle,
            ]}
          >
            Cliente
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTipo("admin")}>
          <Text
            style={[
              register_styles.toggle,
              tipo === "admin" && register_styles.activeToggle,
            ]}
          >
            Admin
          </Text>
        </TouchableOpacity>
      </View>

      <Button title="Cadastrar" onPress={handleRegister} />

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={register_styles.link}>Já tem conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
};
