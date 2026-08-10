<script lang="ts">
  import homeArtwork from '../Capitol Hill Crawler Home.png';

  let { canContinue, hasCertificate, onstart, oncontinue, oncertificate, oncredits }: { canContinue: boolean; hasCertificate: boolean; onstart: () => void; oncontinue: () => void; oncertificate: () => void; oncredits: () => void } = $props();
</script>

<main class="title-screen">
  <img class="title-home-art" src={homeArtwork} alt="Capitol Hill Crawler title artwork" />
  <p class="mission">Build a coalition. Master the Constitution.<br />Get your bill to the President's Desk!</p>
  <p class="special-thanks">Special thanks to Mr. AJ DiSantis, creator of Capitol Hill Crawler; Ed-Tech-a-Thon, for the tools that brought it to life; and Duncan Johnson, for seeing its value.</p>
  <div class="title-actions">
    {#if canContinue}<button class="primary" onclick={oncontinue}>CONTINUE CAMPAIGN</button>{/if}
    <button class:secondary={canContinue} class="primary" onclick={() => { if (!canContinue || confirm('Start a new campaign? Your current campaign will be replaced.')) onstart(); }}>{canContinue ? 'NEW CAMPAIGN' : 'ENTER THE HOUSE'}</button>
  </div>
  {#if hasCertificate}<button class="text-button completion-link" onclick={oncertificate}>VIEW LAST COMPLETION RECORD</button>{/if}
  <button class="text-button asset-link" onclick={oncredits}>ASSET CREDITS</button>
  <p class="controls-hint">MOVE WITH ARROW KEYS · PRESS E TO TALK</p>
</main>
