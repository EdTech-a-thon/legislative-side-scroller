<script lang="ts">
  import type { Encounter } from './game';

  let { encounter, completed, nearby }: { encounter: Encounter; completed: boolean; nearby: boolean } = $props();
</script>

<div class:nearby class:completed class="npc" style:left={`${encounter.x}px`}>
  {#if completed}<div class="check" aria-label="Support secured">✓</div>{/if}
  <div class="npc-head" style:--npc-color={encounter.color}>{encounter.portrait}</div>
  <div class="npc-body" style:--npc-color={encounter.color}></div>
  <div class="nameplate">
    <strong>{encounter.name}</strong>
    <span>{completed ? `+${encounter.votes} votes` : encounter.title}</span>
  </div>
  {#if nearby && !completed}<div class="talk-prompt">E · TALK</div>{/if}
</div>
