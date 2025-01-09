import { fetchWithAuth } from '@/app/_libs/http-client';

export async function someApiCall() {
  const response = await fetchWithAuth('/api/some-endpoint');
  // Handle response...
}
