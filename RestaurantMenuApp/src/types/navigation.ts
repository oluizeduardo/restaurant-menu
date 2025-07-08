import { Restaurante } from "./restaurante";
import { Produto } from "./produto";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  RestaurantRegister: { restaurante?: Restaurante };
  ProductRegister: { produto?: Produto };
  ProductList: undefined;
  RestaurantList: undefined;
};
