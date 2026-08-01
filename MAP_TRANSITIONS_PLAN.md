# Map Transitions Implementation Plan

## Scope

This plan covers only the map-to-map routes listed below. Keep the current
single-screen architecture in `src/App.svelte`; no router, new dependency, or
map-component rewrite is needed.

The application currently treats `screen` as the active top-level map:

```ts
type Screen =
  | 'title'
  | 'game'       // House floor
  | 'rotunda'
  | 'senate'
  | 'archive'
  | 'office'
  | 'subway'
  | 'whiteHouse'
  | 'dc';
```

House and Senate positions are held in `App.svelte` and persisted. The other
maps own their local starting position, so they reset whenever they are
unmounted and revisited. That is appropriate for this minimal pass unless
resume-in-place is a stated requirement.

## Current Route Map

| Required route | Current trigger | Current `App.svelte` destination | Status |
| --- | --- | --- | --- |
| House -> Rotunda | `World.svelte` `rotunda` zone | `screen = 'rotunda'` in `useHouseZone()` | Works |
| Rotunda -> House | `RotundaMap.svelte` House Floor station | `enterHouse()` -> `screen = 'game'` | Works |
| House -> D.C. | `World.svelte` `dc` zone | `screen = 'dc'` in `useHouseZone()` | Works |
| D.C. -> House | No direct House trigger | D.C. -> Rotunda -> House only | Intentional two-step route, but should be documented in the UI copy |
| Rotunda -> Senate | `RotundaMap.svelte` Senate station after 218 House votes | `enterSenate()` -> `screen = 'senate'` | Works |
| Senate -> Rotunda | `SenateMap.svelte` exit zone and HUD button | inline `screen = 'rotunda'` | Works, but duplicated |
| Senate -> Archive | `SenateMap.svelte` Archive zone | sets `activeHoldId = 'eleanor-vance'` | Broken |
| Senate -> Office | `SenateHold.svelte` Priya hold action | inline `screen = 'office'` | Works through the hold dialog only |
| Senate -> Subway | `SenateMap.svelte` Cloakroom/Subway zone | inline `screen = 'subway'` | Works |
| Archive/Office/Subway -> Senate | exit controls or return zone | dedicated return functions | Works |
| D.C. -> White House | `DcOverworld.svelte` White House landmark after unlock | inline `screen = 'whiteHouse'` | Works, but bypasses a transition helper and save |
| White House -> Oval Office | White House Oval Office door confirmation | `enterOvalOffice()` opens the final-assessment overlay | Works |
| White House -> D.C. | White House header says “D.C.” | inline `screen = 'rotunda'` | Broken destination and misleading label |

## Bugs And Gaps To Fix

1. **The Archive door never opens the Archive.**
   `SenateMap.svelte` correctly emits `onarchive()`, but the integration at
   `App.svelte:670` assigns `activeHoldId = 'eleanor-vance'` instead of
   `screen = 'archive'`. The player sees Eleanor's hold panel and cannot enter
   `ArchiveBasement.svelte` from the Senate map. The separate `archive` screen
   branch and `returnFromArchive()` are therefore effectively unreachable.

2. **The White House return target conflicts with its label.**
   `WhiteHouse.svelte:45` labels the button “← D.C.”, while its `onreturn`
   handler at `App.svelte:659` sets `screen = 'rotunda'`. Return to D.C. so the
   label, travel fiction, and map graph agree.

3. **Direct D.C. map changes do not save.**
   `DcOverworld`'s Capitol callback and White House landmark callback use
   inline `screen` assignments in `App.svelte:657`. A manual save occurs only
   after a later activity. Map travel should call the same small transition
   helper pattern as House/Rotunda travel so the current campaign state is
   saved consistently.

4. **Transition rules are split between functions and template callbacks.**
   `enterHouse`, `enterSenate`, `openWhiteHouse`, and the three Senate return
   functions exist, while several routes use inline assignments in the markup.
   This is why the archive route and White House return route can drift from
   their component labels. Consolidating the listed routes into named handlers
   is the smallest change that creates one auditable map graph.

5. **Entry position behavior is inconsistent but should not be expanded in this
   item.**
   House and Senate have guarded spawn coordinates in `App.svelte`; Rotunda,
   D.C., White House, Archive, Office, and Subway use component-local defaults.
   This means returns to those maps reset position. Do not add save fields or
   per-map coordinate props in this pass; confirm that behavior manually and
   treat persistent positions as a later enhancement.

## Minimal `App.svelte` Changes

### 1. Define one local screen alias

Near the existing `screen` declaration, extract its union into a `Screen`
type and retain the existing values. This is a type-only cleanup that makes
the helpers below safe without changing saved data.

### 2. Add focused transition helpers

Add small functions adjacent to the existing `enterHouse()` and
`enterSenate()` functions. Each should set the destination, maintain
`activeLevel` where the destination is House or Senate, and call `save()`.

Required helpers:

| Helper | Destination | Required behavior |
| --- | --- | --- |
| `enterRotunda()` | `rotunda` | Set the screen and save. Do not change `activeLevel`; it describes the active encounter layer, not the hub. |
| `enterDc()` | `dc` | Set the screen and save. |
| `enterArchive()` | `archive` | Set the screen and save. Do not alter `activeHoldId`; entering the room is separate from Eleanor's hold dialog. |
| `enterOffice()` | `office` | Set the screen and save. It remains invoked only by Priya's valid hold action. |
| `enterSubway()` | `subway` | Set the screen and save. Preserve current behavior: it is available for scouting before Gridlock and for Rogue Nodes during Gridlock. |
| `enterWhiteHouse()` | `whiteHouse` | Set the screen and save. Move the unlock assignment from `openWhiteHouse()` into this helper, or keep `openWhiteHouse()` as the Cloture-specific wrapper that sets `whiteHouseUnlocked = true` and calls it. |

Update the existing House and Senate entry functions to call `save()` after
their current safe-spawn logic. Keep the current coordinate bounds checks;
they prevent resumes from placing the player outside a walkable chamber.

Keep `returnFromArchive`, `returnFromOffice`, and `returnFromSubway` as small
wrappers if preferred, but have each call a shared Senate-entry/return helper
so all three restore `activeLevel = 'senate'`, safely spawn the player, and
save consistently. Do not make `enterSenate()` depend on House passage: the
Rotunda map already enforces that gate through `housePassed` and disabled UI.

### 3. Replace template-level assignments with the helpers

Make the following exact wiring substitutions in the template:

| Current integration | Replacement |
| --- | --- |
| Rotunda `ondc={() => screen = 'dc'}` | `ondc={enterDc}` |
| D.C. `onrotunda={() => screen = 'rotunda'}` | `onrotunda={enterRotunda}` |
| D.C. White House spot `screen = 'whiteHouse'` | `enterWhiteHouse()` after the existing `whiteHouseUnlocked` check |
| White House `onreturn={() => screen = 'rotunda'}` | `onreturn={enterDc}` |
| Senate HUD and `SenateMap` Rotunda callbacks | `enterRotunda` |
| Senate `onarchive={() => { activeHoldId = 'eleanor-vance'; }}` | `onarchive={enterArchive}` |
| Senate `onovertime={() => screen = 'subway'}` | `onovertime={enterSubway}` |
| Priya hold `onoffice` inline callback | close the hold dialog, then call `enterOffice()` |

Retain the existing encounter guard for Eleanor in the Senate map integration:
approaching Eleanor herself should still open her Hold dialog until the
briefing has been recovered. Only the separately labelled Archive door should
enter the archive map.

### 4. Keep Oval Office as an overlay, not a `screen`

`enterOvalOffice()` should remain an overlay transition via `ovalOfficeOpen`.
It is deliberately not a new `screen` because it is a final assessment over
the White House context. Do not add an `ovalOffice` screen value or alter the
current override branch. No position behavior needs to change for this route.

## Route Acceptance Checklist

Run these checks manually after implementation:

1. From the House Rotunda Hall, enter the Rotunda; then use House Floor and
   confirm the player is in the valid House aisle and the tutorial state is
   unchanged.
2. From the House Exit to D.C., enter D.C.; use the Capitol landmark, then
   use the Rotunda House station. Confirm this is the intentional two-step
   D.C.-to-House return path.
3. With fewer than 218 House votes, confirm the Rotunda Senate station remains
   disabled. At 218 or more votes, enter Senate and confirm the valid Senate
   aisle spawn.
4. In Senate, use the Archive door. Confirm `ArchiveBasement` appears, the
   briefing can be recovered, and its return action restores Senate.
5. Trigger Priya's Hold, choose the office action, recover the briefcase, and
   return to Senate. Confirm unrelated holds remain unchanged.
6. Enter Subway before Gridlock to scout, return to Senate, then enter again
   after Gridlock and confirm Rogue Nodes still work.
7. After Cloture, enter White House from D.C., confirm the Oval Office door
   launches its confirmation and assessment, and use White House “← D.C.” to
   confirm it returns to D.C., not the Rotunda.
8. Refresh or use Continue after each representative map change. Confirm the
   normal continue destination remains Rotunda, as currently designed, and
   campaign progress is retained.

## Out Of Scope

- Persisting position coordinates for Rotunda, D.C., White House, Archive,
  Office, or Subway.
- Adding animated loading/door-transition scenes.
- Changing House passage, Senate vote, Hold, Filibuster, Cloture, Oval Office,
  or Veto Override rules.
- Replacing the existing `screen` state machine with a routing library.
