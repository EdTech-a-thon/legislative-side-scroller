<script lang="ts">
  import { onMount } from 'svelte';
  import { worldHeight, worldWidth, type Encounter } from './game';
  import Npc from './Npc.svelte';
  import Player from './Player.svelte';

  let {
    encounters,
    playerX,
    playerY,
    playerSkinTone = '#d8a57c',
    playerPresentation = 'female',
    completed,
    locked,
    held = [],
    paused,
    interactionBlocked = false,
    onmove,
    oninteract,
    onzone
  }: {
    encounters: Encounter[];
    playerX: number;
    playerY: number;
    playerSkinTone?: string;
    playerPresentation?: 'female' | 'male';
    completed: string[];
    locked: string[];
    held?: string[];
    paused: boolean;
    interactionBlocked?: boolean;
    onmove: (x: number, y: number) => void;
    oninteract: (encounter: Encounter) => void;
    onzone?: (zone: string) => void;
  } = $props();

  let viewport: HTMLDivElement;
  let directionX = 0;
  let directionY = 0;
  let frame = 0;
  let wasPaused = false;
  let nearby = $derived(
    encounters
      .map((encounter) => ({ encounter, distance: Math.hypot(encounter.x - playerX, encounter.y - playerY) }))
      .filter(({ distance }) => distance < 155)
      .sort((left, right) => left.distance - right.distance)[0]?.encounter
  );
  const mapZones = [
    { id: 'rotunda', x: 4250, y: 1650, label: 'ROTUNDA HALL' },
    { id: 'committee', x: 3650, y: 1450, label: 'COMMITTEE' },
    { id: 'west-cloakroom', x: 500, y: 685, label: 'WEST CLOAKROOM' },
    { id: 'east-cloakroom', x: 6950, y: 685, label: 'EAST CLOAKROOM' },
    { id: 'west-caucus', x: 1675, y: 290, label: 'WEST CAUCUS' },
    { id: 'east-caucus', x: 5350, y: 290, label: 'EAST CAUCUS' },
    { id: 'dc', x: 6540, y: 1230, label: 'EXIT TO D.C.' },
    { id: 'house-papers', x: 2535, y: 560, label: 'FLOOR PAPERS' },
    { id: 'house-ledger', x: 4785, y: 1150, label: 'VOTE LEDGER' },
    { id: 'house-briefing', x: 6185, y: 580, label: 'BRIEFING TABLE' },
    { id: 'rules-office', x: 2330, y: 330, label: 'LOCKED RULES COUNSEL OFFICE' },
    { id: 'whip-office', x: 6030, y: 330, label: 'LOCKED WHIP OFFICE' },
    { id: 'budget-office', x: 7180, y: 1160, label: 'LOCKED BUDGET STAFF OFFICE' }
  ];
  let nearbyZone = $derived(mapZones.find((zone) => Math.hypot(zone.x - playerX, zone.y - playerY) < 105));

  function isWalkable(x: number, y: number) {
    const inMainChamber = x >= 350 && x <= 7000 && y >= 420 && y <= 1300;
    const inWestCaucus = x >= 1250 && x <= 2100 && y >= 200 && y <= 420;
    const inEastCaucus = x >= 4920 && x <= 5770 && y >= 200 && y <= 420;
    const inCommittee = x >= 3400 && x <= 3900 && y >= 1300 && y <= 1550;
    const inWestCloakroom = x >= 250 && x <= 950 && y >= 540 && y <= 830;
    const inEastCloakroom = x >= 6700 && x <= 7400 && y >= 540 && y <= 830;
    const inRotundaPath = x >= 3900 && x <= 4600 && y >= 1260 && y <= 1840;
    const inRoom = inMainChamber || inWestCaucus || inEastCaucus || inCommittee || inWestCloakroom || inEastCloakroom || inRotundaPath;
    return inRoom;
  }

  function move() {
    if ((directionX || directionY) && !paused) {
      const nextX = Math.max(80, Math.min(worldWidth - 120, playerX + directionX * 5));
      const nextY = Math.max(180, Math.min(worldHeight - 150, playerY + directionY * 5));
      if (isWalkable(nextX, nextY)) onmove(nextX, nextY);
      else if (directionX && isWalkable(nextX, playerY)) onmove(nextX, playerY);
      else if (directionY && isWalkable(playerX, nextY)) onmove(playerX, nextY);
    }
    frame = requestAnimationFrame(move);
  }

  function setDirection(x: number, y: number) {
    directionX = x;
    directionY = y;
  }

  function nudge(x: number, y: number) {
    if (paused) return;
    const nextX = Math.max(80, Math.min(worldWidth - 120, playerX + x * 28));
    const nextY = Math.max(180, Math.min(worldHeight - 150, playerY + y * 28));
    if (isWalkable(nextX, nextY)) onmove(nextX, nextY);
  }

  function releaseDialogFocus() {
    requestAnimationFrame(() => (document.activeElement as HTMLElement | null)?.blur());
  }

  function interact() {
    if (paused || interactionBlocked) return;
    if (nearby && !completed.includes(nearby.id) && !locked.includes(nearby.id)) oninteract(nearby);
    else if (nearbyZone) onzone?.(nearbyZone.id);
  }

  function interactWith(encounter: Encounter) {
    if (!paused && !interactionBlocked && !completed.includes(encounter.id) && !locked.includes(encounter.id)) oninteract(encounter);
  }

  function beginDirection(event: PointerEvent, x: number, y: number) {
    if (paused) return;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    setDirection(x, y);
  }

  onMount(() => {
    const keydown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      // Dialog buttons can retain focus after closing. Only text-entry controls should
      // suppress map movement; buttons must not trap the player in place.
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.tagName === 'SELECT') return;
      if (event.key === 'ArrowLeft') { event.preventDefault(); nudge(-1, 0); }
      if (event.key === 'ArrowRight') { event.preventDefault(); nudge(1, 0); }
      if (event.key === 'ArrowUp') { event.preventDefault(); nudge(0, -1); }
      if (event.key === 'ArrowDown') { event.preventDefault(); nudge(0, 1); }
      if (['e', 'E', 'Enter'].includes(event.key) && !paused) { event.preventDefault(); interact(); }
    };
    const keyup = (event: KeyboardEvent) => {
      // Always clear movement on release. A dialog input may have received keydown,
      // but focus can change before keyup when the dialog closes.
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) { event.preventDefault(); setDirection(0, 0); }
    };
    const clearDirection = () => setDirection(0, 0);
    // Capture keys before a previously focused dialog button can consume them.
    window.addEventListener('keydown', keydown, true);
    window.addEventListener('keyup', keyup, true);
    window.addEventListener('blur', clearDirection);
    document.addEventListener('visibilitychange', clearDirection);
    frame = requestAnimationFrame(move);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('keydown', keydown, true);
      window.removeEventListener('keyup', keyup, true);
      window.removeEventListener('blur', clearDirection);
      document.removeEventListener('visibilitychange', clearDirection);
    };
  });

  $effect(() => {
    if (paused) setDirection(0, 0);
    if (wasPaused && !paused) {
      requestAnimationFrame(() => {
        (document.activeElement as HTMLElement | null)?.blur();
        viewport?.focus({ preventScroll: true });
      });
    }
    wasPaused = paused;
  });

  $effect(() => {
    if (viewport) {
      viewport.scrollTo({ left: Math.max(0, playerX - viewport.clientWidth / 2), top: Math.max(0, playerY - viewport.clientHeight / 2), behavior: 'smooth' });
    }
  });
</script>

<div class="viewport illustrated-house" bind:this={viewport} tabindex="-1">
  <div class="world" style={`width:${worldWidth}px;height:${worldHeight}px`}>
    <div class="house-mission-card" aria-hidden="true"><span>U.S. CAPITOL</span><b>THE HOUSE FLOOR</b><i>BUILD A COALITION</i></div>
    <div class="house-chamber" aria-hidden="true"><div class="house-aisle aisle-west"></div><div class="house-aisle aisle-east"></div><div class="desk-grid"></div></div>
    <div class="north-corridor" aria-hidden="true"><span>MAIN NORTH CORRIDOR</span></div>
    <div class="south-corridor" aria-hidden="true"><span>MAIN SOUTH CORRIDOR</span></div>
    <div class="rotunda-hallway" aria-hidden="true"><div class="hallway-runner"></div><div class="hallway-columns"><i></i><i></i><i></i><i></i></div><b>ROTUNDA HALL</b><span>THE CAPITOL ROTUNDA →</span></div>
    <div class="caucus west" aria-hidden="true"><div class="house-room-sign">WEST<br />CAUCUS</div></div>
    <div class="caucus east" aria-hidden="true"><div class="house-room-sign">EAST<br />CAUCUS</div></div>
    <div class="committee-door" aria-hidden="true"><div class="house-room-sign">COMMITTEE<br />MARKUP</div><div class="room-furniture"></div></div>
    <div class="cloakroom west-cloak" aria-hidden="true"><div class="house-room-sign">WEST<br />CLOAKROOM</div></div>
    <div class="cloakroom east-cloak" aria-hidden="true"><div class="house-room-sign">EAST<br />CLOAKROOM</div></div>
    <div class="rotunda-exit" aria-hidden="true"><div class="house-room-sign">ENTER<br />ROTUNDA</div></div>
    <div class="dc-exit" aria-hidden="true"><div class="house-room-sign">EXIT TO<br />D.C.</div></div>
    <div class="house-paper-table table-one" aria-hidden="true"><i></i><i></i><i></i></div><div class="house-paper-table table-two" aria-hidden="true"><i></i><i></i></div>
    {#each encounters as encounter}
      <Npc {encounter} completed={completed.includes(encounter.id)} locked={locked.includes(encounter.id)} onHold={held.includes(encounter.id)} nearby={!interactionBlocked && nearby?.id === encounter.id} {paused} oninteract={interactWith} />
    {/each}
    <Player x={playerX} y={playerY} skinTone={playerSkinTone} presentation={playerPresentation} />
    {#if nearbyZone && !nearby && !interactionBlocked}<div class="zone-prompt">E · {nearbyZone.label}</div>{/if}
  </div>
</div>

<div class="map-accessibility-controls">
  <button onclick={() => { releaseDialogFocus(); onmove(3000, 900); }}>RESET TO CHAMBER</button>
  <button disabled={interactionBlocked || (!nearby && !nearbyZone)} onclick={() => { releaseDialogFocus(); interact(); }}>{nearbyZone && !nearby ? `ENTER ${nearbyZone.label}` : 'INTERACT NEAREST'}</button>
  <button onclick={() => nudge(0, -1)}>UP</button><button onclick={() => nudge(0, 1)}>DOWN</button><button onclick={() => nudge(-1, 0)}>LEFT</button><button onclick={() => nudge(1, 0)}>RIGHT</button>
</div>

<div class="house-controls" aria-label="House map controls">
  <button onclick={() => nudge(-1, 0)}>◀</button><button onclick={() => nudge(0, -1)}>▲</button><button onclick={interact}>E</button><button onclick={() => nudge(0, 1)}>▼</button><button onclick={() => nudge(1, 0)}>▶</button>
</div>

<details class="leader-directory">
  <summary>HOUSE LEADER DIRECTORY</summary>
  <div>{#each encounters.filter((encounter) => !completed.includes(encounter.id) && !locked.includes(encounter.id)) as encounter}<button onclick={() => interactWith(encounter)}>{encounter.name}</button>{/each}</div>
</details>

<div class="mobile-controls" aria-label="Movement controls">
  <button aria-label="Walk left" onpointerdown={(event) => beginDirection(event, -1, 0)} onpointerup={() => setDirection(0, 0)} onpointercancel={() => setDirection(0, 0)} onlostpointercapture={() => setDirection(0, 0)}>◀</button>
  <button aria-label="Walk up" onpointerdown={(event) => beginDirection(event, 0, -1)} onpointerup={() => setDirection(0, 0)} onpointercancel={() => setDirection(0, 0)} onlostpointercapture={() => setDirection(0, 0)}>▲</button>
  <button class="talk" disabled={interactionBlocked || (!nearby && !nearbyZone) || completed.includes(nearby?.id ?? '') || locked.includes(nearby?.id ?? '')} onclick={interact}>{nearbyZone && !nearby ? 'ENTER' : 'TALK'}</button>
  <button aria-label="Walk down" onpointerdown={(event) => beginDirection(event, 0, 1)} onpointerup={() => setDirection(0, 0)} onpointercancel={() => setDirection(0, 0)} onlostpointercapture={() => setDirection(0, 0)}>▼</button>
  <button aria-label="Walk right" onpointerdown={(event) => beginDirection(event, 1, 0)} onpointerup={() => setDirection(0, 0)} onpointercancel={() => setDirection(0, 0)} onlostpointercapture={() => setDirection(0, 0)}>▶</button>
  <button class="unstick" onclick={() => onmove(3000, 900)}>RESET</button>
</div>
