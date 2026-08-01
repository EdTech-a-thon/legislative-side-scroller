<script lang="ts">
  let { votes, oncontinue }: { votes: number; oncontinue: () => void } = $props();
  let vetoProof = $derived(votes >= 290);
</script>

<div class="modal-backdrop">
  <dialog class="passage-panel" open aria-labelledby="passage-title">
    <p class="eyebrow">HOUSE ROLL CALL COMPLETE</p>
    <h2 id="passage-title">THE BILL<br /><span>PASSES!</span></h2>
    <p>The Connected Classrooms Act has passed the House with <strong>{votes} votes</strong>.</p>
    <video class="house-senate-video" autoplay muted playsinline controls aria-label="House passage transition showing the Senate doors unlocking"><source src="/assets/video/house-to-senate.mp4" type="video/mp4" />Your browser cannot play this transition video.</video>
    <p class="passage-result">{vetoProof ? 'You have secured the two-thirds House support needed for a future veto override. Keep building Senate support to make the bill fully veto-proof.' : 'The transition above shows the Senate doors opening in the Rotunda. You may proceed, or remain on the House floor to earn more Influence, Notebook entries, and additional support.'}</p>
    <button class="primary" onclick={oncontinue}>CONTINUE TO THE ROTUNDA →</button>
  </dialog>
</div>
