<script lang="ts">
  import { isCorrect, type Encounter } from './game';

  let {
    encounter,
    oncomplete,
    onclose
  }: {
    encounter: Encounter;
    oncomplete: (correct: boolean) => void;
    onclose: () => void;
  } = $props();

  let stage = $state<'greeting' | 'question' | 'feedback'>('greeting');
  let answer = $state('');
  let correct = $state(false);

  function submit(value = answer) {
    if (!value.trim()) return;
    answer = value;
    correct = isCorrect(value, encounter.answers);
    stage = 'feedback';
  }

  function finish() {
    oncomplete(correct);
  }
</script>

<div class="modal-backdrop" role="presentation">
  <dialog class="dialog-panel" open aria-labelledby="speaker">
    <header class="speaker">
      <div class="portrait" style:--npc-color={encounter.color}>{encounter.portrait}</div>
      <div>
        <p>{encounter.state} · POLARIZATION {encounter.polarization}</p>
        <h2 id="speaker">REP. {encounter.name.toUpperCase()}</h2>
        <span>{encounter.title} · {encounter.votes} votes at stake</span>
      </div>
      <button class="close" aria-label="Leave conversation" onclick={onclose}>×</button>
    </header>

    {#if stage === 'greeting'}
      <div class="dialog-copy">
        <span class="quote">“</span>
        <p>{encounter.greeting}</p>
      </div>
      <button class="primary" onclick={() => stage = 'question'}>ACCEPT CHALLENGE <span>→</span></button>
    {:else if stage === 'question'}
      <div class="question-heading">
        <span>USCIS CIVICS · QUESTION {encounter.questionId}</span>
        <strong>{encounter.mode === 'multiple' ? '3-CHOICE' : encounter.mode === 'matrix' ? 'HIGH-CONFUSION' : 'SHORT ANSWER'}</strong>
      </div>
      <h3>{encounter.question}</h3>
      {#if encounter.hint}<p class="hint">{encounter.hint}</p>{/if}

      {#if encounter.mode === 'short'}
        <form onsubmit={(event) => { event.preventDefault(); submit(); }}>
          <label for="answer">Type your answer</label>
          <input id="answer" bind:value={answer} autocomplete="off" placeholder="Your answer..." />
          <button class="primary" type="submit" disabled={!answer.trim()}>SUBMIT ANSWER</button>
        </form>
      {:else}
        <div class:matrix={encounter.mode === 'matrix'} class="choices">
          {#each encounter.choices ?? [] as choice}
            <button onclick={() => submit(choice)}>{choice}</button>
          {/each}
        </div>
      {/if}
    {:else}
      <div class:wrong={!correct} class="feedback">
        <span class="feedback-icon">{correct ? '✓' : '×'}</span>
        <h3>{correct ? 'SUPPORT SECURED' : 'NOT QUITE'}</h3>
        <p>{correct ? encounter.success : `One accepted answer is “${encounter.answers[0]}.” Review it and try this representative again.`}</p>
        {#if correct}<strong>+{encounter.votes} VOTES · +100 INF</strong>{/if}
      </div>
      <button class="primary" onclick={finish}>{correct ? 'RETURN TO THE FLOOR' : 'REVIEW & RETURN'}</button>
    {/if}
  </dialog>
</div>
