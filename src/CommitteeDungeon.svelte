<script lang="ts">
  import { isCorrectCivicsAnswer } from './civics-validation';
  import { displayChoice, questionChoices } from './game';
  import type { CivicsQuestion } from './civics-questions';
  import { committeeDialogue } from './story-dialogue';

  type CommitteeMember = {
    id: string;
    name: string;
    role: string;
    kind: 'trivia' | 'readiness' | 'favor';
    amendment?: string;
  };

  const members: CommitteeMember[] = [
    { id: 'priya', name: 'Rep. Priya Anand', role: 'Learning Technology and Evidence', kind: 'trivia', amendment: 'Reliable Connections Standard' },
    { id: 'gus', name: 'Rep. Gus Whitfield', role: 'School Facilities and Maintenance', kind: 'trivia', amendment: 'Classroom Tools Refresh Fund' },
    { id: 'wren', name: 'Rep. Wren Castellano', role: 'Teacher Support', kind: 'trivia', amendment: 'Teacher Ready Grant' },
    { id: 'naomi', name: 'Rep. Naomi Cho', role: 'Student Privacy and Public Communication', kind: 'trivia', amendment: 'Local Learning and Privacy Plan' },
    { id: 'hina', name: 'Rep. Hina Khan', role: 'Student Access and Accessibility', kind: 'trivia', amendment: 'Access for Every Learner' },
    { id: 'otis', name: 'Rep. Otis Reinholt', role: 'Budget Readiness', kind: 'readiness' },
    { id: 'cyrus', name: 'Rep. Cyrus Boone', role: 'House Rules and Amendments', kind: 'favor' }
  ];

  let { questions, committeeVotes, hasPowerUp, adaPrepared, rapport, onstudy, oncomplete }: {
    questions: CivicsQuestion[];
    committeeVotes: number;
    hasPowerUp: boolean;
    adaPrepared: boolean;
    rapport: number;
    onstudy: () => void;
    oncomplete: (result: { approvals: number; amendments: string[] }) => void;
  } = $props();

  let index = $state(0);
  let stage = $state<'intro' | 'question' | 'feedback'>('intro');
  let answer = $state('');
  let correct = $state(false);
  let approvals = $state(0);
  let amendments = $state<string[]>([]);
  let studyFound = $state(false);

  let member = $derived(members[index]);
  let question = $derived(questions[index % questions.length]);
  let approvalDialogue = $derived(({ priya: committeeDialogue.priyaApproval, gus: committeeDialogue.gusApproval, wren: committeeDialogue.wrenApproval, naomi: committeeDialogue.naomiApproval, hina: committeeDialogue.hinaApproval } as Record<string, string>)[member.id]);
  let choiceCount = $derived(
    adaPrepared
      ? (rapport >= 67 ? 3 : 4)
      : (rapport < 34 ? 12 : (index % 2 === 0 ? 4 : 12))
  );

  function begin() {
    if (member.kind === 'readiness') {
      correct = hasPowerUp;
      stage = 'feedback';
      return;
    }
    stage = 'question';
  }

  function submit(value = answer) {
    if (!value.trim()) return;
    correct = isCorrectCivicsAnswer(question, value, 0);
    stage = 'feedback';
  }

  function continueMarkup() {
    const nextApprovals = correct ? approvals + 1 : approvals;
    const nextAmendments = correct && member.amendment ? [...amendments, member.amendment] : amendments;

    if (nextApprovals >= 4 || index === members.length - 1) {
      oncomplete({ approvals: nextApprovals, amendments: nextAmendments });
      return;
    }

    approvals = nextApprovals;
    amendments = nextAmendments;
    index += 1;
    answer = '';
    stage = 'intro';
  }
</script>

  <div class="modal-backdrop committee-backdrop">
   <main class="committee-panel" aria-labelledby="committee-title">
     <header>
      <div><p>HOUSE COMMITTEE MARKUP</p><h2 id="committee-title">CONNECTED CLASSROOMS ACT</h2></div>
      <strong>{approvals} / 4 APPROVALS</strong>
    </header>

    <div class="committee-map-scene">
      <div class="committee-wall-sign">COMMITTEE ROOM 214</div>
      <div class="committee-wall-art" aria-hidden="true"><i></i><i></i></div>
      <button class:found={studyFound} class="committee-research-cabinet committee-study" disabled={studyFound} onclick={() => { if (!studyFound) { studyFound = true; onstudy(); } }}><span>{studyFound ? '✓ FOUND' : 'SEARCH'}</span><small>REFERENCE FILES</small></button>
      <div class="committee-table-map"><span>CONNECTED<br />CLASSROOMS ACT</span><i></i><i></i><i></i></div>
      <div class="committee-seats" aria-label="Seven committee members around the markup table">
        {#each members as item, memberIndex}<div class={`committee-seat seat-${memberIndex + 1}`}><i style={`--seat-color:${['#456b75','#8a5e48','#6d7a4f','#7c5874','#9b7247','#4c6976','#735340'][memberIndex]}`}></i><span>{item.name.split(' ').at(-1)?.slice(0, 2).toUpperCase()}</span></div>{/each}
      </div>
    </div>

    <div class="committee-progress" aria-label="Committee review progress">
      {#each members as item, memberIndex}
        <span class:current={memberIndex === index} class:done={memberIndex < index}>{memberIndex + 1}</span>
      {/each}
    </div>

    {#if stage === 'intro'}
      <section class="committee-copy">
        <p class="eyebrow">{member.role.toUpperCase()}</p>
        <h3>{member.name}</h3>
        {#if member.kind === 'readiness'}
          <p>{committeeDialogue.otisReady}</p>
          <p class="committee-note">{hasPowerUp ? 'You have a Rotunda power-up ready. This member can approve the markup.' : 'You do not currently carry a Rotunda power-up. This member will reject the markup, but you may continue the review.'}</p>
        {:else if member.kind === 'favor'}
          <p>{committeeDialogue.booneHold}</p>
          <p class="committee-note">Answer an extra civics question for Committee Clerk Hiroshi Tanaka.</p>
        {:else}
          <p>{approvalDialogue}</p>
          <p class="committee-note">Approval adds: {member.amendment}</p>
        {/if}
      </section>
      <button class="primary" onclick={begin}>{member.kind === 'readiness' ? 'SHOW INVENTORY' : 'BEGIN REVIEW'} →</button>
    {:else if stage === 'question'}
      <section class="committee-question">
        <p class="eyebrow">{member.kind === 'favor' ? 'COMMITTEE CLERK HIROSHI TANAKA' : member.name.toUpperCase()} · USCIS QUESTION {question.id}</p>
        <h3>{question.prompt}</h3>
        <div class:matrix={choiceCount === 12} class="choices">
          {#each questionChoices(question, choiceCount) as choice}
            <button onclick={() => submit(displayChoice(question, choice))}>{displayChoice(question, choice)}</button>
          {/each}
        </div>
      </section>
    {:else}
      <section class:wrong={!correct} class="feedback">
        <span class="feedback-icon">{correct ? '✓' : '×'}</span>
        <h3>{correct ? 'COMMITTEE APPROVAL' : 'COMMITTEE REJECTION'}</h3>
        <p>{correct ? member.kind === 'readiness' ? committeeDialogue.otisReadySuccess : member.kind === 'favor' ? committeeDialogue.clerkSuccess : approvalDialogue : `${committeeDialogue.rejection} One accepted answer is “${question.acceptedAnswers[0]}.”`}</p>
      </section>
      <button class="primary" onclick={continueMarkup}>{correct && approvals + 1 >= 4 ? 'PASS MARKUP' : index === members.length - 1 ? 'RETURN TO HOUSE' : 'NEXT COMMITTEE MEMBER'} →</button>
    {/if}

    <footer>FULL COMMITTEE SUPPORT: {committeeVotes} HOUSE VOTES · INCOMPLETE MARKUP: 15 HOUSE VOTES</footer>
   </main>
  </div>
