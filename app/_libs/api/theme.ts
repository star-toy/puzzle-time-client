import mockData from '@/app/_mocks/theme-detail.json';

import type { IThemeDetail } from '@/app/_types/theme';

// eslint-disable-next-line @typescript-eslint/require-await
export async function getTheme(uid: string): Promise<IThemeDetail> {
  console.log(uid);
  // 실제 API 호출로 교체될 부분
  return mockData;
}
