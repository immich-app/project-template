<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/state';
  import ErrorLayout from '$lib/components/layouts/ErrorLayout.svelte';
  import AppleHeader from '$lib/components/shared-components/AppleHeader.svelte';
  import NavigationLoadingBar from '$lib/components/shared-components/NavigationLoadingBar.svelte';
  import { eventManager } from '$lib/managers/event-manager.svelte';
  import { TooltipProvider, toastManager } from '@immich/ui';
  import { onMount, type Snippet } from 'svelte';
  import '../app.css';

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();

  let showNavigationLoadingBar = $state(false);

  toastManager.setOptions({ class: 'top-16' });

  onMount(() => {
    const element = document.querySelector('#stencil');
    element?.remove();
  });

  eventManager.emit('AppInit');

  afterNavigate(() => {
    showNavigationLoadingBar = false;
  });
</script>

<svelte:head>
  <title>{page.data.meta?.title || 'Web'}</title>
  <link rel="manifest" href="/manifest.json" crossorigin="use-credentials" />
  <meta name="theme-color" content="currentColor" />
  <AppleHeader />

  {#if page.data.meta}
    <meta name="description" content={page.data.meta.description} />
  {/if}
</svelte:head>

<TooltipProvider>
  {#if page.data.error}
    <ErrorLayout error={page.data.error}></ErrorLayout>
  {:else}
    {@render children?.()}
  {/if}

  {#if showNavigationLoadingBar}
    <NavigationLoadingBar />
  {/if}
</TooltipProvider>
