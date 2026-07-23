import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';

@Module({
  imports: [HttpModule],
  providers: [CurrenciesService],
  controllers: [CurrenciesController],
})
export class CurrenciesModule {}
