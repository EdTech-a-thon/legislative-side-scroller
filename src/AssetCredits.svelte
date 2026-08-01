<script lang="ts">
  let { onclose }: { onclose: () => void } = $props();
</script>

<div class="modal-backdrop"><dialog class="credits-panel" open aria-labelledby="credits-title">
  <button class="close" aria-label="Close asset credits" onclick={onclose}>×</button>
  <p class="eyebrow">ASSET CREDITS</p><h2 id="credits-title">PIXEL ART & UI</h2>
  <section><h3>Modern Interiors</h3><p>Interior tiles, furniture, and character assets from the Modern Interiors asset pack by LimeZu.</p></section>
  <section><h3>Modern UI & Portrait Generator</h3><p>Dialogue UI and portrait-generator assets from the Modern UI asset pack by LimeZu and companion portrait-generator assets.</p></section>
  <section><h3>Character Generator 2.0</h3><p>Modular character and outfit assets used for player and NPC sprite development.</p></section>
  <p class="credits-note">These purchased assets are used under their included licenses. The Modern Interiors license permits commercial and noncommercial use with required credit. Asset files and license text are preserved with this project.</p>
</dialog></div>
