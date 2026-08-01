<script lang="ts">
  import { civicsQuestionById } from './civics-questions';
  export type PowerUpId = 'coffee' | 'memo' | 'hearingAid' | 'superPac';
  export type Inventory = Record<PowerUpId, number>;

  const items: { id: PowerUpId; name: string; cost: number; description: string }[] = [
    { id: 'coffee', name: 'Cafeteria Coffee', cost: 30, description: 'Pauses a timed question for 15 seconds.' },
    { id: 'memo', name: 'Talking Points Memo', cost: 40, description: 'Removes one incorrect multiple-choice answer.' },
    { id: 'hearingAid', name: 'Hearing Aid', cost: 60, description: 'Reveals one obscured phrase in a mumbled question.' }
  ];

  let { influence, inventory, filibusterTriggered, ownedQuestionIds, onbuyquestion, onbuy, onclose }: {
    influence: number;
    inventory: Inventory;
    filibusterTriggered: boolean;
    ownedQuestionIds: number[];
    onbuyquestion: (questionId: number) => void;
    onbuy: (item: PowerUpId, cost: number) => void;
    onclose: () => void;
  } = $props();

  // Store entries emphasize multi-part and study-heavy questions. Question 37 is included
  // so students can prepare for Washington's two-term-limit riddle.
  const storeQuestionIds = [7, 10, 14, 20, 23, 30, 37, 41, 48, 51, 58, 63, 65, 67, 69, 73, 77, 80, 81, 83, 91, 93, 99, 100, 106, 113, 117, 121, 126, 127];
  let nextQuestionId = $derived(storeQuestionIds.find((id) => !ownedQuestionIds.includes(id)));
  let nextQuestion = $derived(nextQuestionId ? civicsQuestionById.get(nextQuestionId) : undefined);
</script>

<div class="modal-backdrop">
  <dialog class="shop-panel" open aria-labelledby="shop-title">
    <button class="close" aria-label="Close Rotunda Shop" onclick={onclose}>×</button>
    <p class="eyebrow">CAPITOL ROTUNDA</p>
    <h2 id="shop-title">PREP COUNTER</h2>
    <p class="shop-inf">AVAILABLE: <strong>{influence} INF</strong></p>
    <article class="notebook-purchase">
      <div><h3>Notebook Study Entry</h3><p>{nextQuestion ? `Question ${nextQuestion.id}: ${nextQuestion.prompt}` : 'All 30 Rotunda study entries have been collected.'}</p><span>STORE ENTRIES: {ownedQuestionIds.filter((id) => storeQuestionIds.includes(id)).length} / 30</span></div>
      <button class="primary" disabled={!nextQuestionId || influence < 25} onclick={() => nextQuestionId && onbuyquestion(nextQuestionId)}>25 INF</button>
    </article>
    {#if !filibusterTriggered}
      <article class="notebook-purchase super-pac-purchase">
        <div><h3>Super PAC Injection</h3><p>Buy before the Filibuster. If Senate Overtime begins, it clears five Rogue Senator Nodes.</p><span>IN INVENTORY: {inventory.superPac} / 1</span></div>
        <button class="primary" disabled={influence < 250 || inventory.superPac >= 1} onclick={() => onbuy('superPac', 250)}>250 INF</button>
      </article>
    {/if}
    <div class="shop-items">
      {#each items as item}
        <article>
          <div><h3>{item.name}</h3><p>{item.description}</p><span>IN INVENTORY: {inventory[item.id]} / 3</span></div>
          <button class="primary" disabled={influence < item.cost || inventory[item.id] >= 3} onclick={() => onbuy(item.id, item.cost)}>{item.cost} INF</button>
        </article>
      {/each}
    </div>
    <p class="source">Notebook entries are study material only. Power-ups are optional and can be used during eligible live questions.</p>
  </dialog>
</div>
