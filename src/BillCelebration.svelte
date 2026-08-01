<script lang="ts">
  let { playerScore, notebookEntries, correctAnswerPoints, notebookEntryPoints, ovalBonus, speedBonus, infBonus, onlock, onexplore }: { playerScore: number; notebookEntries: number; correctAnswerPoints: number; notebookEntryPoints: number; ovalBonus: number; speedBonus: number; infBonus: number; onlock: () => void; onexplore: () => void } = $props();
</script>

<div class="modal-backdrop"><dialog class="celebration-panel" open aria-labelledby="celebration-title">
  <p class="eyebrow">THE CONNECTED CLASSROOMS ACT</p><h2 id="celebration-title">SIGNED<br /><span>INTO LAW!</span></h2>
  <div class="signing-scene"><div class="signer">AD</div><div class="bill-stamp">✓<small>SIGNED</small></div><div class="sutton-celebrate">SD</div></div>
  <p>President DiSantis signs the bill while Sutton cheers beside the desk. Your work has made the Connected Classrooms Act a fictional law in the game world.</p>
  <div class="score-preview"><span>PROVISIONAL SCORE</span><strong>{playerScore}</strong><span>NOTEBOOK {notebookEntries} / 128</span></div>
  <p class="score-breakdown">Base Clear: 2,000 · Correct Answers: {correctAnswerPoints} · Notebook Entries: {notebookEntryPoints} · Full Notebook: {notebookEntries === 128 ? '2,000' : '0'} · Oval Accuracy: {ovalBonus} · Speed: {speedBonus} · INF Efficiency: {infBonus}</p>
  <p class="celebration-note">Lock in your score now, or continue exploring to collect more Notebook entries and spend remaining INF. Your speed bonus is already fixed.</p>
  <div class="celebration-actions"><button class="primary" onclick={onlock}>LOCK IN SCORE</button><button class="primary secondary" onclick={onexplore}>CONTINUE EXPLORING</button></div>
</dialog></div>
