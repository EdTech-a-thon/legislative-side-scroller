<script lang="ts">
  let { whiteHouseOpen, minutes, notebookEntries, washingtonReady, duncanFound, onrotunda, onwhitehouse, onnotice, ondiscover, onwait, onalternates, ontourists, onwashington, onwhisper, onduncan }: {
    whiteHouseOpen: boolean; minutes: number; notebookEntries: number; washingtonReady: boolean; duncanFound: boolean; onrotunda: () => void; onwhitehouse: () => void; onnotice: (message: string) => void; ondiscover: (source: string) => void; onwait: () => void; onalternates: () => void; ontourists: () => void; onwashington: () => void; onwhisper: (ghost: 'washington' | 'lincoln') => void; onduncan: () => void;
  } = $props();
  let hour = $derived(Math.floor(minutes / 60) % 24);
  let night = $derived(hour >= 20 || hour < 6);
  let clock = $derived(`${hour === 0 || hour > 12 ? Math.abs(hour - 12) || 12 : hour}:${String(minutes % 60).padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`);
</script>

<main class="dc-map">
  <header><button onclick={onrotunda}>← ROTUNDA</button><div><p>OPTIONAL EXPLORATION</p><h1>WASHINGTON, <span>D.C.</span></h1></div><span>{clock} · {night ? 'NIGHT' : 'DAY'}</span></header>
  <section class="dc-grid" aria-label="Washington landmarks">
    <button class="landmark capitol" onclick={onrotunda}><b>U.S. CAPITOL</b><span>Return to the Rotunda</span></button>
    <button class:locked={!whiteHouseOpen} class="landmark white-house" onclick={() => whiteHouseOpen ? onwhitehouse() : onnotice('The White House opens after the bill passes both the House and Senate.')}><b>WHITE HOUSE</b><span>{whiteHouseOpen ? 'Enter the West Wing' : 'Congressional passage required'}</span></button>
    <button class="landmark monument" onclick={() => night && notebookEntries >= 100 && washingtonReady ? onwashington() : ondiscover('Washington Monument tourist board')}><b>WASHINGTON MONUMENT</b><span>{night && notebookEntries >= 100 && washingtonReady ? 'Ghost of Washington nearby' : 'Tourist board study find'}</span></button>
    <button class="landmark lincoln" onclick={() => ondiscover('Lincoln Memorial visitor guide')}><b>LINCOLN MEMORIAL</b><span>History study find</span></button>
    <button class="landmark library" onclick={() => onwhisper('washington')}><b>LIBRARY OF CONGRESS</b><span>Research study find</span></button>
    <button class="landmark court" onclick={() => onwhisper('lincoln')}><b>SUPREME COURT</b><span>Civics study find</span></button>
    <button class="landmark cafe" onclick={() => night ? onalternates() : ondiscover('Mall cafe conversation with Mr. Pete Hollinger')}><b>MALL CAFE & DINER</b><span>{night ? 'Wren + Fritz alternate locations' : 'Tourist study find'}</span></button>
    <button class="landmark press" onclick={() => night ? onalternates() : ondiscover('Press Row staffer handout')}><b>PRESS ROW</b><span>{night ? 'Naomi + Dez alternate locations' : 'Staffer study find'}</span></button>
    <button class="landmark duncan" disabled={duncanFound} onclick={onduncan}><b>DUNCAN JOHNSON</b><span>{duncanFound ? 'Easter egg discovered' : 'Tourist easter egg'}</span></button>
  </section>
  <div class="dc-actions"><button class="wait-button" onclick={() => ondiscover('Hidden D.C. map find')}>SEARCH FOR A STUDY FIND</button><button class="wait-button" onclick={onwait}>WAIT UNTIL NEXT {night ? 'DAY' : 'NIGHT'} PERIOD</button></div>
  <button class="tourist-button" onclick={ontourists}>MEET TOURISTS & LOCALS</button>
  <footer>Explore D.C. for study content, side quests, scouting, and night encounters. None of these activities are required to complete the main campaign.</footer>
</main>
