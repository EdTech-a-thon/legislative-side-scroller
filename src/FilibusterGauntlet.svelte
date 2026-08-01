<script lang="ts">
  import { isCorrectCivicsAnswer } from './civics-validation';
  import { displayChoice, questionChoices } from './game';
  import type { CivicsQuestion } from './civics-questions';

  let { questions, oncomplete }: { questions: CivicsQuestion[]; oncomplete: (passed: boolean) => void } = $props();
  let index = $state(0);
  let correct = $state(0);
  let answered = $state(false);
  let result = $state(false);
  let question = $derived(questions[index]);

  function answer(value: string) {
    if (answered) return;
    answered = true;
    result = isCorrectCivicsAnswer(question, value);
    if (result) correct += 1;
  }

  function next() {
    if (index === questions.length - 1) { oncomplete(correct >= 3); return; }
    index += 1;
    answered = false;
    result = false;
  }
</script>

<div class="modal-backdrop">
  <dialog class="filibuster-panel" open aria-labelledby="filibuster-title">
    <header><p>SENATE ROSTRUM · FILIBUSTER GAUNTLET</p><h2 id="filibuster-title">CLOTURE VOTE</h2></header>
    <section class="filibuster-copy">
      <p class="eyebrow">QUESTION {index + 1} OF 5 · {correct} CORRECT</p>
      <h3>{question.prompt}</h3>
      {#if !answered}
        <div class="choices">
          {#each questionChoices(question, 4) as choice}<button onclick={() => answer(displayChoice(question, choice))}>{displayChoice(question, choice)}</button>{/each}
        </div>
      {:else}
        <div class:wrong={!result} class="feedback"><span class="feedback-icon">{result ? '✓' : '×'}</span><h3>{result ? 'POINT OF ORDER' : 'NOT QUITE'}</h3><p>{result ? 'Correct. The chamber keeps moving.' : `One accepted answer is “${question.acceptedAnswers[0]}.”`}</p></div>
        <button class="primary" onclick={next}>{index === 4 ? 'RESOLVE FILIBUSTER' : 'NEXT QUESTION'} →</button>
      {/if}
    </section>
  </dialog>
</div>
