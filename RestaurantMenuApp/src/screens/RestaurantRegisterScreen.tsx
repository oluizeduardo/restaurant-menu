import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { validarCNPJ } from "../utils/validators";
import { formatarCNPJ } from "../utils/masks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "../types/navigation";
import { Restaurante } from "../types/restaurante";
import { styles } from "../styles/restauranteRegisterScreenStyles";
import { STORAGE_KEYS } from "../config/storage";
import { getGeoLocationFromCep } from "../services/geolocationService";

type Props = NativeStackScreenProps<AppStackParamList, "RestaurantRegister">;

export const RestaurantRegisterScreen = ({ route, navigation }: Props) => {
  const restauranteEdit = route.params?.restaurante;

  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cep, setCep] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [localizacao, setLocalizacao] = useState("");

  useEffect(() => {
    if (restauranteEdit) {
      setNome(restauranteEdit.nome);
      setEndereco(restauranteEdit.endereco);
      setCnpj(restauranteEdit.cnpj);
      setCep(restauranteEdit.cep);
      setLatitude(restauranteEdit.latitude);
      setLongitude(restauranteEdit.longitude);
      setLocalizacao(
        restauranteEdit.latitude && restauranteEdit.longitude
          ? `Lat: ${parseFloat(restauranteEdit.latitude).toFixed(
              5
            )}, Lng: ${parseFloat(restauranteEdit.longitude).toFixed(5)}`
          : ""
      );
    }
  }, [restauranteEdit]);

  const limparCampos = () => {
    setNome("");
    setEndereco("");
    setCnpj("");
    setCep("");
    setLatitude("");
    setLongitude("");
    setLocalizacao("");
  };

  const handleBuscarLocalizacao = async () => {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;

    const geo = await getGeoLocationFromCep(cepLimpo);

    if (!geo) {
      Alert.alert("Erro", "CEP inválido ou localização não encontrada.");
      setLocalizacao("");
      setLatitude("");
      setLongitude("");
      return;
    }

    setLatitude(geo.lat.toString());
    setLongitude(geo.lng.toString());
    setLocalizacao(`Lat: ${geo.lat.toFixed(5)}, Lng: ${geo.lng.toFixed(5)}`);
  };

  const handleSubmit = async () => {
    if (!nome || !endereco || !cnpj || !cep) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    if (!validarCNPJ(cnpj)) {
      Alert.alert("Erro", "CNPJ inválido!");
      return;
    }

    try {
      const dadosExistentes = await AsyncStorage.getItem(STORAGE_KEYS.RESTAURANTES);
      const restaurantes = dadosExistentes ? JSON.parse(dadosExistentes) : [];

      if (restauranteEdit) {
        const restaurantesAtualizados = restaurantes.map((r: Restaurante) =>
          r.id === restauranteEdit.id
            ? { ...r, nome, endereco, cep, cnpj, latitude, longitude }
            : r
        );
        await AsyncStorage.setItem(STORAGE_KEYS.RESTAURANTES, JSON.stringify(restaurantesAtualizados));
        Alert.alert("Sucesso", "Restaurante atualizado com sucesso!");
      } else {
        const novoRestaurante: Restaurante = {
          id: Date.now().toString(),
          nome,
          endereco,
          cnpj, 
          cep,
          latitude,
          longitude,
        };
        restaurantes.push(novoRestaurante);
        await AsyncStorage.setItem(STORAGE_KEYS.RESTAURANTES, JSON.stringify(restaurantes));
        Alert.alert("Sucesso", "Restaurante cadastrado com sucesso!");
        limparCampos();
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar restaurante.");
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>
            {restauranteEdit ? "Editar Restaurante" : "Cadastro de Restaurante"}
          </Text>

          <Input
            label="Nome do Restaurante"
            value={nome}
            onChangeText={setNome}
          />
          <Input label="Endereço" value={endereco} onChangeText={setEndereco} />
          <Input
            label="CNPJ"
            value={cnpj}
            onChangeText={(text) => setCnpj(formatarCNPJ(text))}
            keyboardType="numeric"
          />
          <Input
            label="CEP"
            value={cep}
            onChangeText={setCep}
            onBlur={handleBuscarLocalizacao}
            keyboardType="numeric"
          />
          <Input label="Localização" value={localizacao} editable={false} />

          <View style={{ marginTop: 24 }}>
            <Button
              title={
                restauranteEdit ? "Salvar Alterações" : "Cadastrar Restaurante"
              }
              onPress={handleSubmit}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
