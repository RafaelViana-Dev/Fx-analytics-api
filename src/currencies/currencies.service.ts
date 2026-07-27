import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AwesomeApiGlobalResponse } from './interfaces/awesome-api.interface';

@Injectable()
export class CurrenciesService {
  private readonly logger = new Logger(CurrenciesService.name);
  private readonly apiUrl =
    'https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL';

  constructor(private readonly httpService: HttpService) {}

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
}
