<script>
    import { crossfade, fly } from "svelte/transition";
    import { page } from "$app/stores";
</script>

{#key $page.url}
<div in:crossfade={{ duration: 500 }}>
    <slot/>
</div>
{/key}