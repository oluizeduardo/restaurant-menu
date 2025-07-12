import React, { useState } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { useAuth } from "../context/AuthContext";
import home_styles from "../styles/homeStyles";
import { MenuButton } from "components/MenuButton";
import { icons } from "utils/icons";

export const HomeScreen = () => {
  const { user, logout } = useAuth();
  const [carregando, setCarregando] = useState(false);

  const isAdmin = user?.tipo === "admin";

  return (
    <View style={home_styles.page}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        keyboardShouldPersistTaps="handled"
        refreshControl={<RefreshControl refreshing={carregando} />}
      >
        <Text style={home_styles.welcome}>Bem-vindo, {user?.nome}!</Text>

        <View style={home_styles.menuContainer}>
          {isAdmin && (
            <MenuButton
              title="Cadastrar Restaurante"
              screen="RestaurantRegister"
              icon={icons.restaurant}
            />
          )}

          <MenuButton
            title="Lista de Restaurantes"
            screen="RestaurantList"
            icon={icons.restaurant}
          />

          {isAdmin && (
            <MenuButton
              title="Cadastrar Produto"
              screen="ProductRegister"
              icon={icons.product}
            />
          )}

          <MenuButton
            title="Lista de Produtos"
            screen="ProductList"
            icon={icons.product}
          />

          <MenuButton
            title="Sair"
            onPress={logout}
            color="#DC2626"
            icon={icons.logout}
          />
        </View>
      </ScrollView>
    </View>
  );
};
