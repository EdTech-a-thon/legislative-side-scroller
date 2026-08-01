<script lang="ts">
  import { onMount } from 'svelte';
  import Portrait from './Portrait.svelte';
  import { ovalOfficeDialogue } from './story-dialogue';

   type Room = 'press' | 'prep' | 'oval' | 'lincoln' | 'office-a' | 'office-b' | null;
  let { overrideReady, lincolnReady, onshop, onbill, onnotebook, onreturn, onovaloffice, onlincoln }: {
    overrideReady: boolean;
    lincolnReady: boolean;
    onshop: () => void; onbill: () => void; onnotebook: () => void; onreturn: () => void; onovaloffice: () => void; onlincoln: () => void;
  } = $props();

  let x = $state(500);
  let y = $state(690);
  let nearby = $derived<Room>(
     Math.hypot(x - 245, y - 360) < 85 ? 'press'
      : Math.hypot(x - 755, y - 360) < 85 ? 'prep'
        : Math.hypot(x - 125, y - 610) < 78 ? 'office-a'
          : Math.hypot(x - 875, y - 610) < 78 ? 'office-b'
        : Math.hypot(x - 500, y - 135) < 100 ? 'oval'
          : lincolnReady && Math.hypot(x - 500, y - 520) < 80 ? 'lincoln' : null
  );
  let roomOpen = $state<Room>(null);

  function nudge(horizontal: number, vertical: number) {
    x = Math.max(75, Math.min(925, x + horizontal * 38));
    y = Math.max(85, Math.min(760, y + vertical * 38));
  }
  function interact() { if (nearby) roomOpen = nearby; }

  onMount(() => {
    const keydown = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement)?.tagName === 'INPUT' || roomOpen) return;
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

<main class="white-house illustrated-white-house">
  <header class="white-house-header"><button onclick={onreturn}>← D.C.</button><div><p>WHITE HOUSE · WEST WING</p><h1>THE <span>WHITE HOUSE</span></h1></div><span>FINAL PREPARATION</span></header>
   <section class="white-house-map">
    <div class="west-wing-camera" style={`transform:translate(${Math.max(-260, Math.min(0, 500 - x))}px,${Math.max(-190, Math.min(0, 360 - y))}px)`}>
      <div class="west-wing-carpet"></div><div class="west-wing-gallery"></div><div class="west-wing-windows"></div><div class="west-wing-wall west"></div><div class="west-wing-wall east"></div><div class="west-wing-portrait portrait-washington">WASHINGTON</div><div class="west-wing-portrait portrait-lincoln">LINCOLN</div><div class="west-wing-flag flag-west"></div><div class="west-wing-flag flag-east"></div><div class="west-wing-console console-west"><i></i><i></i></div><div class="west-wing-console console-east"><i></i><i></i></div><div class="west-wing-plant plant-a"></div><div class="west-wing-plant plant-b"></div><div class="west-wing-bench bench-a"></div><div class="west-wing-bench bench-b"></div><div class="presidential-seal-floor">★<small>THE WHITE HOUSE</small></div>
    <div class="white-house-door oval-map-door"><i>★</i><b>{overrideReady ? 'OVERRIDE CHAMBER' : 'OVAL OFFICE'}</b><span>{overrideReady ? 'Finalize the override' : 'Meet the President'}</span></div>
      <div class="white-house-door briefing-map-door"><i>◈</i><b>PRESS ROOM</b><span>Press Secretary Abner Mendoza</span></div>
     <div class="white-house-door prep-map-door"><i>▤</i><b>PREPARATION ROOM</b><span>Review your materials</span></div>
     <div class="white-house-door office-a-map-door"><i>✎</i><b>LEGISLATIVE AFFAIRS</b><span>Congressional coordination</span></div>
     <div class="white-house-door office-b-map-door"><i>⌁</i><b>WEST WING OPERATIONS</b><span>Schedules and daily logistics</span></div>
     {#if lincolnReady}<div class="white-house-door lincoln-map-door"><i>✦</i><b>ONE FINAL STOP</b><span>A note from the staff</span></div>{/if}
     <div class="white-house-player" style={`left:${x}px;top:${y}px`}><span></span>REP</div>
    </div>
      {#if nearby}<div class="white-house-prompt">E · {nearby === 'oval' ? 'ENTER THE OVAL OFFICE' : nearby === 'press' ? 'ENTER PRESS ROOM' : nearby === 'prep' ? 'ENTER PREPARATION ROOM' : nearby === 'office-a' || nearby === 'office-b' ? 'PEEK INTO STAFF OFFICE' : 'READ STAFF NOTE'}</div>{/if}
  </section>
  <div class="white-house-controls"><button onclick={() => nudge(-1,0)}>◀</button><button onclick={() => nudge(0,-1)}>▲</button><button onclick={interact}>E</button><button onclick={() => nudge(0,1)}>▼</button><button onclick={() => nudge(1,0)}>▶</button></div>
  <footer>{ovalOfficeDialogue.hallway}</footer>
</main>

 {#if roomOpen === 'press'}<div class="modal-backdrop"><dialog class="west-wing-room" open><button class="close" onclick={() => roomOpen = null}>×</button><div class="abner-card"><Portrait character="npc" initials="AM" mood="thoughtful"/><div><p class="eyebrow">PRESS SECRETARY · ABNER MENDOZA</p><h2>PRESS ROOM BRIEFING</h2></div></div><p>{ovalOfficeDialogue.briefingSkeptical}</p><p class="room-note">{ovalOfficeDialogue.hallway}</p><button class="primary" onclick={() => roomOpen = null}>RETURN TO HALLWAY →</button></dialog></div>{/if}
 {#if roomOpen === 'prep'}<div class="modal-backdrop"><dialog class="west-wing-room" open><button class="close" onclick={() => roomOpen = null}>×</button><p class="eyebrow">PREPARATION ROOM</p><h2>GET READY</h2><p>{ovalOfficeDialogue.prep}</p><p class="room-note">{ovalOfficeDialogue.hallway}</p><div class="prep-actions"><button onclick={onnotebook}>OPEN NOTEBOOK</button><button onclick={onbill}>OPEN BILL SCROLL</button><button onclick={onshop}>FINAL SHOP COUNTER</button></div><button class="primary" onclick={() => roomOpen = null}>RETURN TO HALLWAY →</button></dialog></div>{/if}
{#if roomOpen === 'office-a'}<div class="modal-backdrop"><dialog class="west-wing-room" open><button class="close" onclick={() => roomOpen = null}>×</button><p class="eyebrow">OFFICE OF LEGISLATIVE AFFAIRS</p><h2>THE CONGRESSIONAL COUNT</h2><p>A staffer has the day’s floor schedule open beside a stack of call sheets. “The White House cannot pass a bill for Congress,” they say, “but we do need to know who has questions and who needs an answer.”</p><p class="room-note">A map on the wall is covered in tidy pencil marks. Nobody here is pretending the final meeting is a formality.</p><button class="primary" onclick={() => roomOpen = null}>RETURN TO HALLWAY →</button></dialog></div>{/if}
{#if roomOpen === 'office-b'}<div class="modal-backdrop"><dialog class="west-wing-room" open><button class="close" onclick={() => roomOpen = null}>×</button><p class="eyebrow">WEST WING OPERATIONS</p><h2>KEEPING THE DAY MOVING</h2><p>Schedules, visitor badges, and a half-finished lunch order share one desk. An operations aide smiles. “The Oval Office is ready when you are. We try to make the important moments run on time.”</p><p class="room-note">It is a quiet reminder that government work depends on many people whose names never reach the news.</p><button class="primary" onclick={() => roomOpen = null}>RETURN TO HALLWAY →</button></dialog></div>{/if}
{#if roomOpen === 'oval'}<div class="modal-backdrop"><dialog class="west-wing-room oval-confirm" open><p class="eyebrow">OVAL OFFICE DOOR</p><h2>{overrideReady ? 'READY TO FINALIZE THE OVERRIDE?' : 'READY FOR THE FINAL MEETING?'}</h2><p>You can still return to the hallway to review your materials. Entering begins the final civics encounter.</p><div class="prep-actions"><button class="primary" onclick={onovaloffice}>{overrideReady ? 'ENTER OVERRIDE CHAMBER →' : 'ENTER OVAL OFFICE →'}</button><button onclick={() => roomOpen = null}>NOT YET</button></div></dialog></div>{/if}
{#if roomOpen === 'lincoln'}<div class="modal-backdrop"><dialog class="west-wing-room" open><p class="eyebrow">A NOTE FROM THE STAFF</p><h2>ONE FINAL STOP</h2><p>The staffer notices your nearly complete Notebook. “Before the Oval Office, you may want to visit the Lincoln Memorial.”</p><div class="prep-actions"><button class="primary" onclick={onlincoln}>VISIT LINCOLN MEMORIAL →</button><button onclick={() => roomOpen = null}>RETURN TO HALLWAY</button></div></dialog></div>{/if}
