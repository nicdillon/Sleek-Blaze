<script>
  import { fly } from "svelte/transition";
  import { page } from "$app/stores";
</script>

<!-- // Everytime the url changes, the contained elements will be deleteDoc, triggering a rerender and the fly animation -->
{#key $page.url}
  <div in:fly={{ x: "-100%", duration: 500 }}>
    <slot />
  </div>
{/key}
