<script lang="ts">
  import Portrait from './Portrait.svelte';
  const blockedWords = ['ass', 'bastard', 'bitch', 'cock', 'cunt', 'dick', 'fag', 'fuck', 'hitler', 'nazi', 'porn', 'pussy', 'rape', 'sex', 'shit', 'slut', 'whore'];
  const skinTones = ['#f4d1b3', '#d8a57c', '#ad7653', '#754a35', '#4c3029'];
  let { oncomplete }: { oncomplete: (profile: { firstName: string; lastName: string; presentation: 'female' | 'male'; skinTone: string; party: 'D' | 'R' }) => void } = $props();
  let firstName = $state('');
  let lastName = $state('');
  let presentation = $state<'female' | 'male'>('female');
  let skinTone = $state(skinTones[1]);
  let party = $state<'D' | 'R'>('D');

  function cleanFirst(value: string) { return value.replace(/[^a-zA-Z]/g, '').slice(0, 20); }
  function cleanLast(value: string) { return value.replace(/[^a-zA-Z]/g, '').slice(0, 20); }
  function inappropriate(value: string) { const normalized = value.toLowerCase().replace(/[^a-z]/g, ''); return blockedWords.some((word) => normalized.includes(word)); }
  let valid = $derived(firstName.length >= 2 && lastName.length >= 2 && firstName.length + lastName.length <= 40 && !inappropriate(firstName) && !inappropriate(lastName));
  let warning = $derived((firstName || lastName) && (inappropriate(firstName) || inappropriate(lastName)) ? 'Please choose a school-appropriate name.' : '');
</script>

<div class="modal-backdrop"><dialog class="character-panel" open aria-labelledby="character-title">
  <p class="eyebrow">NEW CAMPAIGN</p><h2 id="character-title">CREATE YOUR<br /><span>REPRESENTATIVE</span></h2>
  <p>Your name will appear in dialogue and on your completion record.</p>
  <div class="character-form"><label for="first-name">First name</label><input id="first-name" bind:value={firstName} oninput={() => firstName = cleanFirst(firstName)} minlength="2" maxlength="20" placeholder="2-20 letters" autocomplete="given-name" />
    <label for="last-name">Last name</label><input id="last-name" bind:value={lastName} oninput={() => lastName = cleanLast(lastName)} minlength="2" maxlength="20" placeholder="2-20 letters" autocomplete="family-name" />
    <span class="field-note">Use 2-20 letters for each name, with 40 letters total.</span>
    {#if warning}<p class="name-warning">{warning}</p>{/if}
  </div>
  <section class="appearance"><h3>Party alignment</h3><div class="appearance-options"><button class:active={party === 'D'} onclick={() => party = 'D'}>DEMOCRAT</button><button class:active={party === 'R'} onclick={() => party = 'R'}>REPUBLICAN</button></div><p class="field-note">This changes which leaders are on your side. It does not change the bill or story.</p><h3>Presentation</h3><div class="appearance-options"><button class:active={presentation === 'female'} onclick={() => presentation = 'female'}>FEMALE</button><button class:active={presentation === 'male'} onclick={() => presentation = 'male'}>MALE</button></div><h3>Skin tone</h3><div class="tone-options">{#each skinTones as tone}<button class:active={skinTone === tone} style:background={tone} aria-label="Choose skin tone" onclick={() => skinTone = tone}></button>{/each}</div></section>
   <div class="character-preview"><Portrait character="player" skinTone={skinTone} {presentation} initials={`${(firstName || 'F')[0]}${(lastName || 'L')[0]}`} /><strong>REP. {firstName || 'FIRST'} {lastName || 'LAST'}</strong></div>
  <button class="primary" disabled={!valid} onclick={() => oncomplete({ firstName, lastName, presentation, skinTone, party })}>BEGIN YOUR TERM →</button>
</dialog></div>
