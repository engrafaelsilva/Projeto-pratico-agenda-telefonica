export const applyPhoneMask = (value) => {
  if (!value) return "";

  const digitsOnly = value.replace(/\D/g, '');

  const truncated = digitsOnly.slice(0, 11);

  let masked = truncated;

  if (truncated.length > 10) {
    masked = `(${truncated.slice(0, 2)}) ${truncated.slice(2, 7)}-${truncated.slice(7)}`;
  } else if (truncated.length > 6) {
    masked = `(${truncated.slice(0, 2)}) ${truncated.slice(2, 6)}-${truncated.slice(6)}`;
  } else if (truncated.length > 2) {
    masked = `(${truncated.slice(0, 2)}) ${truncated.slice(2)}`;
  } else if (truncated.length > 0) {
    masked = `(${truncated}`;
  }

  return masked;
};
