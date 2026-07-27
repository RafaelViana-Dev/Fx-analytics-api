import { Controller, Get, Param } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import {
  AnalyticsResponseDto,
  CurrencyDetailDto,
} from './dto/currency-analytics.dto';
import { AwesomeApiGlobalResponse } from './interfaces/awesome-api.interface';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get('raw')
  async getRawRates(): Promise<AwesomeApiGlobalResponse> {
    return this.currenciesService.fetchRawRates();
  }

  @Get('analytics')
  async getAnalytics(): Promise<AnalyticsResponseDto> {
    return this.currenciesService.getAnalytics();
  }

  // Nova rota parametrizada (deve ficar abaixo das rotas estáticas)
  @Get('analytics/:code')
  async getAnalyticsByCode(
    @Param('code') code: string,
  ): Promise<CurrencyDetailDto> {
    return this.currenciesService.getAnalyticsByCode(code);
  }
}
