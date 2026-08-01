<script lang="ts">
  let { hasPriorKnowledge, oncomplete, onclose }: { hasPriorKnowledge: boolean; oncomplete: () => void; onclose: () => void } = $props();
  let answer = $state('');
  let feedback = $state('');

  function submit() {
    const normalized = answer.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
    if (!hasPriorKnowledge) { feedback = 'The Ghost of Washington asks you to return after you have encountered the two-term-limit fact elsewhere in your studies.'; return; }
    if (normalized.includes('22nd amendment') || normalized.includes('22 amendment') || normalized.includes('two term')) oncomplete();
    else feedback = 'Think about the constitutional amendment that limits Presidents to two elected terms.';
  }
</script>

<div class="modal-backdrop"><dialog class="ghost-panel washington" open aria-labelledby="washington-title">
  <button class="close" aria-label="Leave Washington Monument" onclick={onclose}>×</button><p class="eyebrow">WASHINGTON MONUMENT · NIGHT</p><h2 id="washington-title">GEORGE WASHINGTON</h2>
  <p>“Twice I was asked to lead this country, and twice I said yes. A third time was offered to me, freely, with no law standing in the way, and I said no. Tell me: how many terms does the law now say a President may serve?”</p>
  <form onsubmit={(event) => { event.preventDefault(); submit(); }}><input bind:value={answer} placeholder="Your answer..." /><button class="primary" type="submit">ANSWER THE RIDDLE →</button></form>
  {#if feedback}<p class="ghost-note">{feedback}</p>{/if}
</dialog></div>
