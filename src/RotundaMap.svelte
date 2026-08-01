<script lang="ts">
  import { onMount } from 'svelte';

  type RotundaPoint = { id: string; label: string; x: number; y: number; run: () => void; locked?: boolean };
  let { housePassed, onhouse, onsenate, onshop, onbill, onnotebook, onguide, onprofile, ondc, ondiscover }: { housePassed: boolean; onhouse: () => void; onsenate: () => void; onshop: () => void; onbill: () => void; onnotebook: () => void; onguide: () => void; onprofile: () => void; ondc: () => void; ondiscover: () => void } = $props();
  let x = $state(500); let y = $state(500); let dx = 0; let dy = 0; let frame = 0;
  let notice = $state<'exhibit' | 'visitor' | null>(null);
  const stations = $derived<RotundaPoint[]>([{ id:'house', label:'HOUSE FLOOR', x:500,y:115, run:onhouse },{ id:'senate',label:housePassed?'SENATE DOORS':'SENATE LOCKED',x:500,y:845,run:onsenate,locked:!housePassed},{id:'shop',label:'ROTUNDA SHOP',x:112,y:500,run:onshop},{id:'bill',label:'BILL SCROLL',x:725,y:265,run:onbill},{id:'notebook',label:'NOTEBOOK',x:275,y:665,run:onnotebook},{id:'guide',label:'VOCABULARY',x:725,y:665,run:onguide},{id:'profile',label:'PROFILE',x:500,y:770,run:onprofile},{id:'dc',label:'EXPLORE D.C.',x:888,y:500,run:ondc}]);
  const points = $derived<RotundaPoint[]>([...stations, { id: 'exhibit', label: 'CIVICS EXHIBIT', x: 325, y: 415, run: () => { ondiscover(); notice = 'exhibit'; } }, { id: 'visitor', label: 'VISITOR INFO', x: 675, y: 415, run: () => notice = 'visitor' }]);
  let nearby = $derived(points.find(s=>Math.hypot(s.x-x,s.y-y)<82));
  function move(){if(dx||dy){const nx=Math.max(110,Math.min(890,x+dx*4));const ny=Math.max(90,Math.min(890,y+dy*4));if(Math.hypot(nx-500,ny-500)<420){x=nx;y=ny}}frame=requestAnimationFrame(move)}
  function nudge(horizontal:number,vertical:number){const nx=Math.max(110,Math.min(890,x+horizontal*40));const ny=Math.max(90,Math.min(890,y+vertical*40));if(Math.hypot(nx-500,ny-500)<420){x=nx;y=ny}}
  function interact(){if(nearby&&!nearby.locked)nearby.run()}
  onMount(()=>{const down=(e:KeyboardEvent)=>{if((e.target as HTMLElement)?.tagName==='INPUT')return;if(e.key==='ArrowLeft'){e.preventDefault();dx=-1;dy=0}if(e.key==='ArrowRight'){e.preventDefault();dx=1;dy=0}if(e.key==='ArrowUp'){e.preventDefault();dx=0;dy=-1}if(e.key==='ArrowDown'){e.preventDefault();dx=0;dy=1}if(['e','E','Enter'].includes(e.key))interact()};const up=()=>{dx=0;dy=0};window.addEventListener('keydown',down);window.addEventListener('keyup',up);frame=requestAnimationFrame(move);return()=>{cancelAnimationFrame(frame);window.removeEventListener('keydown',down);window.removeEventListener('keyup',up)}})
</script>

<main class="rotunda-play-map illustrated-rotunda">
  <header><p>CAPITOL ROTUNDA</p><h1>THE <span>ROTUNDA</span></h1><b>Walk to a place and press E</b></header>
  <section class="rotunda-playfield" aria-label="Capitol Rotunda map">
    <div class="rotunda-camera" style={`transform:translate(${Math.max(-280,Math.min(0,500-x))}px,${Math.max(-200,Math.min(0,360-y))}px)`}>
      <div class="rotunda-marble"></div><div class="rotunda-ink-lines" aria-hidden="true"></div><div class="rotunda-rings"></div>
      <div class="rotunda-center"><small>THE PEOPLE'S</small>CAPITOL<br/><em>ROTUNDA</em></div><div class="dome-light"></div>
      <div class="arch arch-north"></div><div class="arch arch-south"></div><div class="arch arch-west"></div><div class="arch arch-east"></div>
      <div class="shopfront" aria-hidden="true"><b>ROTUNDA<br/>SHOP</b><span>TOOLS · STUDY</span><i></i><i></i></div>
      <div class="columns" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
      <button class:nearby={nearby?.id === 'exhibit'} class="rotunda-display display-one" onclick={() => { ondiscover(); notice = 'exhibit'; }}><span>CIVICS</span><b>EXHIBIT</b><small>STUDY FIND</small></button>
      <button class:nearby={nearby?.id === 'visitor'} class="rotunda-display display-two" onclick={() => notice = 'visitor'}><span>VISITOR</span><b>INFO</b><small>PLAN YOUR VISIT</small></button>
      {#each stations as s}
        <div class:locked={s.locked} class:nearby={nearby?.id===s.id} class={`rotunda-station station-${s.id}`} style={`left:${s.x}px;top:${s.y}px`}><i aria-hidden="true"></i><b>{s.label}</b>{#if s.locked}<span>218 VOTES REQUIRED</span>{/if}</div>
      {/each}
      <div class="rotunda-tourist tourist-a"><i aria-hidden="true"></i><span>VISITOR</span></div><div class="rotunda-tourist tourist-b"><i aria-hidden="true"></i><span>STAFFER</span></div>
      <div class="rotunda-player" style={`left:${x}px;top:${y}px`}><i aria-hidden="true"></i><b>REP</b></div>
    </div>
    {#if nearby}<div class="rotunda-prompt">{nearby.locked?'218 HOUSE VOTES REQUIRED':`E · ${nearby.label}`}</div>{/if}
  </section>
  <p class="rotunda-asset-note">Character and interior art: Modern Interiors by LimeZu.</p>
  <div class="corner-map-controls"><button aria-label="Move up" onclick={() => nudge(0,-1)}>▲</button><button aria-label="Move left" onclick={() => nudge(-1,0)}>◀</button><button class="interact" onclick={interact}>E</button><button aria-label="Move right" onclick={() => nudge(1,0)}>▶</button><button aria-label="Move down" onclick={() => nudge(0,1)}>▼</button></div>
  <div class="rotunda-station-list">{#each stations as s}<button class:locked={s.locked} disabled={s.locked} onclick={() => !s.locked && s.run()}>{s.label}{#if s.locked}<span>218 VOTES REQUIRED</span>{/if}</button>{/each}</div>
  {#if notice}
    <div class="modal-backdrop"><dialog class="rotunda-notice" open aria-labelledby="rotunda-notice-title">
      <button class="close" aria-label="Close" onclick={() => notice = null}>×</button>
      {#if notice === 'exhibit'}
        <p class="eyebrow">ROTUNDA CIVICS EXHIBIT</p><h2 id="rotunda-notice-title">YOUR NOTEBOOK GREW</h2>
        <p>A curator's study card has been added to your Notebook. Throughout the Capitol and D.C., look for documents, displays, and conversations like this one to build your study collection.</p>
        <a href="https://www.uscis.gov/citizenship/find-study-materials-and-resources/study-for-the-test" target="_blank" rel="noreferrer">OPEN THE OFFICIAL USCIS STUDY MATERIALS ↗</a>
      {:else}
        <p class="eyebrow">VISITOR INFORMATION</p><h2 id="rotunda-notice-title">WELCOME TO THE CAPITOL</h2>
        <p>Explore the Rotunda for study tools, your Living Bill Scroll, and routes to the House, Senate, and D.C. Follow the plaques at each archway to continue your legislative journey.</p>
        <p class="rotunda-tip">Tip: use the Notebook between conversations to review questions and accepted answers.</p>
      {/if}
      <button class="primary" onclick={() => notice = null}>RETURN TO ROTUNDA</button>
    </dialog></div>
  {/if}
</main>
