<script lang="ts">
  type Tab = 'entries' | 'vocabulary';
  const vocabulary = [
    ['Bill', 'A proposed law that Congress considers.'], ['Representative', 'A House member elected to represent a congressional district.'], ['Senator', 'A member of the U.S. Senate, elected to represent an entire state.'], ['Constituent', 'A person represented by an elected official.'], ['Congress', 'The legislative branch of the federal government: the House and Senate.'], ['House of Representatives', 'One chamber of Congress. It has 435 voting members and is based on state population.'], ['Senate', 'One chamber of Congress. Each state has two Senators, for 100 total.'], ['Coalition', 'A group that works together toward a shared goal.'], ['Majority', 'More than half of the votes.'], ['Quorum', 'The minimum number of members needed to conduct official business.'], ['Committee', 'A smaller group of lawmakers that studies a bill in detail.'], ['Committee Markup', 'A meeting where a committee discusses, revises, and votes on a bill.'], ['Amendment', 'A change or addition to a bill.'], ['Hearing', 'A committee meeting to gather information or testimony about an issue.'], ['Floor Vote', 'A vote by the full House or Senate.'], ['Bipartisan', 'Involving support from more than one political party.'], ['Compromise', 'An agreement in which people make tradeoffs to reach a solution.'], ['Filibuster', 'A Senate procedure that can delay or block action. This game uses a simplified classroom model.'], ['Cloture', 'A Senate vote to end debate and allow a bill to move forward. In this game, it requires 60 votes.'], ['Gridlock', 'A situation where disagreement prevents government action from moving forward.'], ['Rogue Senator Node', 'A fictional game challenge used to represent behind-the-scenes work to break Senate Gridlock.'], ['Executive Branch', 'The branch that carries out laws. The President leads it.'], ['President', 'The head of the executive branch who can sign or veto bills.'], ['Veto', 'When the President rejects a bill instead of signing it.'], ['Override', 'When Congress passes a vetoed bill again with a two-thirds majority, making it law without the President’s signature.'], ['Veto-Proof', 'Having enough support for a possible two-thirds override vote.'], ['Law', 'A rule passed through the lawmaking process and signed or otherwise made official.'], ['Influence (INF)', 'Game currency earned by correct civics answers and used for optional preparation tools.'], ['Notebook', 'A study reference that records collected civics questions, answers, and vocabulary.'], ['Rapport', 'A game measure of how well a player communicates with an NPC.'], ['Polarization', 'A game measure that sets an NPC encounter’s base question format.']
  ] as const;
  type Entry = { id: number; title: string; text: string; category: 'government' | 'history' | 'symbols'; source: string };
  let { entries, initialTab = 'entries', seenVocabulary, vocabularyEasterEggSeen, onviewvocabulary, onclose }: { entries: Entry[]; initialTab?: Tab; seenVocabulary: string[]; vocabularyEasterEggSeen: boolean; onviewvocabulary: (term: string) => void; onclose: () => void } = $props();
  let tab = $state<Tab>('entries');
  let revealedEntryIds = $state<number[]>([]);
  let revealedVocabulary = $state<string[]>([]);
  $effect(() => { tab = initialTab; });

  function toggleEntry(id: number) {
    revealedEntryIds = revealedEntryIds.includes(id)
      ? revealedEntryIds.filter((entryId) => entryId !== id)
      : [...revealedEntryIds, id];
  }

  function toggleVocabulary(term: string) {
    onviewvocabulary(term);
    revealedVocabulary = revealedVocabulary.includes(term)
      ? revealedVocabulary.filter((vocabularyTerm) => vocabularyTerm !== term)
      : [...revealedVocabulary, term];
  }
</script>

<div class="modal-backdrop">
  <dialog class="notebook" open aria-labelledby="notebook-title">
    <button class="close" aria-label="Close notebook" onclick={onclose}>×</button>
    <p class="eyebrow">FIELD NOTES</p>
    <h2 id="notebook-title">LEGISLATIVE NOTEBOOK</h2>
    <div class="notebook-tabs"><button class:active={tab === 'entries'} onclick={() => tab = 'entries'}>CIVICS ENTRIES <b>{entries.length}</b></button><button class:active={tab === 'vocabulary'} onclick={() => tab = 'vocabulary'}>VOCABULARY GUIDE</button></div>
    <p class="guide-intro">Study mode: click a question or vocabulary word to reveal its answer or definition. Click it again to hide it.</p>
    {#if tab === 'entries' && entries.length === 0}
      <div class="empty-note">Find study entries through the Rotunda Shop, side quests, message boards, tourists, and hidden places around Washington.</div>
    {:else if tab === 'entries'}
      {#each [['government', 'American Government'], ['history', 'American History'], ['symbols', 'Symbols & Holidays']] as [category, heading]}
        {@const categoryEntries = entries.filter((entry) => entry.category === category).sort((left, right) => left.id - right.id)}
        <section class="notebook-category"><h3>{heading} <span>{categoryEntries.length}</span></h3>{#if categoryEntries.length === 0}<p>No study entries collected in this section yet.</p>{:else}<div class="note-grid">{#each categoryEntries as entry}<button class:revealed={revealedEntryIds.includes(entry.id)} onclick={() => toggleEntry(entry.id)}><span>Question {entry.id}</span>{#if revealedEntryIds.includes(entry.id)}<p>{entry.text}</p>{:else}<h3>{entry.title}</h3><p class="study-prompt">Click to reveal the answer.</p>{/if}</button>{/each}</div>{/if}</section>
      {/each}
    {/if}
    {#if tab === 'vocabulary'}
      <div class="guide-grid">{#each vocabulary as item}<button class:seen={seenVocabulary.includes(item[0])} class:revealed={revealedVocabulary.includes(item[0])} onclick={() => toggleVocabulary(item[0])}><h3>{item[0]}</h3>{#if revealedVocabulary.includes(item[0])}<p>{item[1]}</p>{:else}<p class="study-prompt">Click to reveal the definition.</p>{/if}</button>{/each}</div>
      {#if vocabularyEasterEggSeen}<div class="ghostly-vocabulary-message">The final page turns cold. A faint message appears: “At night, seek Washington at the Monument. When your Notebook is nearly full, Lincoln waits for one final answer.”</div>{/if}
    {/if}
    <p class="source">Questions and accepted answers are adapted from the USCIS 2025 Civics Test. Answers involving current officials can change.</p>
  </dialog>
</div>
