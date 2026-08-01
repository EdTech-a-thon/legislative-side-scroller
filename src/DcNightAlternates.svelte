<script lang="ts">
  const alternates = [
    { id: 'wren-castellano', name: 'Rep. Wren Castellano', location: 'Mall cafe', detail: 'A relaxed conversation over coffee.' },
    { id: 'fritz-callahan', name: 'Rep. Fritz Callahan', location: 'Late-night diner', detail: 'He finally has time to look up from his desk.' },
    { id: 'naomi-cho', name: 'Rep. Naomi Cho', location: 'Evening press stand-up', detail: 'A calmer conversation after the cameras leave.' },
    { id: 'dez-okonkwo', name: 'Rep. Dez Okonkwo', location: 'National Mall', detail: 'He is chatting with tourists under the monument lights.' }
  ];

  let { completed, onselect, onclose }: { completed: string[]; onselect: (id: string) => void; onclose: () => void } = $props();
</script>

<div class="modal-backdrop"><dialog class="alternate-panel" open aria-labelledby="alternate-title">
  <button class="close" aria-label="Close night encounters" onclick={onclose}>×</button>
  <p class="eyebrow">D.C. AT NIGHT</p><h2 id="alternate-title">AFTER-HOURS CONVERSATIONS</h2>
  <p>These relaxed meetings begin with a +10 Rapport context bonus. Each Representative still uses the normal House question and retry rules.</p>
  <div class="alternate-list">{#each alternates as alternate}<button disabled={completed.includes(alternate.id)} onclick={() => onselect(alternate.id)}><b>{alternate.name}</b><span>{alternate.location}</span><p>{completed.includes(alternate.id) ? 'Support already secured' : alternate.detail}</p></button>{/each}</div>
</dialog></div>
