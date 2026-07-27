import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  // Nova Rota Raiz (Resolve o 404 em localhost:3000)
  @Get()
  getHome() {
    return {
      message: 'API FX Analytics está rodando perfeitamente! 🚀',
      dashboard_url: 'http://localhost:3000/dashboard/',
      health_check: 'http://localhost:3000/health',
      available_endpoints: [
        'GET /currencies/raw',
        'GET /currencies/analytics',
        'GET /currencies/analytics/:code',
      ],
      timestamp: new Date().toISOString(),
    };
  }

  // Rota de Health Check que criamos na Task 01
  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
