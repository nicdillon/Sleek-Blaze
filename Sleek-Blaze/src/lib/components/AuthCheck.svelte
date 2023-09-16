<script lang="ts">
  import { user } from "$lib/firebase";
</script>

<!-- If the user is not null, display the child contents. Otherwise, display a sign in prompt.  -->
{#if $user}
  <slot />
{:else}
  <p class="text-center text-danger">
    You must be signed in to view this page
    <a class="link" href="/login">Sign in</a>
  </p>
{/if}
