import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../types/navigation";
import { styles } from "../styles/loginScreen_styles";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export const LoginScreen = ({ navigation }: Props) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErro("");
    setLoading(true);

    const sucesso = await login(email, senha);

    setLoading(false);

    if (!sucesso) {
      setErro("Usuário ou senha inválidos");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo-sacola.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Entrar no Cardapp</Text>

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

      {erro !== "" && <Text style={styles.error}>{erro}</Text>}

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#2563EB"
          style={{ marginTop: 16 }}
        />
      ) : (
        <Button title="Entrar" onPress={handleLogin} />
      )}

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Não possui conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};