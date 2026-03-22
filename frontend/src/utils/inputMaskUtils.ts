/**
 * Máscara para CPF, formato: 000.000.000-00
 */
export const maskCPF = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1")
    .slice(0, 15);
};

/**
 * Máscara para telefone, formato: +00 (00) 00000-0000
 */
export const maskTelefone = (value: string | undefined): string => {
  if (!value) {
    return "";
  }

  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "+$1 ($2")
    .replace(/(\d{2})(\d)/, "$1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 19);
};

/**
 * Máscara para CRM, formato: UF-0000
 */
export const maskCrm = (value: string): string => {
  return value
  .toUpperCase()
  .replace(/[^A-Z0-9]/g, "")
  .replace(/^([A-Z]{2})([0-9]{0,4})/, "$1-$2")
  .replace(/-$/, "")
  .slice(0,7)
};
