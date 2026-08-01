<script lang="ts">
  const amendments = [
    { name: 'Reliable Connections Standard', summary: 'Participating schools receive dependable classroom internet and a basic backup connection plan.' },
    { name: 'Classroom Tools Refresh Fund', summary: 'Schools can replace outdated learning and accessibility equipment on a regular review cycle.' },
    { name: 'Teacher Ready Grant', summary: 'Schools receive time and training support so teachers can use new tools confidently.' },
    { name: 'Local Learning and Privacy Plan', summary: 'Districts explain how resources meet local needs and protect student information.' },
    { name: 'Access for Every Learner', summary: 'Schools identify accessibility needs and provide compatible tools for students who need them.' }
  ];

  let { committeeStatus, approvedAmendments, onclose }: {
    committeeStatus: string;
    approvedAmendments: string[];
    onclose: () => void;
  } = $props();
</script>

<div class="modal-backdrop">
  <dialog class="bill-scroll" open aria-labelledby="bill-scroll-title">
    <button class="close" aria-label="Close bill scroll" onclick={onclose}>×</button>
    <p class="eyebrow">H.R. 218 · LIVING BILL SCROLL</p>
    <h2 id="bill-scroll-title">CONNECTED CLASSROOMS ACT</h2>
    <p class="bill-intro">A fictional education bill to help public schools improve reliable internet access, learning tools, and teacher support.</p>

    <section class="bill-goals">
      <h3>Starting Goals</h3>
      <ol>
        <li>Expand reliable high-speed internet access for public schools.</li>
        <li>Replace outdated learning technology and accessibility equipment.</li>
        <li>Support teacher training and ongoing maintenance for classroom tools.</li>
      </ol>
    </section>

    <section>
      <div class="markup-heading"><h3>Committee Review</h3><strong>{committeeStatus}</strong></div>
      {#if committeeStatus === 'Not started' || committeeStatus === 'Markup unlocked'}
        <p class="committee-hidden-note">The Committee has not released its proposed amendments yet. Once markup is complete, the bill will show which details were considered and approved.</p>
      {:else}
        <div class="amendment-list">
          {#each amendments as amendment}
            {@const approved = approvedAmendments.includes(amendment.name)}
            <article class:approved>
              <span aria-hidden="true">{approved ? '✓' : '×'}</span>
              <div><h4>{amendment.name}</h4><p>{amendment.summary}</p></div>
              <b>{approved ? 'APPROVED' : 'NOT INCLUDED'}</b>
            </article>
          {/each}
        </div>
      {/if}
    </section>
    <p class="source">Committee details are fictional educational content. They make the bill easier to understand but do not change civics-answer correctness or NPC vote values.</p>
  </dialog>
</div>
