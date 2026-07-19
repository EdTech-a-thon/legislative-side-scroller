<script lang="ts">
  let { canContinue, onstart, oncontinue }: { canContinue: boolean; onstart: () => void; oncontinue: () => void } = $props();
</script>

<main class="title-screen">
  <div class="title-stars">★ ★ ★</div>
  <p class="kicker">A CIVICS QUEST</p>
  <h1>CAPITOL HILL<br /><span>CRAWLER</span></h1>
  <div class="capitol-art" aria-hidden="true">
    <div class="dome"></div><div class="drum"></div><div class="building"></div>
  </div>
  <p class="mission">Build a coalition. Master the Constitution.<br />Get your bill to 218.</p>
  <div class="title-actions">
    {#if canContinue}<button class="primary" onclick={oncontinue}>CONTINUE CAMPAIGN</button>{/if}
    <button class:secondary={canContinue} class="primary" onclick={onstart}>{canContinue ? 'NEW CAMPAIGN' : 'ENTER THE HOUSE'}</button>
  </div>
  <p class="controls-hint">MOVE WITH ← → OR A D · PRESS E TO TALK</p>
</main>
