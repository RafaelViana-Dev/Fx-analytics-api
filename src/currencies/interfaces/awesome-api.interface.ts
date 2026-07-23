export interface CurrencyRawResponse {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
}

export interface AwesomeApiGlobalResponse {
  USDBRL: CurrencyRawResponse;
  EURBRL: CurrencyRawResponse;
  BTCBRL: CurrencyRawResponse;
}
