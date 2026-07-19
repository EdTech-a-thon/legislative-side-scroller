<script lang="ts">
  import { onMount } from 'svelte';
  import { encounters, worldWidth, type Encounter } from './game';
  import Npc from './Npc.svelte';
  import Player from './Player.svelte';

  let {
    playerX,
    completed,
    paused,
    onmove,
    oninteract
  }: {
    playerX: number;
    completed: string[];
    paused: boolean;
    onmove: (x: number) => void;
    oninteract: (encounter: Encounter) => void;
  } = $props();

  let viewport: HTMLDivElement;
  let direction = 0;
  let frame = 0;
  let nearby = $derived(encounters.find((encounter) => Math.abs(encounter.x - playerX) < 115));

  function move() {
    if (direction && !paused) {
      onmove(Math.max(80, Math.min(worldWidth - 120, playerX + direction * 5)));
    }
    frame = requestAnimationFrame(move);
  }

  function setDirection(value: number) {
    direction = value;
  }

  function interact() {
    if (nearby && !completed.includes(nearby.id)) oninteract(nearby);
  }

  onMount(() => {
    const keydown = (event: KeyboardEvent) => {
      if (['ArrowLeft', 'a', 'A'].includes(event.key)) setDirection(-1);
      if (['ArrowRight', 'd', 'D'].includes(event.key)) setDirection(1);
      if (['e', 'E', 'Enter'].includes(event.key) && !paused) interact();
    };
    const keyup = (event: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'a', 'A', 'd', 'D'].includes(event.key)) setDirection(0);
    };
    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup', keyup);
    frame = requestAnimationFrame(move);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('keyup', keyup);
    };
  });

  $effect(() => {
    if (viewport) {
      viewport.scrollTo({ left: Math.max(0, playerX - viewport.clientWidth / 2), behavior: 'smooth' });
    }
  });
</script>

<div class="viewport" bind:this={viewport}>
  <div class="world" style:width={`${worldWidth}px`}>
    <div class="windows" aria-hidden="true"></div>
    <div class="gallery" aria-hidden="true"></div>
    <div class="floor-line" aria-hidden="true"></div>
    {#each encounters as encounter}
      <Npc {encounter} completed={completed.includes(encounter.id)} nearby={nearby?.id === encounter.id} />
    {/each}
    <Player x={playerX} />
  </div>
</div>

<div class="mobile-controls" aria-label="Movement controls">
  <button aria-label="Walk left" onpointerdown={() => setDirection(-1)} onpointerup={() => setDirection(0)} onpointerleave={() => setDirection(0)}>◀</button>
  <button class="talk" disabled={!nearby || completed.includes(nearby?.id ?? '')} onclick={interact}>TALK</button>
  <button aria-label="Walk right" onpointerdown={() => setDirection(1)} onpointerup={() => setDirection(0)} onpointerleave={() => setDirection(0)}>▶</button>
</div>
