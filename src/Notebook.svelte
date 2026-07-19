<script lang="ts">
  let { entries, onclose }: { entries: { title: string; text: string }[]; onclose: () => void } = $props();
</script>

<div class="modal-backdrop">
  <dialog class="notebook" open aria-labelledby="notebook-title">
    <button class="close" aria-label="Close notebook" onclick={onclose}>×</button>
    <p class="eyebrow">FIELD NOTES</p>
    <h2 id="notebook-title">LEGISLATIVE NOTEBOOK</h2>
    {#if entries.length === 0}
      <div class="empty-note">Talk to representatives to collect civics and lawmaking notes.</div>
    {:else}
      <div class="note-grid">
        {#each entries as entry, index}
          <article>
            <span>0{index + 1}</span>
            <h3>{entry.title}</h3>
            <p>{entry.text}</p>
          </article>
        {/each}
      </div>
    {/if}
    <p class="source">Questions and accepted answers are adapted from the USCIS 2025 Civics Test. Answers involving current officials can change.</p>
  </dialog>
</div>
