<script lang="ts">
  import { onMount } from 'svelte';

  type Spot = { id: string; label: string; x: number; y: number; district: string };
  let { minutes, whiteHouseOpen, notebookEntries = 0, onrotunda, onspot, onwait }: {
    minutes: number;
    whiteHouseOpen: boolean;
    notebookEntries?: number;
    onrotunda: () => void;
    onspot: (id: string) => void;
    onwait: () => void;
  } = $props();

  let x = $state(2600);
  let y = $state(3300);
  let hour = $derived(Math.floor(minutes / 60) % 24);
  let night = $derived(hour >= 20 || hour < 6);
  let timeLabel = $derived(`${hour === 0 ? 12 : hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`);
  let spots = $derived<Spot[]>([
    { id: 'capitol', label: 'U.S. CAPITOL / ROTUNDA', x: 2600, y: 3300, district: 'CAPITOL HILL' },
    { id: 'white-house', label: whiteHouseOpen ? 'WHITE HOUSE' : 'WHITE HOUSE · LOCKED', x: 2600, y: 450, district: 'PRESIDENTIAL DISTRICT' },
    { id: 'monument', label: 'WASHINGTON MONUMENT', x: 1700, y: 1650, district: 'NATIONAL MALL' },
    { id: 'reflecting', label: 'REFLECTING POOL', x: 930, y: 2450, district: 'WEST MALL' },
    { id: 'lincoln', label: 'LINCOLN MEMORIAL', x: 380, y: 2850, district: 'WEST MALL' },
    { id: 'smithsonian', label: 'SMITHSONIAN MUSEUMS', x: 2250, y: 2450, district: 'MUSEUM ROW' },
    { id: 'library', label: 'LIBRARY OF CONGRESS', x: 4250, y: 2850, district: 'CAPITOL HILL' },
    { id: 'court', label: 'SUPREME COURT', x: 4400, y: 1900, district: 'CAPITOL HILL' },
    { id: 'cafe', label: 'MALL CAFE & DINER', x: 1850, y: 2900, district: 'MUSEUM ROW' },
    { id: 'press', label: 'PRESS ROW', x: 3350, y: 1650, district: 'PENN QUARTER' },
    { id: 'duncan', label: 'DUNCAN JOHNSON', x: 820, y: 2050, district: 'WEST MALL' },
    { id: 'tourists', label: 'TOURISTS & LOCALS', x: 3850, y: 3400, district: 'CAPITOL HILL' }
  ]);
  let nearby = $derived(spots.find((spot) => Math.hypot(spot.x - x, spot.y - y) < 190));

  function nudge(horizontal: number, vertical: number) {
    x = Math.max(160, Math.min(4840, x + horizontal * 105));
    y = Math.max(180, Math.min(3820, y + vertical * 105));
  }

  function interact() {
    if (nearby) onspot(nearby.id);
  }

  onMount(() => {
    const keydown = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement)?.tagName === 'INPUT') return;
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

<main class:night class="dc-overworld-large">
  <header>
    <button onclick={onrotunda}>← ROTUNDA</button>
    <div><p>WASHINGTON, D.C.</p><h1>NATIONAL <span>MALL</span></h1></div>
    <b>{night ? 'NIGHT' : 'DAY'} · {timeLabel}</b>
  </header>

  <section class="dc-large-view" aria-label="Explorable National Mall map">
    <div class="dc-map-title" aria-hidden="true"><span>THE PEOPLE'S MAP</span><b>EXPLORE WASHINGTON</b></div>
    <div class="dc-large-world" style={`transform:translate(${Math.max(-3700, Math.min(0, 650 - x))}px,${Math.max(-2950, Math.min(0, 450 - y))}px)`}>
      <div class="dc-ground"></div><div class="dc-grid-label north-label">NORTHWEST</div><div class="dc-grid-label south-label">SOUTHWEST</div>
      <div class="dc-river"></div><div class="potomac-label">POTOMAC RIVER</div><div class="dc-path northsouth"></div><div class="dc-path eastwest"></div>
      <div class="curved-walk curved-one"></div><div class="curved-walk curved-two"></div><div class="reflecting-water"></div><div class="reflecting-shine"></div>
      <div class="mall-lawn lawn-one"></div><div class="mall-lawn lawn-two"></div><div class="smithsonian-complex"><i></i><i></i><i></i><i></i><i></i></div>
      <div class="museum-garden"></div><div class="museum-annex annex-one"></div><div class="museum-annex annex-two"></div><div class="tree-belt north"></div><div class="tree-belt south"></div><div class="tree-belt west"></div>
      <div class="tree-cluster cluster-one"></div><div class="tree-cluster cluster-two"></div><div class="tree-cluster cluster-three"></div><div class="flag-plaza"></div><div class="mall-benches bench-a"></div><div class="mall-benches bench-b"></div><div class="mall-benches bench-c"></div>
      <div class="dc-prop food-cart">HOT<br />DOGS</div><div class="dc-prop tour-sign">TOUR<br />MAP</div><div class="dc-prop press-stand">PRESS</div><div class="dc-prop bus-stop">BUS<br />STOP</div>
      {#each spots as spot}
        <button class:locked={spot.id === 'white-house' && !whiteHouseOpen} class:nearby={nearby?.id === spot.id} class={`dc-site dc-${spot.id}`} style={`left:${spot.x}px;top:${spot.y}px`} onclick={interact} aria-label={`Visit ${spot.label}`}><i></i><b>{spot.label}</b><small>{spot.district}</small></button>
      {/each}
      {#each Array(48) as _, index}<div class="dc-large-walker" style={`left:${600 + (index * 337) % 3700}px;top:${1000 + (index * 191) % 2200}px;animation-delay:${(index % 6) * -.4}s`}></div>{/each}
      <div class="dc-large-player" style={`left:${x}px;top:${y}px`}><span></span>REP</div>
    </div>
    {#if nearby}<div class="dc-large-prompt"><b>E</b><span>{nearby.label}</span><small>{nearby.district}</small></div>{/if}
  </section>

  <div class="dc-map-bottom-bar"><div><span>NOTEBOOK</span><b>{notebookEntries} / 128 ENTRIES</b></div><p>Explore landmarks, meet people, and collect civics study material.</p><button onclick={onwait}>WAIT UNTIL {night ? 'DAY' : 'NIGHT'}</button></div>
  <div class="corner-map-controls"><button onclick={() => nudge(0, -1)}>▲</button><button onclick={() => nudge(-1, 0)}>◀</button><button class="interact" onclick={interact}>E</button><button onclick={() => nudge(1, 0)}>▶</button><button onclick={() => nudge(0, 1)}>▼</button></div>
</main>
