# FX Analytics API

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

A **FX Analytics API** é um serviço de backend construído com NestJS que fornece análises em tempo real de cotações de moedas. A API consome dados de uma fonte externa, realiza cálculos de volatilidade e risco, e os expõe através de uma API REST. O projeto também inclui um dashboard simples para visualização dos dados.

## ✨ Funcionalidades

- **Análise em Tempo Real:** Busca cotações atuais para os pares USD-BRL, EUR-BRL e BTC-BRL.
- **Dados Enriquecidos:** Calcula a **volatilidade** diária e o **nível de risco** (Baixo, Médio, Alto) com base na variação percentual.
- **API RESTful:** Expõe endpoints claros e documentados para consumo dos dados.
- **Dashboard Interativo:** Uma interface de frontend simples, construída com HTML, Tailwind CSS e Chart.js, para visualizar as análises.

---

## 🏛️ Arquitetura

O projeto é dividido em duas partes principais: um backend robusto e um frontend leve.

### Backend

Construído com **NestJS** e utilizando o **Fastify** como motor HTTP para alta performance, o backend é responsável por toda a lógica de negócio.

1.  **Controller (`CurrenciesController`):** Define as rotas da API e recebe as requisições HTTP.
2.  **Service (`CurrenciesService`):** Contém a lógica principal:
    -   Busca os dados brutos da API externa `https://economia.awesomeapi.com.br`.
    -   Formata e enriquece os dados, calculando volatilidade e risco.
    -   Trata erros de comunicação com a API externa.
3.  **Módulo (`CurrenciesModule`):** Organiza e encapsula o controller e o service, importando o `HttpModule` para realizar as chamadas externas.

### Frontend

Uma página estática (`public/index.html`) que atua como um cliente da API.

1.  **Estrutura:** HTML semântico.
2.  **Estilização:** **Tailwind CSS** para uma interface moderna e responsiva.
3.  **Visualização de Dados:** **Chart.js** para renderizar um gráfico de barras com a variação percentual das moedas.
4.  **Lógica:** JavaScript puro (`async/await`) para consumir a API e renderizar os dados dinamicamente no DOM.

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo para executar o projeto em seu ambiente local.

### Pré-requisitos

- Node.js (versão 16 ou superior)
- NPM ou Yarn

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/fx-analytics-api.git
cd fx-analytics-api
```

### 2. Instalar as Dependências

```bash
npm install
```

### 3. Executar em Modo de Desenvolvimento

Este comando iniciará o servidor NestJS com hot-reloading.

```bash
npm run start:dev
```

### 4. Acessar a Aplicação

- **API:** O servidor estará rodando em `http://localhost:3000`.
- **Dashboard:** Abra seu navegador e acesse `http://localhost:3000`. A página `index.html` será servida automaticamente.

---

## ↔️ Endpoints da API

### Obter Análise de Todas as Moedas

**`GET /currencies/analytics`**

Retorna um objeto com a análise completa de todas as moedas monitoradas.

**Exemplo de Resposta:**
```json
{
  "timestamp": "2023-10-27T19:30:00.123Z",
  "totalCurrenciesAnalyzed": 3,
  "data": [
    {
      "code": "USD",
      "name": "Dólar Americano",
      "currentPrice": 5.01,
      "highPrice": 5.05,
      "lowPrice": 4.98,
      "variation": 0.25,
      "volatility": 0.0700,
      "riskLevel": "BAIXO"
    }
    // ...outras moedas
  ]
}
```

### Obter Análise de uma Moeda Específica

**`GET /currencies/analytics/:code`**

Retorna a análise de uma moeda específica.

**Exemplo de Requisição:** `http://localhost:3000/currencies/analytics/BTC`

**Exemplo de Resposta:**
```json
{
  "code": "BTC",
  "name": "Bitcoin",
  "currentPrice": 180000.00,
  "highPrice": 182000.00,
  "lowPrice": 179500.00,
  "variation": 1.5,
  "volatility": 2500.0000,
  "riskLevel": "MEDIO"
}
```