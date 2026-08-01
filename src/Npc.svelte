<script lang="ts">
  import type { Encounter } from './game';

  let { encounter, completed, locked, onHold = false, nearby, paused = false, oninteract }: { encounter: Encounter; completed: boolean; locked: boolean; onHold?: boolean; nearby: boolean; paused?: boolean; oninteract: (encounter: Encounter) => void } = $props();
</script>

<button class:nearby class:completed class="npc" style={`left:${encounter.x}px;top:${encounter.y}px`} disabled={completed || locked || paused} onclick={() => oninteract(encounter)} aria-label={`Talk to ${encounter.name}`}>
  {#if completed}<div class="check" aria-label="Support secured">✓</div>{:else if locked}<div class="locked" aria-label="No further meeting">×</div>{:else if onHold}<div class="hold" aria-label="Hold active">H</div>{:else}<div class="available" aria-label="Available to talk">!</div>{/if}
  <div class="npc-sprite senate-token" style={`--npc-color:${encounter.color}`} aria-hidden="true"><i></i><span>{encounter.portrait}</span></div>
  <div class="nameplate">
    <strong>{encounter.name}</strong>
    <span>{completed ? `+${encounter.votes} votes` : locked ? 'No further meeting' : onHold ? 'HOLD ACTIVE' : encounter.title}</span>
  </div>
  {#if nearby && !completed && !locked}<div class="talk-prompt">E · TALK</div>{/if}
</button>
