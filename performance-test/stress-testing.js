import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 5 }, // below normal load
    { duration: '1m', target: 5 },
    { duration: '1m', target: 5 }, // normal load
    { duration: '1m', target: 5 },
    { duration: '1m', target: 5 }, // around the breaking point
    { duration: '1m', target: 5 },
    { duration: '1m', target: 5 }, // beyond the breaking point
    { duration: '1m', target: 5 },
    { duration: '1m', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const BASE_URL = 'https://test-api.k6.io'; // make sure this is not production

  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/public/crocodiles/1/`,
      null,
      { tags: { name: 'PublicCrocs' } },
    ],
    [
      'GET',
      `${BASE_URL}/public/crocodiles/2/`,
      null,
      { tags: { name: 'PublicCrocs' } },
    ],
    [
      'GET',
      `${BASE_URL}/public/crocodiles/3/`,
      null,
      { tags: { name: 'PublicCrocs' } },
    ],
    [
      'GET',
      `${BASE_URL}/public/crocodiles/4/`,
      null,
      { tags: { name: 'PublicCrocs' } },
    ],
  ]);

  sleep(1);
}
