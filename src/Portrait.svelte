<script lang="ts">
  let { character, name = '', mood = 'neutral', initials, skinTone, presentation }: { character: string; name?: string; mood?: 'neutral' | 'pleased' | 'thoughtful' | 'concerned'; initials: string; skinTone?: string; presentation?: 'female' | 'male' } = $props();
  const styles: Record<string, string> = {
    president: '--skin:#d9a17b;--hair:#2d2524;--suit:#243f62;--tie:#d75c69',
    sutton: '--skin:#e5b08c;--hair:#5a2d28;--suit:#c46e9e;--tie:#f0d06f',
    venello: '--skin:#d39a73;--hair:#49312b;--suit:#4a6078;--tie:#d7a54e',
    player: '--skin:#d8a57c;--hair:#49312b;--suit:#2f5876;--tie:#e8b956',
    npc: '--skin:#c98767;--hair:#3c2c2b;--suit:#5d7184;--tie:#d4a85c',
    wren: '--skin:#b97758;--hair:#49312b;--suit:#547a98;--tie:#e8b956', sterling: '--skin:#d69a74;--hair:#8b5a42;--suit:#b34f52;--tie:#f2d180', diane: '--skin:#704634;--hair:#272426;--suit:#405f7d;--tie:#db9c4f', tom: '--skin:#d8a47b;--hair:#bdc2c5;--suit:#6a725f;--tie:#b15047', marcus: '--skin:#633d31;--hair:#20252d;--suit:#426b83;--tie:#d26d61', eleanor: '--skin:#c18462;--hair:#495b6c;--suit:#507b7c;--tie:#e1b15a', kane: '--skin:#9b6249;--hair:#2d2524;--suit:#6b3b42;--tie:#e0ab56', lucia: '--skin:#d49a78;--hair:#26232d;--suit:#624f83;--tie:#d8d4dd'
  };
  let named = $derived(character === 'npc' ? (name.toLowerCase().includes('wren')?'wren':name.toLowerCase().includes('sterling')?'sterling':name.toLowerCase().includes('diane')?'diane':name.toLowerCase().includes('bracewell')?'tom':name.toLowerCase().includes('marcus')?'marcus':name.toLowerCase().includes('eleanor')?'eleanor':name.toLowerCase().includes('kane')?'kane':name.toLowerCase().includes('marchetti')?'lucia':'npc') : character);
  let portraitStyle = $derived(`${styles[named] ?? styles.npc}${character === 'player' && skinTone ? `;--skin:${skinTone}` : ''}${character === 'player' && presentation ? `;--hair:${presentation === 'male' ? '#2c2022' : '#5a2e38'}` : ''}`);
  let spritePosition = $derived(character === 'player' ? (presentation === 'male' ? '0 0' : '-48px 0') : named === 'npc' ? '-96px 0' : '0 0');
</script>

<div class:pleased={mood === 'pleased'} class:thoughtful={mood === 'thoughtful'} class:concerned={mood === 'concerned'} class={`pixel-portrait portrait-${named}`} style={`${portraitStyle};--sprite-position:${spritePosition}`}>
  <div class="portrait-sprite" aria-hidden="true"></div>
  <div class="portrait-hair"></div><div class="portrait-face"><i></i><i></i><b></b></div>{#if ['president','venello','kane'].includes(named)}<div class="portrait-beard"></div>{/if}{#if named === 'president'}<div class="portrait-glasses"></div><div class="portrait-pin">◇</div>{/if}{#if named === 'sutton'}<div class="portrait-bow">◆</div>{/if}<div class="portrait-suit"><span></span></div><em>{initials}</em>
</div>
