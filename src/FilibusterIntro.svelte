<script lang="ts">
  let { oncontinue }: { oncontinue: () => void } = $props();
</script>

<div class="modal-backdrop">
  <dialog class="filibuster-intro-panel" open aria-labelledby="filibuster-intro-title">
    <p class="eyebrow">SENATE ROSTRUM</p>
    <h2 id="filibuster-intro-title">THE FILIBUSTER</h2>
    <video autoplay muted playsinline controls onended={oncontinue} aria-label="Filibuster introduction">
      <source src="/assets/video/filibuster.mp4" type="video/mp4" />
      Your browser cannot play the Filibuster introduction.
    </video>
    <p>A filibuster is a Senate procedure that can delay or block action. To move the bill forward, earn enough support to end debate through Cloture.</p>
    <div class="filibuster-intro-actions">
      <button class="text-button" onclick={oncontinue}>SKIP INTRO</button>
      <button class="primary" onclick={oncontinue}>CONTINUE TO THE GAUNTLET →</button>
    </div>
  </dialog>
</div>
