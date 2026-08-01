<script lang="ts">
  import { isCorrectCivicsAnswer } from './civics-validation';
  import { displayChoice, questionChoices } from './game';
  import type { CivicsQuestion } from './civics-questions';
  import type { Inventory, PowerUpId } from './RotundaShop.svelte';
  import Portrait from './Portrait.svelte';

  let { questions, alignment, inventory, onuseitem, oncomplete }: {
    questions: CivicsQuestion[]; alignment: 'ally' | 'opposition'; inventory: Inventory;
    onuseitem: (item: PowerUpId) => boolean; oncomplete: (passed: boolean, correct: number, asked: number) => void;
  } = $props();

  let stage = $state<'intro' | 'arrival' | 'question' | 'feedback'>('intro');
  let index = $state(0);
  let correct = $state(0);
  let answer = $state('');
  let lastCorrect = $state(false);
  let removedChoice = $state<string | null>(null);
  let seconds = $state(30);
  let coffeePaused = $state(false);
  let timer: ReturnType<typeof setInterval> | undefined;
  let coffeeTimer: ReturnType<typeof setTimeout> | undefined;
  let question = $derived(questions[index]);
  let target = $derived(alignment === 'ally' ? 12 : 6);
  let maximum = $derived(alignment === 'ally' ? 20 : 10);

  function stopTimer() { if (timer) clearInterval(timer); timer = undefined; }
  function startQuestion() {
    answer = ''; removedChoice = null; seconds = 30; coffeePaused = false; stage = 'question';
    if (alignment === 'opposition') {
      stopTimer(); timer = setInterval(() => { if (!coffeePaused) { seconds -= 1; if (seconds <= 0) { stopTimer(); lastCorrect = false; stage = 'feedback'; } } }, 1000);
    }
  }
  function beginArrival() { stage = 'arrival'; }
  function displayPrompt() {
    return question.prompt
      .replace(/^Name (two|three|five) /i, 'Name one ')
      .replace(/^What are (two|three) /i, 'Name one ')
      .replace(/^Describe one of the four /i, 'Describe one of the ');
  }
  function submit(value: string) {
    if (!value.trim()) return;
    stopTimer();
    lastCorrect = isCorrectCivicsAnswer(question, value, alignment === 'opposition' ? 2 : 0);
    if (lastCorrect) correct += 1;
    stage = 'feedback';
  }
  function useItem(item: PowerUpId) {
    if (!onuseitem(item)) return;
    if (item === 'memo') removedChoice = questionChoices(question, 4).find((choice) => !question.acceptedAnswers.includes(choice)) ?? null;
    if (item === 'coffee' && alignment === 'opposition') { coffeePaused = true; if (coffeeTimer) clearTimeout(coffeeTimer); coffeeTimer = setTimeout(() => coffeePaused = false, 15000); }
  }
  function next() {
    const asked = index + 1;
    if (correct >= target || asked >= maximum || asked >= questions.length) { oncomplete(correct >= target, correct, asked); return; }
    index += 1; startQuestion();
  }
</script>

<div class="modal-backdrop"><dialog class="oval-panel" open aria-labelledby="oval-title">
   <header><Portrait character="president" initials="AD" mood={alignment === 'ally' ? 'pleased' : stage === 'intro' || stage === 'arrival' ? 'thoughtful' : 'concerned'} /><div><p>OVAL OFFICE · PRESIDENT ANTHONY J. DISANTIS</p><h2 id="oval-title">{stage === 'intro' ? 'ARRIVING AT THE OVAL OFFICE' : stage === 'arrival' ? 'THE FINAL MEETING' : alignment === 'ally' ? 'OVAL OFFICE POP QUIZ' : 'THE PRESIDENTIAL INTERVIEW'}</h2></div><Portrait character="sutton" initials="SD" mood={stage === 'feedback' && lastCorrect ? 'pleased' : 'neutral'} /></header>
   {#if stage === 'intro'}
     <section class="oval-intro">
       <video autoplay muted playsinline controls onended={beginArrival} aria-label="Introduction to the Oval Office"><source src="/assets/video/intro-to-oval-office.mp4" type="video/mp4" />Your browser cannot play this introduction video.</video>
       <button class="text-button" onclick={beginArrival}>SKIP INTRODUCTION</button>
     </section>
   {:else if stage === 'arrival'}
     <section class="oval-copy"><img class="oval-encounter-frame" src="/assets/final-scenes/president-disantis-and-sutton.png" alt="President DiSantis and Sutton meet in the Oval Office." /><p>{alignment === 'ally' ? 'President DiSantis grins and adjusts his colorful tie. “Representative, I like where this bill is headed. Let us make sure your civics briefing is just as strong. Twelve good answers and this pen gets useful.”' : 'President DiSantis closes the bill folder, thoughtful but unconvinced. “I am not sold yet. A Representative who can think clearly under pressure deserves a fair hearing. Six answers. Thirty seconds each.”'}</p><p class="sutton-line">Sutton whispers, “He asks lots of questions when he is excited. You have got this.”</p></section>
    <button class="primary" onclick={startQuestion}>BEGIN MEETING →</button>
  {:else if stage === 'question'}
    <section class="oval-question"><p class="eyebrow">QUESTION {index + 1} · {correct} / {target} CORRECT {alignment === 'opposition' ? `· ${coffeePaused ? 'COFFEE BREAK' : `${seconds}s`}` : ''}</p><h3>{displayPrompt()}</h3>
      {#if alignment === 'ally'}
        {#if inventory.memo > 0}<button class="item-use" onclick={() => useItem('memo')}>USE TALKING POINTS MEMO · {inventory.memo}</button>{/if}
        <div class="choices">{#each questionChoices(question, 4).filter((choice) => choice !== removedChoice) as choice}<button onclick={() => submit(displayChoice(question, choice))}>{displayChoice(question, choice)}</button>{/each}</div>
      {:else}
        {#if inventory.coffee > 0 && !coffeePaused}<button class="item-use" onclick={() => useItem('coffee')}>USE CAFETERIA COFFEE · {inventory.coffee}</button>{/if}
        <form onsubmit={(event) => { event.preventDefault(); submit(answer); }}><input bind:value={answer} placeholder="Type one answer..." autocomplete="off" /><button class="primary" type="submit" disabled={!answer.trim()}>SUBMIT</button></form>
      {/if}
    </section>
  {:else}
    <section class:wrong={!lastCorrect} class="feedback"><span class="feedback-icon">{lastCorrect ? '✓' : '×'}</span><h3>{lastCorrect ? 'STRONG ANSWER' : 'NOT QUITE'}</h3><p>{lastCorrect ? 'President DiSantis nods and makes a note in the bill folder.' : `One accepted answer is “${question.acceptedAnswers[0]}.”`}</p></section>
    <button class="primary" onclick={next}>{correct >= target ? 'PRESENT FINAL RESULT' : 'NEXT QUESTION →'}</button>
  {/if}
</dialog></div>
