export function normalizeUrl(str: string) {
  return str
    .normalize("NFD") // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .toLowerCase() // minúsculas
    .replace(/\s+/g, "-"); // troca espaços por hífen
}
