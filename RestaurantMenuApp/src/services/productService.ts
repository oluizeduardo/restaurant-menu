import AsyncStorage from "@react-native-async-storage/async-storage";
import { Produto } from "../types/produto";

const STORAGE_KEY = "@CatalogoDigitalApp:produtos";

export async function salvarProduto(produto: Produto): Promise<void> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  const produtos: Produto[] = data ? JSON.parse(data) : [];

  const index = produtos.findIndex((p) => p.id === produto.id);

  if (index !== -1) {
    produtos[index] = produto; // Atualiza
  } else {
    produtos.push(produto); // Novo
  }

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
}

export async function listarProdutos(): Promise<Produto[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function atualizarProduto(produto: Produto): Promise<void> {
  await salvarProduto(produto); // ✅ pode delegar para salvarProduto agora
}

export async function excluirProdutoPorId(id: string): Promise<void> {
  const produtos = await listarProdutos();
  const atualizados = produtos.filter((p) => p.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(atualizados));
}
