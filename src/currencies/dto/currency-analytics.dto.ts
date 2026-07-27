export class CurrencyDetailDto {
  code!: string;
  name!: string;
  currentPrice!: number;
  highPrice!: number;
  lowPrice!: number;
  variation!: number;
  volatility!: number;
  riskLevel!: 'BAIXO' | 'MEDIO' | 'ALTO';
}

export class AnalyticsResponseDto {
  timestamp!: string;
  totalCurrenciesAnalyzed!: number;
  data!: CurrencyDetailDto[];
}
