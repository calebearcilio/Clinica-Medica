export const putFormatCpf = (value: string): string => {
  return value.replace(/\D/g, "");
};

export const putFormatPhone = (value: string): string => {
  return value.replace(/\D/g, "");
};