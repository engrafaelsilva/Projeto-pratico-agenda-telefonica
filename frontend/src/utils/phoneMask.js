export const applyPhoneMask = (value) => {
  if (!value) return "";

  // 1. Remove tudo que não é dígito
  const digitsOnly = value.replace(/\D/g, '');

  // 2. Limita o tamanho para 11 dígitos (máximo para celular no Brasil)
  const truncated = digitsOnly.slice(0, 11);

  let masked = truncated;

  // 3. Aplica a máscara dinamicamente durante a digitação
  if (truncated.length > 10) {
    // Formato para celular: (XX) XXXXX-XXXX
    masked = `(${truncated.slice(0, 2)}) ${truncated.slice(2, 7)}-${truncated.slice(7)}`;
  } else if (truncated.length > 6) {
    // Formato para telefone fixo: (XX) XXXX-XXXX
    masked = `(${truncated.slice(0, 2)}) ${truncated.slice(2, 6)}-${truncated.slice(6)}`;
  } else if (truncated.length > 2) {
    // Formato inicial com DDD: (XX) ...
    masked = `(${truncated.slice(0, 2)}) ${truncated.slice(2)}`;
  } else if (truncated.length > 0) {
    // Formato inicial do DDD: (X...
    masked = `(${truncated}`;
  }

  return masked;
};
