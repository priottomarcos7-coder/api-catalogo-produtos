import http from 'k6/http';
import { check, sleep } from 'k6';

// Execute a partir da raiz do repositório.
// Para apontar para outra URL: k6 run -e BASE_URL=http://host:porta performance-k6/produtos-load-test.js
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3333';

export const options = {
  vus: 5,
  duration: '15s',
};

export default function () {
  const response = http.get(`${BASE_URL}/produtos`);

  check(response, {
    'status deve ser 200': (res) => res.status === 200,
    'resposta deve ser um array JSON': (res) => {
      try {
        return Array.isArray(res.json());
      } catch {
        return false;
      }
    },
  });

  sleep(1);
}
