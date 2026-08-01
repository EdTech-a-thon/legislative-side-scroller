<script lang="ts">
  import { onMount } from 'svelte';
  let { recovered, onrecover, onreturn }: { recovered: boolean; onrecover: () => void; onreturn: () => void } = $props();
  let secretaryGreetingOpen = $state(false);
  onMount(() => { secretaryGreetingOpen = !recovered; });
</script>

<main class="abbonizio-office">
  <header><button onclick={onreturn}>← SENATE</button><div><p>SENATE LEADERSHIP CORRIDOR</p><h1>SEN. ABBONIZIO'S <span>OFFICE</span></h1></div><b>BRIEFCASE RECOVERY</b></header>
  <section class="abbonizio-office-scene" aria-label="Senator Luciana Abbonizio's Office">
    <div class="office-window office-window-one" aria-hidden="true"></div><div class="office-window office-window-two" aria-hidden="true"></div>
    <div class="office-bookshelf" aria-hidden="true"></div><div class="office-plant" aria-hidden="true"></div>
    <div class="office-whiteboard" aria-hidden="true">VOTE DAY<br/><small>9:00 FLOOR · 10:30 LEADERSHIP</small></div>
    <div class="secretary-desk" aria-hidden="true"><i></i><i></i><b>OFFICE SECRETARY</b></div>
    <div class="secretary-character" aria-hidden="true"><i></i><span>SECRETARY</span></div>
    <div class="senator-desk" aria-hidden="true"><i></i><i></i><b>LUCIANA ABBONIZIO<br/>SENATE LEADERSHIP</b></div>
    <div class="empty-chair" aria-hidden="true"></div>
    <button class:recovered class="office-briefcase" disabled={recovered} onclick={() => { onrecover(); secretaryGreetingOpen = false; }}><i></i><b>{recovered ? 'BRIEFCASE SECURED' : 'PICK UP BRIEFCASE'}</b></button>
    <button class="office-door" onclick={onreturn}>RETURN TO<br/>SENATE CORRIDOR</button>
  </section>
  {#if secretaryGreetingOpen}
    <div class="modal-backdrop"><dialog class="office-secretary-dialogue" open aria-labelledby="secretary-title">
      <p class="eyebrow">OFFICE SECRETARY</p><h2 id="secretary-title">WELCOME TO SEN. ABBONIZIO'S OFFICE</h2>
      <p>Oh - new face! You must be one of ours. This is Senator Abbonizio's office, but she's already headed to the floor - in a rush, as usual, which means she forgot her briefcase again.</p>
      <p>She needs it before the vote starts. It's right over there by the desk. Grab it and get moving, would you? She's not going to be happy waiting.</p>
      <p>Corridor's back that way when you're ready. Don't get lost - this place eats freshmen alive.</p>
      <button class="primary" onclick={() => secretaryGreetingOpen = false}>I'LL GET IT →</button>
    </dialog></div>
  {/if}
</main>
