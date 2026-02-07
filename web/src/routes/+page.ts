import { getFormatter } from '$lib/utils/i18n';
import { init } from '$lib/utils/server';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const ssr = false;
export const csr = true;

export const load = (async ({ fetch }) => {
  try {
    await init(fetch);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (redirectError: any) {
    if (redirectError?.status === 307) {
      throw redirectError;
    }
  }

  const $t = await getFormatter();

  return {
    meta: {
      title: $t('welcome') + ' 🎉',
      description: 'Web Interface',
    },
  };
}) satisfies PageLoad;
