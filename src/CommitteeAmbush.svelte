<script lang="ts">
  import { isCorrectCivicsAnswer } from './civics-validation';
  import { displayChoice, questionChoices } from './game';
  import type { CivicsQuestion } from './civics-questions';

  let { question, oncomplete }: { question: CivicsQuestion; oncomplete: (prepared: boolean) => void } = $props();
  let answered = $state(false);
  let prepared = $state(false);
  function answer(choice: string) { if (!answered) { prepared = isCorrectCivicsAnswer(question, choice); answered = true; } }
</script>

<div class="modal-backdrop"><dialog class="ambush-panel" open aria-labelledby="ambush-title"><p class="eyebrow">175 HOUSE VOTES · FLOOR INTERRUPTED</p><h2 id="ambush-title">THE BILL IS<br /><span>PULLED TO MARKUP</span></h2><p>Rep. Ada Boykin steps into your path. “Before the Committee takes this bill apart, show me you understand the civic ground beneath it.”</p>{#if !answered}<h3>{question.prompt}</h3><div class="choices matrix">{#each questionChoices(question, 12) as choice}<button onclick={() => answer(displayChoice(question, choice))}>{displayChoice(question, choice)}</button>{/each}</div>{:else}<section class:wrong={!prepared} class="feedback"><span class="feedback-icon">{prepared ? '✓' : '!'}</span><h3>{prepared ? 'A STRONG START' : 'MARKUP WILL BE TOUGH'}</h3><p>{prepared ? 'Ada nods. “You did the reading. The Committee will still test the details, but they will give you a fair hearing.”' : `Ada folds the bill closed. “You will need the Committee room. Start with the details.” One accepted answer was “${question.acceptedAnswers[0]}.”`}</p></section><div class="committee-lift" aria-hidden="true"><span>CONNECTED<br />CLASSROOMS ACT</span></div><p class="transport-copy">The floor drops away in a swirl of papers as the bill is carried upstairs to Committee markup.</p><button class="primary" onclick={() => oncomplete(prepared)}>ENTER COMMITTEE ROOM →</button>{/if}</dialog></div>
