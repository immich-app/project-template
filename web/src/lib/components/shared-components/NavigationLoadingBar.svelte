<script lang="ts">
  import { onMount } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import { Tween } from 'svelte/motion';

  let showing = $state(false);

  // delay showing any progress for a little bit so very fast loads
  // do not cause flicker
  const delay = 100;

  const progress = new Tween(0, {
    duration: 1000,
    easing: cubicOut,
  });

  function animate() {
    showing = true;
    void progress.set(90);
  }

  onMount(() => {
    const timer = setTimeout(animate, delay);
    return () => clearTimeout(timer);
  });
</script>

{#if showing}
  <div class="absolute start-0 top-0 h-0.75 w-dvw bg-white">
    <span class="absolute h-0.75 bg-immich-primary" style:width={`${progress}%`}></span>
  </div>
{/if}
