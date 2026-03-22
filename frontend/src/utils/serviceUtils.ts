export const postFormatCpf = (value: string): string => {
  return value.replace(/\D/g, "");
};

export const postFormatPhone = (value: string): string => {
  return value.replace(/\D/g, "");
};

export const postFormatCrm = (value: string): string=> {
  return value.replace("-","");
}