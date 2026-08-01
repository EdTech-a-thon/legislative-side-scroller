<script lang="ts">
  let { oncomplete }: { oncomplete: () => void } = $props();
  const choices = ["I couldn't leave the job half-finished.", 'It mattered to me to get it right, not just get it done.', 'Honestly? I just wanted to see if I could.'];
</script>

<div class="modal-backdrop"><dialog class="ghost-panel lincoln" open aria-labelledby="lincoln-title">
  <p class="eyebrow">LINCOLN MEMORIAL · FINAL NOTEBOOK ENTRY</p><h2 id="lincoln-title">ABRAHAM LINCOLN</h2>
  <p>Lincoln looks toward the Capitol. “So. Why’d you come back?”</p>
  <div class="ghost-choices">{#each choices as choice}<button onclick={oncomplete}>{choice}</button>{/each}</div>
</dialog></div>
