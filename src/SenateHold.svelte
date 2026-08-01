<script lang="ts">
  import { isCorrectCivicsAnswer } from './civics-validation';
  import { displayChoice, questionChoices } from './game';
  import type { CivicsQuestion } from './civics-questions';
  import { senateHoldDialogue } from './story-dialogue';

  let { leaderId, notebookEntries, newEntriesSinceContact, influence, question, onresolve, onoffice, onclose }: {
    leaderId: string;
    notebookEntries: number;
    newEntriesSinceContact: number;
    influence: number;
    question: CivicsQuestion;
    onresolve: (result: { resolved: boolean; spent?: number }) => void;
    onoffice: () => void;
    onclose: () => void;
  } = $props();

  let answer = $state('');
  let feedback = $state('');
  let title = $derived(leaderId === 'eleanor-vance' ? 'ECONOMIC IMPACT BRIEFING' : leaderId === 'corinne-vasquez' ? 'FAVOR TRADE' : leaderId === 'del-ashworth' ? 'NOTEBOOK STUDY CHECK' : 'SCHEDULING FAVOR');

  function submitFavor(value: string) {
    if (!value.trim()) return;
    if (isCorrectCivicsAnswer(question, value)) onresolve({ resolved: true });
    else feedback = `One accepted answer is “${question.acceptedAnswers[0]}.” Try again when you are ready.`;
  }
</script>

<div class="modal-backdrop"><dialog class="hold-panel" open aria-labelledby="hold-title">
  <button class="close" aria-label="Leave Senate Hold" onclick={onclose}>×</button>
  <p class="eyebrow">SENATE HOLD ACTIVE</p><h2 id="hold-title">{title}</h2>
  {#if leaderId === 'eleanor-vance'}
    <p>{senateHoldDialogue['eleanor-vance'].greeting}</p><p class="hold-feedback">{senateHoldDialogue['eleanor-vance'].clue}</p>
    <button class="primary" onclick={onclose}>RETURN TO THE ARCHIVE ROUTE →</button>
  {:else if leaderId === 'corinne-vasquez'}
    <p>{senateHoldDialogue['corinne-vasquez'].greeting}</p>
    <h3>{question.prompt}</h3><div class="choices">{#each questionChoices(question, 3) as choice}<button onclick={() => submitFavor(displayChoice(question, choice))}>{displayChoice(question, choice)}</button>{/each}</div>
    {#if feedback}<p class="hold-feedback">{feedback}</p>{/if}
  {:else if leaderId === 'del-ashworth'}
    <p>{senateHoldDialogue['del-ashworth'].greeting}</p><p>You have {notebookEntries} Notebook entries. Sen. Ashworth needs 64 entries, or five new entries collected after this first conversation.</p>
    {#if notebookEntries >= 64 || newEntriesSinceContact >= 5}<p class="hold-feedback">{senateHoldDialogue['del-ashworth'].resolved}</p><button class="primary" onclick={() => onresolve({ resolved: true })}>SHOW NOTEBOOK →</button>{:else}<p class="hold-feedback">{senateHoldDialogue['del-ashworth'].progress} You have collected {newEntriesSinceContact} / 5 new entries since speaking with Sen. Ashworth. Keep studying and return.</p>{/if}
  {:else}
    <p>{senateHoldDialogue['priya-okafor-lin'].greeting}</p><p class="hold-feedback">{senateHoldDialogue['priya-okafor-lin'].clue}</p>
    <div class="hold-actions"><button class="primary" onclick={onoffice}>SEARCH OFFICE →</button><button class="primary" disabled={influence < 100} onclick={() => onresolve({ resolved: true, spent: 100 })}>SPEND 100 INF</button></div>
  {/if}
</dialog></div>
