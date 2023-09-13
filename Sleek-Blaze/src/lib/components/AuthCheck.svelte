<script lang="ts">
  import { user } from "$lib/firebase";
</script>

{#if $user}
    <slot/>
{:else}
    <p class="text-center text-danger">You must be signed in to view this page
        <a class="link" href="/login">Sign in</a>
    </p>
{/if}
