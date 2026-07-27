import { Controller, Get } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { AnalyticsResponseDto } from './dto/currency-analytics.dto';
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
}
