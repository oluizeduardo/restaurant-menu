import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import home_styles from "../styles/home_styles";

export const HomeScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const [carregando, setCarregando] = useState(false);

  const MenuButton = ({
    title,
    screen,
    onPress,
    color = "#2563EB",
  }: {
    title: string;
    screen?: string;
    onPress?: () => void;
    color?: string;
  }) => (
    <TouchableOpacity
      style={[home_styles.menuItem, { backgroundColor: color }]}
      onPress={onPress ? onPress : () => navigation.navigate(screen as never)}
    >
      <Text style={home_styles.menuText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={home_styles.page}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={carregando} />
        }
      >
        <Text style={home_styles.welcome}>Bem-vindo, {user?.nome}!</Text>

        <View style={home_styles.menuContainer}>
          <MenuButton title="Cadastrar Restaurante" screen="RestaurantRegister" />
          <MenuButton title="Lista de Restaurantes" screen="RestaurantList" />
          <MenuButton title="Cadastrar Produto" screen="ProductRegister" />
          <MenuButton title="Lista de Produtos" screen="ProductList" />
          <MenuButton title="Sair" onPress={logout} color="#DC2626" />
        </View>
      </ScrollView>
    </View>
  );
};
