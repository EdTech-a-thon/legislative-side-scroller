<script lang="ts">
  let { oncomplete }: { oncomplete: () => void } = $props();
</script>

<div class="modal-backdrop"><dialog class="override-finale" open aria-labelledby="override-finale-title">
  <p class="eyebrow">CONGRESSIONAL VETO OVERRIDE</p><h2 id="override-finale-title">THE VETO IS<br /><span>OVERRIDDEN!</span></h2>
  <p>Congress has reached the two-thirds threshold in both chambers. The Connected Classrooms Act becomes law without the President’s signature.</p>
  <div class="override-seal">2/3<br /><small>CONGRESS</small></div>
  <button class="primary" onclick={oncomplete}>CELEBRATE THE NEW LAW →</button>
</dialog></div>
