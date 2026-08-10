<script lang="ts">
  import { linkClick } from './route.svelte';
</script>

<footer class="site-footer">
  <a href="/about" onclick={(event) => linkClick(event, '/about')}>about</a>
  <a href="/privacy" onclick={(event) => linkClick(event, '/privacy')}>privacy</a>
</footer>
