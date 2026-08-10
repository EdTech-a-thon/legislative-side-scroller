<script lang="ts">
  import type { Snippet } from 'svelte';
  import SiteFooter from './SiteFooter.svelte';
  import { linkClick } from './route.svelte';

  let { title, lede, children }: { title: string; lede: string; children: Snippet } = $props();
</script>

<div class="site-page">
  <header class="site-header">
    <a class="brand" href="/" onclick={(event) => linkClick(event, '/')}>
      <span>CHC</span>
      <div>CAPITOL HILL<strong>CRAWLER</strong></div>
    </a>
    <a class="site-back" href="/" onclick={(event) => linkClick(event, '/')}>← Back to game</a>
  </header>

  <main class="site-main">
    <h1>{title}</h1>
    <p class="site-lede">{lede}</p>
    {@render children()}
  </main>

  <SiteFooter />
</div>
