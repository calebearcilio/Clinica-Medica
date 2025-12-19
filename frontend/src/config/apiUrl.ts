export const getUrlApi = (): string => {
  return import.meta.env.VITE_API_URL ?? "http://localhost:3333";
};

const BASE_URL_API = getUrlApi();

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL_API}/secretarios/login`,
  SECRETARIO: `${BASE_URL_API}/secretarios`,
  MEDICOS: `${BASE_URL_API}/medicos`,
  PACIENTES: `${BASE_URL_API}/pacientes`,
  CONSULTAS: `${BASE_URL_API}/consultas`,
};
