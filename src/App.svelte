<script lang="ts">
  import { onMount } from 'svelte';
  import EncounterPanel from './EncounterPanel.svelte';
  import Notebook from './Notebook.svelte';
  import TitleScreen from './TitleScreen.svelte';
  import World from './World.svelte';
  import { encounters, requiredVotes, type Encounter } from './game';

  type Save = { version: 1; playerX: number; votes: number; influence: number; completed: string[]; committeeStatus: string; };
  const SAVE_KEY = 'capitol-hill-crawler-save-v1';

  let screen = $state<'title' | 'game' | 'complete'>('title');
  let playerX = $state(220);
  let votes = $state(53);
  let influence = $state(0);
  let completed = $state<string[]>([]);
  let committeeStatus = $state('Not started');
  let active = $state<Encounter | null>(null);
  let notebookOpen = $state(false);
  let announcement = $state('');
  let hasSave = $state(false);
  let showBrief = $state(true);

  let notes = $derived(encounters.filter((e) => completed.includes(e.id)).map((e) => e.note));
  let progress = $derived(Math.min(100, Math.round(votes / requiredVotes * 100)));

  onMount(() => hasSave = Boolean(localStorage.getItem(SAVE_KEY)));

  function save() {
    const data: Save = { version: 1, playerX, votes, influence, completed, committeeStatus };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    hasSave = true;
  }

  function newGame() {
    playerX = 220; votes = 53; influence = 0; completed = []; committeeStatus = 'Not started';
    screen = 'game'; showBrief = true; save();
  }

  function continueGame() {
    try {
      const data = JSON.parse(localStorage.getItem(SAVE_KEY) ?? '') as Save;
      if (data.version !== 1) return newGame();
      ({ playerX, votes, influence, completed, committeeStatus } = data);
      screen = votes >= requiredVotes ? 'complete' : 'game';
      showBrief = false;
    } catch { newGame(); }
  }

  function resolveEncounter(correct: boolean) {
    if (!active) return;
    if (correct && !completed.includes(active.id)) {
      completed = [...completed, active.id];
      votes += active.votes;
      influence += 100;
      announcement = `${active.name} joined your coalition. ${active.votes} votes secured.`;
      if (active.id === 'okafor') committeeStatus = 'Friendly markup';
      if (votes >= 175 && committeeStatus === 'Not started') committeeStatus = 'Markup unlocked';
    }
    active = null;
    save();
    if (votes >= requiredVotes) screen = 'complete';
  }

  function reset() {
    if (!confirm('Erase your saved campaign and return to the title screen?')) return;
    localStorage.removeItem(SAVE_KEY); hasSave = false; screen = 'title';
  }
</script>

{#if screen === 'title'}
  <TitleScreen canContinue={hasSave} onstart={newGame} oncontinue={continueGame} />
{:else if screen === 'complete'}
  <main class="victory-screen">
    <div class="seal">✓</div>
    <p class="eyebrow">HOUSE ROLL CALL · FINAL</p>
    <h1>THE BILL<br /><span>PASSES!</span></h1>
    <p>The Connected Schools Act has cleared the House with <strong>{votes} votes</strong>.</p>
    <div class="victory-stats">
      <div><span>VOTES</span><strong>{votes}</strong></div>
      <div><span>INFLUENCE</span><strong>{influence}</strong></div>
      <div><span>NOTES</span><strong>{notes.length}</strong></div>
    </div>
    <p class="next-chapter">Next stop: the Senate. Your saved campaign is ready for a future chapter.</p>
    <button class="primary" onclick={() => { screen = 'game'; notebookOpen = true; }}>VIEW NOTEBOOK</button>
    <button class="text-button" onclick={reset}>START A NEW CAMPAIGN</button>
  </main>
{:else}
  <main class="game-shell">
    <header class="hud">
      <div class="brand"><span>CHC</span><div>CAPITOL HILL<strong>CRAWLER</strong></div></div>
      <div class="bill-name"><span>H.R. 218</span><strong>CONNECTED SCHOOLS ACT</strong></div>
      <div class="hud-actions"><button onclick={() => notebookOpen = true}>▤ NOTEBOOK <b>{notes.length}</b></button><button aria-label="Reset game" onclick={reset}>⚙</button></div>
    </header>
    <section class="vote-board">
      <div><span>HOUSE SUPPORT</span><strong>{votes} <small>/ {requiredVotes}</small></strong></div>
      <div class="meter"><i style:width={`${progress}%`}></i><span class="threshold">218</span></div>
      <div class="inf"><span>INFLUENCE</span><strong>{influence} INF</strong></div>
    </section>

    <World {playerX} {completed} paused={Boolean(active) || notebookOpen || showBrief} onmove={(x) => { playerX = x; }} oninteract={(e) => active = e} />

    <footer class="statusbar">
      <div><span>COMMITTEE</span><strong class:ready={committeeStatus !== 'Not started'}>{committeeStatus}</strong></div>
      <p>{completed.length === 0 ? 'Find representatives with a gold marker and build your coalition.' : `${encounters.length - completed.length} conversations remain on this floor.`}</p>
      <span>AUTOSAVE ON</span>
    </footer>
  </main>
{/if}

{#if showBrief && screen === 'game'}
  <div class="modal-backdrop">
    <dialog class="bill-brief" open aria-labelledby="brief-title">
      <p class="eyebrow">YOUR FIRST BILL</p><h2 id="brief-title">THE CONNECTED<br />SCHOOLS ACT</h2>
      <p>Repair aging public schools and expand reliable internet access for students.</p>
      <div><span>STARTING COALITION</span><strong>53 VOTES</strong></div>
      <div><span>NEEDED TO PASS</span><strong>218 VOTES</strong></div>
      <p class="brief-note">Walk through the House chamber. Talk with coalition leaders and answer official U.S. civics questions to earn their support.</p>
      <button class="primary" onclick={() => showBrief = false}>STEP ONTO THE FLOOR →</button>
    </dialog>
  </div>
{/if}

{#if active}<EncounterPanel encounter={active} oncomplete={resolveEncounter} onclose={() => active = null} />{/if}
{#if notebookOpen}<Notebook entries={notes} onclose={() => notebookOpen = false} />{/if}
<div class="sr-only" aria-live="polite">{announcement}</div>
