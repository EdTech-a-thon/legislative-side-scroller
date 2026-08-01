<script lang="ts">
  import Portrait from './Portrait.svelte';
  import { benVenelloDialogue } from './story-dialogue';
  let { playerName, oncomplete }: { playerName: string; oncomplete: () => void } = $props();
  let page = $state(0);

  const pages = [
    {
      title: 'WELCOME TO THE HOUSE',
      text: benVenelloDialogue.opening[0].text
    },
    {
      title: 'YOUR BILL',
      text: benVenelloDialogue.opening[1].text
    },
    {
      title: 'BUILD THE BILL',
      text: benVenelloDialogue.opening[2].text
    },
    {
      title: 'EARN SUPPORT',
      text: benVenelloDialogue.opening[3].text
    },
    {
      title: 'INFLUENCE',
      text: 'Answer civics questions correctly and you will earn Influence, or INF. More difficult question formats earn more INF. Spend it thoughtfully at the Rotunda Shop on optional tools that can help during a live question.'
    },
    {
      title: 'YOUR NOTEBOOK',
      text: 'Your Notebook is separate study material. Find question-and-answer entries through the Rotunda Shop, tourists, message boards, side rooms, and D.C. exploration. Review it between conversations, not during a live question.'
    },
    {
      title: 'ROTUNDA SHOP',
      text: 'The Shop has three useful items: Coffee pauses a timer, a Talking Points Memo removes one wrong multiple-choice answer, and a Hearing Aid clears part of a mumbled question. They are optional, but it pays to be prepared.'
    },
    {
      title: 'START WITH WREN',
      text: benVenelloDialogue.opening[4].text
    }
  ];

  let current = $derived(pages[page]);
  let lastPage = $derived(page === pages.length - 1);
</script>

<div class="modal-backdrop">
  <dialog class="ben-tutorial" open aria-labelledby="ben-title">
    <header>
      <Portrait character="venello" initials="BV" mood={page === 0 ? 'pleased' : 'thoughtful'} />
      <div><p>HOUSE MENTOR · MR. BEN VENELLO</p><h2 id="ben-title">{current.title}</h2></div>
    </header>
    <div class="tutorial-copy"><p>{current.text.replace('{name}', playerName)}</p></div>
    <footer><span>{page + 1} / {pages.length}</span><button class="primary" onclick={() => lastPage ? oncomplete() : page += 1}>{lastPage ? 'STEP ONTO THE FLOOR' : 'CONTINUE'} →</button></footer>
  </dialog>
</div>
