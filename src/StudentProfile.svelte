<script lang="ts">
  import { jurisdictions } from './jurisdictions';
  import { officeholderDataLastVerified } from './officeholders';
  let { initialCode = '', initialCity = '', oncomplete }: { initialCode?: string; initialCity?: string; oncomplete: (code: string, city: string) => void } = $props();
  let code = $state('');
  let city = $state('');
  $effect(() => { code = initialCode; city = initialCity; });
</script>

<div class="modal-backdrop"><dialog class="profile-panel" open aria-labelledby="profile-title">
  <p class="eyebrow">STUDY PROFILE</p><h2 id="profile-title">YOUR JURISDICTION</h2>
  <p>Select a state or territory for location-based civics questions. City is optional and only supports a future Representative lookup.</p>
  <label for="jurisdiction">State or territory</label><select id="jurisdiction" bind:value={code}><option value="">Choose one...</option>{#each jurisdictions as item}<option value={item.code}>{item.name}</option>{/each}</select>
  <label for="city">City (optional)</label><input id="city" bind:value={city} maxlength="60" placeholder="Your city" />
  <p class="profile-note">Current-officeholder data: last verified {officeholderDataLastVerified}. Current-officeholder and district questions are safely swapped until their local lookup data is verified. State and territory capital questions use your selected jurisdiction.</p>
  <p class="profile-note"><strong>Answer tip:</strong> For a current elected official, a last name is usually enough. Use a first name too only when more than one relevant official shares that last name.</p>
  <button class="primary" disabled={!code} onclick={() => oncomplete(code, city.trim())}>SAVE PROFILE →</button>
</dialog></div>
