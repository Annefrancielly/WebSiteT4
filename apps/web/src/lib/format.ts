/**
 * Formatação monetária da aplicação.
 *
 * Recebe CENTAVOS e não reais: valores monetários são mantidos como inteiros
 * em todo o domínio para não acumular erro de ponto flutuante, e a conversão
 * acontece apenas aqui, na borda de exibição.
 */
export function formatBRL(cents: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}
