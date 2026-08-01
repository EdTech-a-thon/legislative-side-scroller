<script lang="ts">
  import { onMount } from 'svelte';

  type RoomId = 'west-cloakroom' | 'east-cloakroom' | 'west-caucus' | 'east-caucus';
  let { roomId, title, description, source, discovered, scoutAvailable, ondiscover, onscout, onreturn }: { roomId: RoomId; title: string; description: string; source: string; discovered: boolean; scoutAvailable: boolean; ondiscover: (source: string) => void; onscout: () => void; onreturn: () => void } = $props();
  let x = $state(500);
  let y = $state(670);
  let staffOpen = $state(false);
  let scoutOpen = $state(false);
  let nearbyFind = $derived(Math.hypot(x - 780, y - 300) < 85);
  let nearExit = $derived(y > 700);
  let roomClass = $derived(`house-room-map ${roomId}`);
  let scoutLabel = $derived(roomId === 'west-caucus' ? 'CAUCUS RESEARCHER' : roomId === 'east-caucus' ? 'DISTRICT AIDE' : roomId === 'west-cloakroom' ? 'CLOAKROOM STAFFER' : 'MESSAGE BOARD INTERN');
  let staffCopy = $derived(roomId === 'west-caucus'
    ? 'A caucus staffer points at a vote chart. “Leaders notice when a Representative knows both the purpose and the practical next step.”'
    : roomId === 'east-caucus'
      ? 'A legislative aide closes a folder. “People can disagree about the route. They still need to know where the bill is trying to go.”'
      : roomId === 'west-cloakroom'
        ? 'A cloakroom attendant straightens a coat tag. “The quiet conversations matter. Listen for what someone needs before you make your case.”'
        : 'A staffer checks the message board. “The best floor conversations are prepared before anyone steps into the spotlight.”');

  function nudge(horizontal: number, vertical: number) {
    x = Math.max(80, Math.min(920, x + horizontal * 40));
    y = Math.max(90, Math.min(750, y + vertical * 40));
  }
  function returnToHouse() {
    staffOpen = false;
    scoutOpen = false;
    (document.activeElement as HTMLElement | null)?.blur();
    onreturn();
  }
  function interact() {
    if (nearbyFind && !discovered) ondiscover(source);
    else if (nearbyFind) staffOpen = true;
    else if (nearExit) returnToHouse();
  }
  onMount(() => {
    const keydown = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement)?.tagName === 'INPUT' || staffOpen) return;
      if (event.key === 'ArrowLeft') { event.preventDefault(); nudge(-1, 0); }
      else if (event.key === 'ArrowRight') { event.preventDefault(); nudge(1, 0); }
      else if (event.key === 'ArrowUp') { event.preventDefault(); nudge(0, -1); }
      else if (event.key === 'ArrowDown') { event.preventDefault(); nudge(0, 1); }
      else if (['e', 'E', 'Enter'].includes(event.key)) { event.preventDefault(); interact(); }
    };
    window.addEventListener('keydown', keydown, true);
    return () => window.removeEventListener('keydown', keydown, true);
  });
</script>

<div class="house-room-overlay">
<main class={roomClass}>
  <header><button onclick={returnToHouse}>← HOUSE FLOOR</button><div><p>HOUSE SIDE ROOM</p><h1>{title}</h1></div><b>Explore the room</b></header>
  <section class="house-room-playfield">
    <div class="room-rug"></div><div class="room-wall-art art-one"></div><div class="room-wall-art art-two"></div><div class="room-bookshelf"></div><div class="room-coat-rack"></div><div class="room-table-large"><i></i><i></i><i></i></div><div class="room-chairs"><i></i><i></i><i></i></div>
    <button class:found={discovered} class="room-study-find" onclick={() => { if (!discovered) ondiscover(source); else staffOpen = true; }}><span>{discovered ? '✓' : '✦'}</span><b>{discovered ? 'STUDY FIND LOGGED' : 'REFERENCE MATERIAL'}</b></button>
    <button class:scouted={scoutAvailable} class="room-scout" onclick={() => scoutOpen = true}><span>◎</span><b>{scoutAvailable ? 'SCOUT INTEL LOGGED' : scoutLabel}</b></button>
    <div class="room-player" style={`left:${x}px;top:${y}px`}><span></span>REP</div>
    {#if nearbyFind}<div class="room-prompt">E · {discovered ? 'ASK STAFFER' : 'SEARCH REFERENCE MATERIAL'}</div>{:else if nearExit}<div class="room-prompt">E · RETURN TO HOUSE FLOOR</div>{/if}
  </section>
  <div class="corner-map-controls"><button onclick={() => nudge(0,-1)}>▲</button><button onclick={() => nudge(-1,0)}>◀</button><button class="interact" onclick={interact}>E</button><button onclick={() => nudge(1,0)}>▶</button><button onclick={() => nudge(0,1)}>▼</button></div>
  <footer>{description}</footer>
</main>
</div>

{#if staffOpen}<div class="modal-backdrop"><dialog class="house-room-dialog" open><button class="close" onclick={() => staffOpen = false}>×</button><p class="eyebrow">HOUSE STAFFER</p><h2>A QUICK WORD</h2><p>{staffCopy}</p><button class="primary" onclick={() => staffOpen = false}>RETURN TO ROOM →</button></dialog></div>{/if}
{#if scoutOpen}<div class="modal-backdrop"><dialog class="house-room-dialog" open><button class="close" onclick={() => scoutOpen = false}>×</button><p class="eyebrow">{scoutLabel}</p><h2>SCOUTING INTEL</h2><p>“I have watched the floor long enough to know that every Representative listens for something different. I can give you one useful read, but you still have to make the right case.”</p><p class="room-note">Use the clue in the leader’s Rapport conversation. Strong Rapport can make an encounter easier; scouting never supplies an answer.</p><button class="primary" onclick={() => { onscout(); scoutOpen = false; }}>LOG INTEL →</button></dialog></div>{/if}
