<script lang="ts">
  import Portrait from './Portrait.svelte';
  import { landmarkText } from './story-dialogue';
  let { landmark, oncontinue, onclose }: { landmark: string; oncontinue: () => void; onclose: () => void } = $props();
  const storyKeys: Record<string, keyof typeof landmarkText> = { capitol: 'capitol', 'white-house': 'white-house', monument: 'monument', reflecting: 'reflecting', lincoln: 'lincoln', smithsonian: 'smithsonian', library: 'library', court: 'court', cafe: 'cafe', press: 'press', duncan: 'duncan', tourists: 'tourists' };
  const initials: Record<string, string> = { capitol: 'US', 'white-house': 'WH', monument: 'WM', reflecting: 'RP', lincoln: 'LM', smithsonian: 'SM', library: 'LC', court: 'SC', cafe: 'CF', press: 'PR', duncan: 'DJ', tourists: 'DC' };
  let info = $derived(landmarkText[storyKeys[landmark] ?? 'mall']);
</script>
<div class="modal-backdrop"><dialog class="landmark-card" open aria-labelledby="landmark-card-title"><button class="close" aria-label="Close landmark card" onclick={onclose}>×</button><Portrait character="npc" initials={initials[landmark] ?? 'DC'} mood="thoughtful"/><p class="eyebrow">WASHINGTON, D.C. LANDMARK</p><h2 id="landmark-card-title">{info.title}</h2><p>{info.body}</p><p>{info.reflection}</p><button class="primary" onclick={oncontinue}>CONTINUE →</button></dialog></div>
