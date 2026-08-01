<script lang="ts">
  let { houseVotes, housePassed, onreturnhouse, onshop, onbill, onnotebook, onguide, onprofile, ondistrict, onsave, onsenate }: {
    houseVotes: number;
    housePassed: boolean;
    onreturnhouse: () => void;
    onshop: () => void;
    onbill: () => void;
    onnotebook: () => void;
    onguide: () => void;
    onprofile: () => void;
    ondistrict: () => void;
    onsave: () => void;
    onsenate: () => void;
  } = $props();

  let vetoProof = $derived(houseVotes >= 290);
</script>

<main class="rotunda-hub">
  <header class="rotunda-header"><p>CAPITOL ROTUNDA · CENTRAL HUB</p><h1>THE <span>ROTUNDA</span></h1><strong>{houseVotes} HOUSE VOTES {vetoProof ? '· VETO-PROOF HOUSE SUPPORT' : ''}</strong></header>

  <section class="rotunda-map" aria-label="Circular Capitol Rotunda locations">
    <div class="rotunda-dome" aria-hidden="true"><span>CAPITOL<br />ROTUNDA</span></div>
    <button class="hub-stop house rotunda-north" onclick={onreturnhouse}><b>→ HOUSE FLOOR</b><span>{housePassed ? 'Continue coalition work' : 'Begin your first bill'}</span></button>
    <button class="hub-stop senate rotunda-south" disabled={!housePassed} onclick={onsenate}><b>SENATE DOORS →</b><span>{housePassed ? 'Unlocked · Senate level next' : 'House passage required: 218 votes'}</span></button>
    <button class="hub-stop shop rotunda-west" onclick={onshop}><b>ROTUNDA SHOP</b><span>Preparation tools</span></button>
    <button class="hub-stop scroll rotunda-east" onclick={onbill}><b>LIVING BILL SCROLL</b><span>Review your bill</span></button>
    <button class="hub-stop notebook rotunda-northwest" onclick={onnotebook}><b>NOTEBOOK</b><span>Review civics entries</span></button>
    <button class="hub-stop guide rotunda-northeast" onclick={onguide}><b>CIVICS GUIDE</b><span>Bill-to-law study reference</span></button>
    <button class="hub-stop profile rotunda-southwest" onclick={onprofile}><b>STUDENT PROFILE</b><span>Update state or city</span></button>
    <button class="hub-stop dc rotunda-southeast" onclick={ondistrict}><b>EXPLORE D.C.</b><span>Landmarks and side content</span></button>
    <button class="hub-stop save rotunda-center-south" onclick={onsave}><b>SAVE STATION</b><span>Save progress</span></button>
  </section>

  <footer>{housePassed ? 'The Senate doors are open. You may enter when ready, or return to the House for optional support and study progress.' : 'Mr. Ben Venello is waiting in the House to introduce your first bill.'}</footer>
</main>
