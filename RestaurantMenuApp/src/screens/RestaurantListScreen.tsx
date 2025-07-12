import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../types/navigation";
import { styles } from "../styles/restauranteListScreenStyles";
import { Restaurante } from "types/restaurante";
import { STORAGE_KEYS } from "../config/storage";
import { useAuth } from "../context/AuthContext";

interface Loja {
  id: string;
  nome: string;
  endereco: string;
  cnpj: string;
  latitude: string;
  longitude: string;
}

export const RestaurantListScreen = () => {
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [filtro, setFiltro] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const isFocused = useIsFocused();
  const { user } = useAuth();
  const isAdmin = user?.tipo === "admin";

  useEffect(() => {
    if (isFocused) {
      carregarLojas();
    }
  }, [isFocused]);

  const carregarLojas = async () => {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.RESTAURANTES);
    if (data) {
      setLojas(JSON.parse(data));
    }
  };

  const excluirLoja = (id: string) => {
    Alert.alert(
      "Excluir Restaurante",
      "Tem certeza que deseja excluir este restaurante?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            const atualizadas = lojas.filter((l) => l.id !== id);
            setLojas(atualizadas);
            await AsyncStorage.setItem(
              STORAGE_KEYS.RESTAURANTES,
              JSON.stringify(atualizadas)
            );
          },
        },
      ]
    );
  };

  const editarLoja = (restaurante: Restaurante) => {
    navigation.navigate("RestaurantRegister", { restaurante });
  };

  const lojasFiltradas = lojas.filter((l) =>
    l.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const renderItem = ({ item }: { item: Loja }) => (
    <View style={styles.card}>
      <View style={styles.details}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.endereco}>{item.endereco}</Text>
        <Text style={styles.cnpj}>CNPJ: {item.cnpj}</Text>
        <Text style={styles.coord}>
          Lat: {item.latitude} | Lon: {item.longitude}
        </Text>

        {isAdmin && (
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => editarLoja(item)}
              style={styles.buttonEdit}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => excluirLoja(item.id)}
              style={styles.buttonDelete}
            >
              <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar restaurante..."
        value={filtro}
        onChangeText={setFiltro}
        style={styles.input}
      />

      <FlatList
        data={lojasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum restaurante cadastrado.</Text>
        }
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};
