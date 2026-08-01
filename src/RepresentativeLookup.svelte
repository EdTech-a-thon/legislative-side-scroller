<script lang="ts">
  let { onskip, onlookup }: { onskip: () => void; onlookup: (zip: string) => void } = $props();
  let zip = $state('');
  let status = $state('');

  function useLocation() {
    if (!navigator.geolocation) { status = 'This browser does not support location. You can enter a ZIP code or skip the question.'; return; }
    status = 'Requesting one-time location permission. Your coordinates will not be saved.';
    navigator.geolocation.getCurrentPosition(
      () => status = 'Location received. A district lookup service is not connected yet, so this question will be swapped without penalty.',
      () => status = 'Location was not shared. You can enter a ZIP code or skip the question.'
    );
  }
</script>

<div class="modal-backdrop"><dialog class="representative-lookup" open aria-labelledby="representative-title">
  <p class="eyebrow">QUESTION 29 · YOUR U.S. REPRESENTATIVE</p><h2 id="representative-title">FIND YOUR DISTRICT</h2>
  <p>U.S. Representatives serve congressional districts, so a state alone is not enough to identify the correct person.</p>
  <p>Your precise location or ZIP code is used only to identify a district. It is never saved in your campaign, Notebook, certificate, or teacher record.</p>
  <div class="lookup-actions"><button class="primary" onclick={useLocation}>USE MY LOCATION</button><div><label for="zip">Or enter ZIP code</label><div class="zip-row"><input id="zip" bind:value={zip} oninput={() => zip = zip.replace(/\D/g, '').slice(0, 5)} placeholder="12345" inputmode="numeric" /><button class="primary" disabled={zip.length !== 5} onclick={() => onlookup(zip)}>LOOK UP</button></div></div></div>
  <p class="lookup-note">A live district lookup will be connected when hosting is available. Until then, this question is safely swapped if you cannot use a verified lookup.</p>
  {#if status}<p class="lookup-status">{status}</p>{/if}
  <button class="text-button" onclick={onskip}>SKIP THIS QUESTION WITHOUT PENALTY</button>
</dialog></div>
