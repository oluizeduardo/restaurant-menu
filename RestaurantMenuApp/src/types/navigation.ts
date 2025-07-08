// navigation.ts - criado automaticamente
import { Loja } from "./restaurante";
import { Produto } from "./produto";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  StoreRegister: { loja?: Loja };
  ProductRegister: { produto?: Produto };
  ProductList: undefined;
  StoreList: undefined;
};
