# Capitol Hill Crawler Portrait Asset Checklist

Use this document as a build checklist for final portrait and sprite assets.

## Export Rules

- [ ] Export every portrait as a transparent PNG.
- [ ] Use `48 x 48` pixels when possible.
- [ ] `96 x 96` pixels is acceptable if every expression for that character uses the same size.
- [ ] Export one expression per file.
- [ ] Use lowercase kebab-case filenames exactly as listed.
- [ ] Do not bake names or dialogue text into portrait images.

## President Anthony J. DiSantis

Visual requirements:

- [ ] Bald
- [ ] Black-framed glasses
- [ ] Neatly kept beard
- [ ] Navy suit
- [ ] Bright patterned tie
- [ ] Freemason lapel pin

Portrait files:

- [ ] `president-disantis-neutral.png`
- [ ] `president-disantis-pleased.png`
- [ ] `president-disantis-thoughtful.png`
- [ ] `president-disantis-concerned.png`
- [ ] `president-disantis-grin.png`

## Sutton DiSantis

Visual requirements:

- [ ] Brunette hair
- [ ] Girly, age-appropriate outfit
- [ ] Bow, headband, or another bright hair accessory

Portrait files:

- [ ] `sutton-disantis-neutral.png`
- [ ] `sutton-disantis-pleased.png`
- [ ] `sutton-disantis-excited.png`
- [ ] `sutton-disantis-concerned.png`

## Mr. Ben Venello

Visual requirements:

- [ ] Bald
- [ ] Beard
- [ ] No glasses
- [ ] Quieter professional suit than President DiSantis
- [ ] House staff or visitor lapel badge

Portrait files:

- [ ] `ben-venello-welcoming.png`
- [ ] `ben-venello-thoughtful.png`
- [ ] `ben-venello-encouraging.png`
- [ ] `ben-venello-concerned.png`

## Abner Mendoza, Press Secretary

Visual requirements:

- [ ] Distinct professional White House Press Secretary appearance
- [ ] Clearly different from Ben Venello and President DiSantis
- [ ] Optional press badge, briefing folder, or subtle earpiece

Portrait files:

- [ ] `abner-mendoza-neutral.png`
- [ ] `abner-mendoza-thoughtful.png`
- [ ] `abner-mendoza-concerned.png`
- [ ] `abner-mendoza-pleased.png`

## Priority House Leaders

### Wren Castellano

- [ ] `wren-castellano-neutral.png`
- [ ] `wren-castellano-pleased.png`
- [ ] `wren-castellano-thoughtful.png`
- [ ] `wren-castellano-concerned.png`

### Sarah Sterling

- [ ] `sarah-sterling-neutral.png`
- [ ] `sarah-sterling-pleased.png`
- [ ] `sarah-sterling-thoughtful.png`
- [ ] `sarah-sterling-concerned.png`

### Diane Okafor

- [ ] `diane-okafor-neutral.png`
- [ ] `diane-okafor-pleased.png`
- [ ] `diane-okafor-thoughtful.png`
- [ ] `diane-okafor-concerned.png`

### Tom Bracewell

- [ ] `tom-bracewell-neutral.png`
- [ ] `tom-bracewell-pleased.png`
- [ ] `tom-bracewell-thoughtful.png`
- [ ] `tom-bracewell-concerned.png`

### Marcus Vance

- [ ] `marcus-vance-neutral.png`
- [ ] `marcus-vance-pleased.png`
- [ ] `marcus-vance-thoughtful.png`
- [ ] `marcus-vance-concerned.png`

## Priority Senate Leaders

### Eleanor Vance

- [ ] `eleanor-vance-neutral.png`
- [ ] `eleanor-vance-pleased.png`
- [ ] `eleanor-vance-thoughtful.png`
- [ ] `eleanor-vance-concerned.png`

### Regina Alvarez

- [ ] `regina-alvarez-neutral.png`
- [ ] `regina-alvarez-pleased.png`
- [ ] `regina-alvarez-thoughtful.png`
- [ ] `regina-alvarez-concerned.png`

### Augustus "The Anchor" Kane

- [ ] `augustus-kane-neutral.png`
- [ ] `augustus-kane-pleased.png`
- [ ] `augustus-kane-thoughtful.png`
- [ ] `augustus-kane-concerned.png`
- [ ] `augustus-kane-commanding.png`

### Lucia Marchetti

- [ ] `lucia-marchetti-neutral.png`
- [ ] `lucia-marchetti-pleased.png`
- [ ] `lucia-marchetti-thoughtful.png`
- [ ] `lucia-marchetti-concerned.png`
- [ ] `lucia-marchetti-intense.png`

## Supporting Staff Portraits

- [ ] `committee-clerk-hiroshi-tanaka-neutral.png`
- [ ] `committee-clerk-hiroshi-tanaka-pleased.png`
- [ ] `cloakroom-staffer-neutral.png`
- [ ] `press-row-intern-neutral.png`
- [ ] `west-wing-briefer-neutral.png`
- [ ] `west-wing-operations-aide-neutral.png`

## Ghost Portraits

Visual requirements:

- [ ] Use pale, translucent blue-gray or warm-gold treatment.
- [ ] Keep faces and expressions readable.

Files:

- [ ] `ghost-washington-neutral.png`
- [ ] `ghost-washington-thoughtful.png`
- [ ] `ghost-lincoln-neutral.png`
- [ ] `ghost-lincoln-thoughtful.png`

## Optional Map Sprites

Use these for stationary overworld characters.

```text
48 x 48 PNG
Transparent background
Facing down or three-quarter front
```

- [ ] `wren-castellano-standing.png`
- [ ] `president-disantis-standing.png`
- [ ] `ben-venello-standing.png`
- [ ] `abner-mendoza-standing.png`
- [ ] `duncan-johnson-standing.png`

## Optional Walking Sprite Sheets

Use this format when creating a full walking animation:

```text
192 x 192 PNG
4 columns x 4 rows
48 x 48 pixels per frame
Row 1: down
Row 2: left
Row 3: right
Row 4: up
```

Suggested filenames:

- [ ] `player-representative-walk.png`
- [ ] `wren-castellano-walk.png`
- [ ] `ben-venello-walk.png`
- [ ] `duncan-johnson-walk.png`

## Upload Organization

Suggested folder structure:

```text
portraits/
  president-disantis/
  sutton-disantis/
  ben-venello/
  abner-mendoza/
  house/
  senate/
  staff/
  ghosts/

sprites/
  player/
  house/
  senate/
  tourists/
```

## Recommended Creation Order

1. [ ] President DiSantis portrait set
2. [ ] Sutton DiSantis portrait set
3. [ ] Ben Venello portrait set
4. [ ] Abner Mendoza portrait set
5. [ ] Wren, Sarah, Diane, Tom, and Marcus
6. [ ] Eleanor, Regina, Kane, and Lucia
7. [ ] Staff and ghost portraits
8. [ ] Standing sprites
9. [ ] Walking sprite sheets
