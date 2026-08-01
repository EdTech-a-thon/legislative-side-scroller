<script lang="ts">
  import Portrait from './Portrait.svelte';
  let { leaderId, oncomplete, onclose }: { leaderId: 'augustus-kane' | 'lucia-marchetti'; oncomplete: () => void; onclose: () => void } = $props();
  let kane = $derived(leaderId === 'augustus-kane');
</script>

<div class="modal-backdrop"><dialog class="scout-panel" open aria-labelledby="scout-title">
  <button class="close" aria-label="Leave scouting conversation" onclick={onclose}>×</button>
  <div class="scout-heading"><Portrait character="npc" initials={kane ? 'KS' : 'PI'} mood="thoughtful"/><div><p class="eyebrow">OPTIONAL SENATE SCOUTING</p><h2 id="scout-title">{kane ? 'CLOAKROOM STAFFER' : 'PRESS ROW INTERN'}</h2></div></div>
  <p>{kane ? '“Kane has already read the bill. He is not looking for more facts from you. He wants to hear what you will not trade away when the room gets difficult. Make one clear commitment, then stop talking.”' : '“Marchetti keeps circling the bill’s purpose in her notes. Do not lead with a list of parts or costs. Start with the students and communities the bill is meant to serve, then connect the details to that purpose.”'}</p>
  <p class="scout-note">{kane ? 'Kane responds to firm boundaries and a concrete commitment. He dislikes a long compromise pitch.' : 'Marchetti responds to the larger purpose first. She distrusts a detail list with no human reason behind it.'} This intel is saved to your Notebook and helps you choose a Rapport approach, not a trivia answer.</p>
  <button class="primary" onclick={oncomplete}>LOG INTEL TO NOTEBOOK →</button>
</dialog></div>
