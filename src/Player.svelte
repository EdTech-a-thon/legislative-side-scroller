<script lang="ts">
  let { x }: { x: number } = $props();
</script>

<div class="player" style:left={`${x}px`} aria-label="Your character">
  <div class="player-head"><span></span></div>
  <div class="player-body"></div>
  <div class="player-feet"></div>
</div>
