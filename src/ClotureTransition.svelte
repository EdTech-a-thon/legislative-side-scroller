<script lang="ts">
  let { oncontinue }: { oncontinue: () => void } = $props();
  let videoEnded = $state(false);
  let videoFailed = $state(false);
</script>

<div class="modal-backdrop">
  <dialog class="cloture-card video-transition" open aria-labelledby="cloture-title">
    <p class="eyebrow">SENATE FLOOR · FILIBUSTER CLEARED</p>
    <h2 id="cloture-title">THE BILL<br /><span>PASSED!</span></h2>
    {#if !videoFailed}
      <video class="bill-passed-video" autoplay playsinline onended={() => videoEnded = true} onerror={() => videoFailed = true}>
        <source src="/media-1785394158061.mp4" type="video/mp4" />
      </video>
    {:else}
      <div class="courier-scene" aria-hidden="true"><div class="capitol-mini">⌂</div><div class="courier">▰</div><div class="white-house-mini">⌂</div></div>
    {/if}
    <p><strong>Cloture</strong> ends Senate debate in this simplified classroom model. Your bill has cleared the Senate and is on its way to the White House.</p>
    <button class="primary" onclick={oncontinue}>{videoEnded || videoFailed ? 'NEXT STOP: THE WHITE HOUSE →' : 'SKIP TO THE WHITE HOUSE →'}</button>
  </dialog>
</div>
