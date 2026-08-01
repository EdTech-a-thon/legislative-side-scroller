<script lang="ts">
  import { isCorrectCivicsAnswer } from './civics-validation';
  import { displayChoice, questionChoices } from './game';
  import type { CivicsQuestion } from './civics-questions';

  let { questions, rogueNodes, bossAttempts, superPacAvailable, onusesuperpac, onnode, onboss, onclose }: {
    questions: CivicsQuestion[]; rogueNodes: number[]; bossAttempts: string[]; superPacAvailable: boolean;
    onusesuperpac: () => void; onnode: (id: number, correct: boolean) => void; onboss: (id: string, passed: boolean) => void; onclose: () => void;
  } = $props();
  let node = $state<number | null>(null);
  let boss = $state<string | null>(null);
  let answer = $state('');
  let feedback = $state('');
  let bossSelections = $state<string[]>([]);
  let question = $derived(node === null ? null : questions[node - 1]);

  function submitNode() {
    if (!question || node === null || !answer.trim()) return;
    const correct = isCorrectCivicsAnswer(question, answer, 1);
    onnode(node, correct);
    feedback = correct ? 'Rogue Senator persuaded. +1 Senate vote.' : `One accepted answer is “${question.acceptedAnswers[0]}.”`;
  }
  function toggleBossChoice(choice: string) {
    bossSelections = bossSelections.includes(choice) ? bossSelections.filter((selected) => selected !== choice) : [...bossSelections, choice];
  }
  function submitBoss() {
    if (!boss) return;
    const target = boss === 'augustus-kane' ? questions[0] : questions[1];
    const acceptedChoices = target.acceptedAnswers.map((choice) => displayChoice(target, choice));
    const correctSelections = bossSelections.filter((choice) => acceptedChoices.includes(choice)).length;
    const incorrectSelections = bossSelections.length - correctSelections;
    const required = Math.max(1, Math.ceil(Math.min(4, target.acceptedAnswers.length) * .75));
    const passed = correctSelections >= required && incorrectSelections === 0;
    onboss(boss, passed);
    feedback = passed ? 'The Extreme leader breaks Gridlock. +10 Senate votes.' : 'That boss route is now closed. Rogue Nodes remain available.';
  }
</script>

<div class="modal-backdrop"><dialog class="overtime-panel" open aria-labelledby="overtime-title">
  <button class="close" aria-label="Return to Senate Chamber" onclick={onclose}>×</button>
  <p class="eyebrow">CLOAKROOMS AND SUBWAY · SENATE OVERTIME</p><h2 id="overtime-title">BREAK THE GRIDLOCK</h2>
  <p>Rogue Nodes use open-ended civics questions with no hints. Each secured Node gives one Senate vote.</p>
  <div class="rogue-grid">{#each Array(10) as _, index}{@const id = index + 1}<button class:secured={rogueNodes.includes(id)} disabled={rogueNodes.includes(id)} onclick={() => { node = id; boss = null; answer = ''; feedback = ''; }}><b>{rogueNodes.includes(id) ? '✓' : '?'}</b><span>ROGUE {id}</span></button>{/each}</div>
  {#if superPacAvailable && rogueNodes.length < 10}<button class="super-pac" onclick={onusesuperpac}>USE SUPER PAC INJECTION · CLEAR 5 ROGUE NODES</button>{/if}
  <div class="boss-row"><button disabled={bossAttempts.includes('augustus-kane')} onclick={() => { boss = 'augustus-kane'; node = null; feedback = ''; bossSelections = []; }}>AUGUSTUS KANE<span>Cloakroom staffer: He responds to firm commitments.</span></button><button disabled={bossAttempts.includes('lucia-marchetti')} onclick={() => { boss = 'lucia-marchetti'; node = null; feedback = ''; bossSelections = []; }}>LUCIA MARCHETTI<span>Press intern: She wants the big-picture purpose.</span></button></div>
  {#if question}<section class="rogue-question"><p class="eyebrow">ROGUE SENATOR {node} · NO HINTS</p><h3>{question.prompt}</h3><form onsubmit={(event) => { event.preventDefault(); submitNode(); }}><input bind:value={answer} placeholder="Type your answer..." /><button class="primary" type="submit">PERSUADE →</button></form></section>{/if}
  {#if boss}{@const bossQuestion = boss === 'augustus-kane' ? questions[0] : questions[1]}<section class="rogue-question"><p class="eyebrow">EXTREME LEADER BOSS · SELECT THE BEST ANSWERS · 75% ACCURACY TARGET</p><h3>{bossQuestion.prompt}</h3><div class="choices matrix">{#each questionChoices(bossQuestion, 12) as choice}{@const displayedChoice = displayChoice(bossQuestion, choice)}<button class:selected={bossSelections.includes(displayedChoice)} onclick={() => toggleBossChoice(displayedChoice)}>{bossSelections.includes(displayedChoice) ? '✓ ' : ''}{displayedChoice}</button>{/each}</div><button class="primary" disabled={!bossSelections.length} onclick={submitBoss}>MAKE THE CASE →</button></section>{/if}
  {#if feedback}<p class="hold-feedback">{feedback}</p>{/if}<footer>{rogueNodes.length} / 10 ROGUE NODES SECURED</footer>
</dialog></div>
