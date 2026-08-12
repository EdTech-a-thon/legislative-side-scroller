<script lang="ts">
  import { jurisdictions } from './jurisdictions';
  import { officeholderDataLastVerified } from './officeholders';
  let { initialCode = '', initialZip = '', oncomplete }: { initialCode?: string; initialZip?: string; oncomplete: (code: string, zip: string) => void } = $props();
  let code = $state('');
  let zip = $state('');
  $effect(() => { code = initialCode; zip = initialZip; });
</script>

<div class="modal-backdrop"><dialog class="profile-panel" open aria-labelledby="profile-title">
  <p class="eyebrow">STUDY PROFILE</p><h2 id="profile-title">YOUR JURISDICTION</h2>
  <p>Select a state or territory for location-based civics questions. ZIP code is optional and only narrows the U.S. Representative question to your own congressional district.</p>
  <label for="jurisdiction">State or territory</label><select id="jurisdiction" bind:value={code}><option value="">Choose one...</option>{#each jurisdictions as item}<option value={item.code}>{item.name}</option>{/each}</select>
  <label for="zip">ZIP code (optional)</label><input id="zip" bind:value={zip} oninput={() => zip = zip.replace(/\D/g, '').slice(0, 5)} placeholder="12345" inputmode="numeric" autocomplete="postal-code" />
  <p class="profile-note">Current-officeholder data: last verified {officeholderDataLastVerified}. Current-officeholder questions are safely swapped until their local lookup data is verified. State and territory capital questions use your selected jurisdiction.</p>
  <p class="profile-privacy"><strong>Your jurisdiction and ZIP code are stored only on this device, and never uploaded online.</strong></p>
  <p class="profile-note">ZIP codes are matched against a list built into the game, so no location lookup ever leaves your browser. Without a ZIP code, any current U.S. Representative from your state is accepted.</p>
  <p class="profile-note"><strong>Answer tip:</strong> For a current elected official, a last name is usually enough. Use a first name too only when more than one relevant official shares that last name.</p>
  <button class="primary" disabled={!code} onclick={() => oncomplete(code, zip.trim())}>SAVE PROFILE →</button>
</dialog></div>
