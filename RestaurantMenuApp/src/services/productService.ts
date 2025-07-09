import AsyncStorage from "@react-native-async-storage/async-storage";
import { Produto } from "../types/produto";
import { STORAGE_KEYS } from "../config/storage";

export async function salvarProduto(produto: Produto): Promise<void> {
  const data = await AsyncStorage.getItem(STORAGE_KEYS.PRODUTOS);
  const produtos: Produto[] = data ? JSON.parse(data) : [];

  const index = produtos.findIndex((p) => p.id === produto.id);

  if (index !== -1) {
    produtos[index] = produto; // Atualiza
  } else {
    produtos.push(produto); // Novo
  }

  await AsyncStorage.setItem(STORAGE_KEYS.PRODUTOS, JSON.stringify(produtos));
}

export async function listarProdutos(): Promise<Produto[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEYS.PRODUTOS);
  return data ? JSON.parse(data) : [];
}

export async function atualizarProduto(produto: Produto): Promise<void> {
  await salvarProduto(produto); 
}

export async function excluirProdutoPorId(id: string): Promise<void> {
  const produtos = await listarProdutos();
  const atualizados = produtos.filter((p) => p.id !== id);
  await AsyncStorage.setItem(STORAGE_KEYS.PRODUTOS, JSON.stringify(atualizados));
}
