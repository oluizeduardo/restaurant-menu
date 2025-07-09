import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { RestaurantRegisterScreen } from "../screens/RestaurantRegisterScreen";
import { ProductRegisterScreen } from "../screens/ProductRegisterScreen";
import { ProductListScreen } from "../screens/ProductListScreen";
import { RestaurantListScreen } from "../screens/RestaurantListScreen";
import { ActivityIndicator, View } from "react-native";
import { AuthStackParamList, AppStackParamList } from "../types/navigation";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

export function Routes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AppStack.Navigator id={undefined}>
          <AppStack.Screen name="Home" component={HomeScreen} />
          <AppStack.Screen name="RestaurantRegister" component={RestaurantRegisterScreen} />
          <AppStack.Screen name="ProductRegister" component={ProductRegisterScreen} />
          <AppStack.Screen name="ProductList" component={ProductListScreen} />
          <AppStack.Screen name="RestaurantList" component={RestaurantListScreen} />
        </AppStack.Navigator>
      ) : (
        <AuthStack.Navigator id={undefined}>
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}
