
# API Proxy Server with Rate Limiting, Caching, and Authentication

This is a Node.js project that acts as a proxy server for external APIs, implementing rate limiting, caching, and basic authentication. The server fetches data from a public API and caches the results to reduce redundant requests.

## Features

- Proxy API Endpoint: Acts as a proxy for a public API (e.g., Weather API).
- Rate Limiting: Limits requests to 5 per minute per IP address.
- Caching: Caches successful API responses for 5 minutes.
- Error Handling: Handles errors for external API calls.
- Logging: Logs each request with timestamp, IP address, and rate limit status.
- Authentication: Simple token-based authentication for the proxy endpoint.


## Setup

### Prerequisites

- Node.js installed on your system.
- Create a GitHub repository and clone it.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vaiiibhavvvv/api-proxy-server
   cd api-proxy-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following content:

   ```bash
   # API Configuration
   API_BASE_URL="https://api.openweathermap.org/data/2.5/weather"
   API_KEY_NAME="appid"
   API_KEY_VALUE="your_api_key"

   # Server Configuration
   PORT=5000

   # Rate Limiting Configuration
   RATE_LIMIT_MAX=5
   RATE_LIMIT_WINDOW_MS=60

   # Cache Configuration
   CACHE_DURATION=5 minutes

   # Authentication
   AUTH_TOKEN="your_secret_token"
   ```

4. Run the server:
   ```bash
   npm start
   ```

## API Endpoints

- `GET /api`: Fetches data from the external weather API, with rate limiting and caching applied.
  
 

## Environment Variables

- API_BASE_URL: Base URL for the external API.
- API_KEY_NAME: Name of the API key.
- API_KEY_VALUE: API key value.
- PORT: The port on which the server runs.
- RATE_LIMIT_MAX: Maximum requests allowed per IP in a given time window.
- RATE_LIMIT_WINDOW_MS: Time window for rate limiting (in milliseconds).
- CACHE_DURATION: Duration to cache the API responses.
- AUTH_TOKEN: Token for securing the proxy endpoint.
