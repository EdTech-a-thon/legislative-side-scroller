<script lang="ts">
  let { houseVotes, senateVotes, onreturn }: { houseVotes: number; senateVotes: number; onreturn: () => void } = $props();
  let houseReady = $derived(houseVotes >= 290);
  let senateReady = $derived(senateVotes >= 67);
</script>

<div class="modal-backdrop"><dialog class="override-panel" open aria-labelledby="override-title">
  <p class="eyebrow">PRESIDENTIAL VETO</p><h2 id="override-title">VETO OVERRIDE</h2>
  <p>The President did not sign the bill. Congress can still make it law with a two-thirds majority in both chambers.</p>
  <div class="override-counts"><div class:ready={houseReady}><span>HOUSE</span><strong>{houseVotes} / 290</strong></div><div class:ready={senateReady}><span>SENATE</span><strong>{senateVotes} / 67</strong></div></div>
  <p>{houseReady && senateReady ? 'Both override thresholds are secured. Return to the Oval Office to finalize the bill becoming law.' : 'Return to the House or Senate to build the two-thirds support needed for an override.'}</p>
  <button class="primary" onclick={onreturn}>RETURN TO CONGRESS →</button>
</dialog></div>
