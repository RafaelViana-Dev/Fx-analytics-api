import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  AwesomeApiGlobalResponse,
  CurrencyRawResponse,
} from './interfaces/awesome-api.interface';
import {
  AnalyticsResponseDto,
  CurrencyDetailDto,
} from './dto/currency-analytics.dto';

@Injectable()
export class CurrenciesService {
  private readonly logger = new Logger(CurrenciesService.name);
  private readonly apiUrl =
    'https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL';

  constructor(private readonly httpService: HttpService) {}

  // Mantemos o método fetchRawRates intacto com seu excelente tratamento de erro
  async fetchRawRates(): Promise<AwesomeApiGlobalResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<AwesomeApiGlobalResponse>(this.apiUrl),
      );
      return response.data;
    } catch (error) {
      const errorMessage = 'Falha ao buscar as cotações da API externa';
      if (error instanceof Error) {
        this.logger.error(errorMessage, error.stack);
      } else {
        this.logger.error(errorMessage, error);
      }

      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: `${errorMessage}. Tente novamente mais tarde.`,
        },
        HttpStatus.BAD_GATEWAY,
        { cause: error },
      );
    }
  }

  // --- REGRAS DE NEGÓCIO OTIMIZADAS ---

  private calculateRiskLevel(variation: number): 'BAIXO' | 'MEDIO' | 'ALTO' {
    if (isNaN(variation)) return 'BAIXO'; // Fallback de segurança

    const absVar = Math.abs(variation);
    if (absVar >= 2.0) return 'ALTO';
    if (absVar >= 0.8) return 'MEDIO';
    return 'BAIXO';
  }

  private formatCurrencyData(raw: CurrencyRawResponse): CurrencyDetailDto {
    // Conversão segura prevenindo falhas caso a API envie dados nulos/ausentes
    const bid = parseFloat(raw?.bid) || 0;
    const high = parseFloat(raw?.high) || 0;
    const low = parseFloat(raw?.low) || 0;
    const pctChange = parseFloat(raw?.pctChange) || 0;

    return {
      code: raw?.code || 'UNKNOWN',
      name: raw?.name ? raw.name.split('/')[0] : 'Desconhecido',
      currentPrice: bid,
      highPrice: high,
      lowPrice: low,
      variation: pctChange,
      volatility: Number((high - low).toFixed(4)),
      riskLevel: this.calculateRiskLevel(pctChange),
    };
  }

  async getAnalytics(): Promise<AnalyticsResponseDto> {
    const rawData = await this.fetchRawRates();

    // Mapeamento dinâmico: Não importa se a API retorna 3 ou 50 moedas,
    // o código processa automaticamente todas as chaves do objeto.
    const formattedData = Object.values(rawData).map((currencyItem) =>
      this.formatCurrencyData(currencyItem),
    );

    return {
      timestamp: new Date().toISOString(),
      totalCurrenciesAnalyzed: formattedData.length,
      data: formattedData,
    };
  }
}
