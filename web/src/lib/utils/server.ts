import { featureFlagsManager } from '$lib/managers/feature-flags-manager.svelte';
import { serverConfigManager } from '$lib/managers/server-config-manager.svelte';
import { initLanguage } from '$lib/utils';
import { defaults } from '@server/sdk';
import { memoize } from 'lodash-es';

type Fetch = typeof fetch;

async function _init(fetch: Fetch) {
  // set event.fetch on the fetch-client used by @server/sdk
  // https://kit.svelte.dev/docs/load#making-fetch-requests
  // https://github.com/oazapfts/oazapfts/blob/main/README.md#fetch-options
  defaults.fetch = fetch;
  await initLanguage();
  await serverConfigManager.init();
}

export const init = memoize(_init, () => 'singlevalue');
