<script lang="ts">
  let { x, y, skinTone = '#d8a57c', presentation = 'female' }: { x: number; y: number; skinTone?: string; presentation?: 'female' | 'male' } = $props();
</script>

<div class="player" style={`left:${x}px;top:${y}px`} aria-label="Your character">
  <div class="player-sprite" style={`--skin:${skinTone};--hair:${presentation === 'male' ? '#2c2022' : '#5a2e38'};--sprite-position:${presentation === 'male' ? '0 0' : '-48px 0'}`}><i aria-hidden="true"></i><span class:male={presentation === 'male'}></span></div>
</div>
