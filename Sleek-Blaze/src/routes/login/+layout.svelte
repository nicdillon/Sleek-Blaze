<script lang="ts">
    import type { LayoutData } from './$types';
    
    export let data: LayoutData;
</script>
<main>
    <div>
        <slot></slot>
    </div>
</main>
