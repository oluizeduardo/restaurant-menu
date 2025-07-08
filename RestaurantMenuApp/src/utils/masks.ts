// masks.ts - criado automaticamente
/**
 * Aplica a máscara de CNPJ no formato XX.XXX.XXX/XXXX-XX
 */
export const formatarCNPJ = (cnpj: string): string => {
  const digits = cnpj.replace(/\D/g, "").slice(0, 14);
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
};
