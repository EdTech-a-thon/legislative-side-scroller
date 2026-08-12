<script lang="ts">
  import { isWellFormedZip } from './zip-lookup';

  let {
    jurisdictionName,
    initialZip = '',
    districtCount = 0,
    onskip,
    onsave,
    onclose
  }: {
    jurisdictionName: string;
    initialZip?: string;
    districtCount?: number;
    onskip: () => void;
    onsave: (zip: string) => void;
    onclose: () => void;
  } = $props();

  let zip = $state('');
  let saved = $state(false);
  $effect(() => { zip = initialZip; });

  // Reflects the result of the most recent save, so the student can tell whether the ZIP actually
  // narrowed anything before they go back to the question.
  let resultMessage = $derived(
    !saved ? ''
      : districtCount === 0 ? `That ZIP code is not listed for ${jurisdictionName}. Any current U.S. Representative from ${jurisdictionName} will be accepted.`
      : districtCount === 1 ? 'Narrowed to your congressional district. Your own representative is now the accepted answer.'
      : `Your ZIP code covers ${districtCount} congressional districts, so any of those representatives is accepted.`
  );
</script>

<div class="modal-backdrop"><dialog class="representative-lookup" open aria-labelledby="representative-title">
  <p class="eyebrow">QUESTION 29 · YOUR U.S. REPRESENTATIVE</p><h2 id="representative-title">FIND YOUR DISTRICT</h2>
  <p>U.S. Representatives serve congressional districts, so a state alone does not identify one person. Without a ZIP code, any current U.S. Representative from {jurisdictionName} is accepted.</p>
  <p>A ZIP code narrows this to your own district. It is matched against a list built into the game, so no lookup request ever leaves your device.</p>
  <div class="lookup-actions"><div><label for="zip">ZIP code (optional)</label><div class="zip-row"><input id="zip" bind:value={zip} oninput={() => { zip = zip.replace(/\D/g, '').slice(0, 5); saved = false; }} placeholder="12345" inputmode="numeric" autocomplete="postal-code" /><button class="primary" disabled={!isWellFormedZip(zip)} onclick={() => { onsave(zip); saved = true; }}>LOOK UP</button></div></div></div>
  <p class="lookup-note">Your ZIP code is saved with your profile on this device so you are not asked again. It is never sent anywhere, and it is not shown in your Notebook, certificate, or any teacher record. Clear it any time by emptying this box and looking up again.</p>
  {#if resultMessage}<p class="lookup-status">{resultMessage}</p>{/if}
  <div class="lookup-footer"><button class="primary" onclick={onclose}>BACK TO THE QUESTION</button><button class="text-button" onclick={onskip}>SKIP THIS QUESTION WITHOUT PENALTY</button></div>
</dialog></div>
