# Capitol Hill Crawler: Canonical Systems Specification  
  
**Status:** Pre-coding authority  
  
This document resolves the rules needed before engine work. It supplements the Design Addendum and supersedes conflicting mechanics in the older GDD, Technical Manual V9, Technical Bridge Guide, and NPC Character Bible V7. The official 2025 USCIS civics-test PDF remains the authority for question wording and accepted answer content.  
  
For NPC content, use this order of authority:  
  
1. The Design Addendum controls newly named characters, confirmed characters, vote budgets, roles, and any explicit override.  
2. NPC Character Bible V7 fills gaps where the Addendum is silent, including placeholder names, state/territory flavor, polarization values, question mappings, and dialogue seeds.  
3. Where the two documents conflict, retain the Addendum rule and update the NPC Bible-derived entry during roster consolidation.  
  
## 1. Encounter Difficulty and Rapport  
  
### 1.1 Base encounter format  
  
Each vote-holding NPC has a fixed `polarization` value from 0 through 100. The player bill value is 50. The base difficulty delta is:  
  
`D = abs(50 - polarization)`  
  
The player also has a chosen party alignment. An NPC is `same-side` when its coordinate is on the player's side of 50 and `cross-aisle` otherwise. The coordinate 50 is neutral and uses the first row below.  
  
| Delta | Base format | Base assistance |  
| --- | --- | --- |  
| 0-5 | 3-option multiple choice | Clear question text |  
| 6-15 | Open keyboard response | Clear question text and one context hint |  
| 16-39 | 4-option multiple choice | Clear question text, no hint |  
| 40-50, same-side | 12-option confusion grid | Semantically similar distractors |  
| 40-50, cross-aisle | Mumbled open keyboard response | Obscured nonessential text; required keywords remain answerable |  
  
The old overlapping boundary at `D = 5` and the old gap at `D = 16-39` are removed.  
  
### 1.2 Rapport modifies assistance, never the base format  
  
Rapport does not change an NPC from one base format to another. Polarization selects the format; rapport only changes the help and validation inside that format.  
  
| Rapport score | Tier | Encounter effect |  
| --- | --- | --- |  
| 0-33 | Hostile | No optional hint; strict answer matching; multi-part MC needs 3 correct selections when available |  
| 34-66 | Neutral | Use the base-format assistance; standard answer matching; multi-part MC needs 2 correct selections when available |  
| 67-100 | Friendly | Show one extra contextual hint or clearer mumbled text; forgiving answer matching; multi-part MC needs 1 correct selection |  
  
Every named bloc leader starts at 50 Rapport. A matching dialogue choice adds 15; a mismatching choice subtracts 15. Scores are clamped to 0-100. Standard leaders receive 2-3 rapport choices; bosses receive 4-5. Wrong trait reads never create a hidden punishment beyond the stated Rapport decrease.  
  
Loners have no rapport phase. They use their fixed base format, while the Voting Record may apply only a small documented hint or strictness modifier.  
  
### 1.3 Answer validation  
  
All answers are normalized for case, punctuation, spacing, and common abbreviations. Exact normalized accepted answers always pass.  
  
For open keyboard responses, use edit-distance matching to accept close misspellings while avoiding overly broad matches. One-character tolerance may apply to answers of at least four characters; larger tolerance applies only to answers of at least six characters:  
  
| Tier | Maximum edit distance |  
| --- | --- |  
| Hostile | 1 |  
| Neutral | 2 |  
| Friendly | 3 |  
  
Short answers, names, numbers, and dynamic officeholders must match an accepted normalized value exactly after normalization. The President's Opposition path remains fixed at edit distance 2, as stated in the Design Addendum. Multiple-choice selections are evaluated against their displayed choice, so typo tolerance applies only to keyboard responses.  
  
For long official answer choices with explanatory wording, accept a concise student response when it preserves at least two meaningful words from the same accepted answer. For example, a student may omit articles and explanatory phrases from a long USCIS answer. Do not accept a single broad keyword or a shortened phrase that changes the answer's meaning.  
  
### 1.3.1 Open-ended multi-part questions  
  
Every open-ended encounter requires **one answer only**, including questions whose official USCIS wording asks a student to name two, three, or more items. The game rewrites the displayed gameplay prompt in plain language, such as "Name one of the original 13 colonies" or "Give one example of a civic responsibility."  
  
The official source question and its full accepted-answer set remain in the question data and Notebook. The live encounter accepts any one valid item from that set, then moves on after a correct response. The game never requires repeated submissions to satisfy a multi-part open-ended prompt. This keeps timed keyboard encounters clear, fair, and practical for student devices.  
  
### 1.4 Canonical trait pool  
  
The game uses exactly three trait pairs. At the start of a new playthrough, every named vote-holding leader is randomly assigned one trait pair and then one active side of that pair for the entire playthrough. This makes each leader's preferred communication approach replayable while preserving their fixed identity, personality, polarization, vote range, and map placement.  
  
| Trait pair | Active trait | Communication that raises Rapport |  
| --- | --- | --- |  
| Pragmatic / Idealistic | Pragmatic | Focus on feasible steps, resources, implementation, and concrete results for people. |  
| Pragmatic / Idealistic | Idealistic | Focus on values, long-term purpose, fairness, and the principle behind the bill. |  
| Compromiser / Firm | Compromiser | Focus on coalition-building, common ground, listening, and workable tradeoffs. |  
| Compromiser / Firm | Firm | Focus on clear commitments, standards, boundaries, and defending a stated position. |  
| Detail-oriented / Big-picture | Detail-oriented | Focus on evidence, specifics, timelines, costs, and how the policy will work. |  
| Detail-oriented / Big-picture | Big-picture | Focus on overall goals, community impact, future outcomes, and why the work matters. |  
  
Traits describe a preferred communication approach, not an NPC's political ideology, moral worth, or a correct political position. Both sides of every pair are valid ways to reason about a public-policy problem. Core character writing stays fixed: a media-savvy NPC remains media-savvy, a gruff committee veteran remains gruff, and a demanding chair remains demanding regardless of that run's trait assignment.  
  
### 1.5 Rapport dialogue template  
  
Every standard vote-holding leader has one Rapport Phase before the civics encounter. It presents two or three player responses that all address the same policy prompt. Each response is tagged with one communication approach appropriate to that NPC's randomly assigned trait pair.  
  
- A response matching the NPC's active trait adds 15 Rapport.  
- A response tagged for the other side of the NPC's assigned pair subtracts 15 Rapport.  
- If a third response is used, it is a respectful neutral option. It leaves Rapport unchanged and never creates a penalty beyond that missed opportunity.  
- A player always receives a readable, good-faith response. There are no deceptive "gotcha" or insincere choices.  
- Bosses use four or five choices across their conversation, following the same trait tags and score change. A boss may include more than one opportunity to match its trait.  
  
**Standard dialogue pattern**  
  
1. The NPC identifies a practical bill-related concern.  
2. The player chooses two or three clear ways to make their case.  
3. The NPC reacts in character and Rapport updates invisibly or through a simple Friendly/Neutral/Hostile indicator.  
4. The civics encounter begins using the NPC's fixed polarization-based format.  
  
**Example: pragmatic versus idealistic**  
  
NPC prompt: "Why should my district support this school-internet bill?"  
  
| Player response | Tag |  
| --- | --- |  
| "It gives students reliable access, and the bill includes a plan to maintain the equipment." | Pragmatic |  
| "Every student deserves a fair chance to learn, wherever they live." | Idealistic |  
| "I want to hear what families in your district need most." | Neutral respectful option |  
  
The same structure is used for the other two trait pairs. Writers should use the current bill's concrete subject matter so dialogue teaches communication and civic collaboration rather than abstract personality guessing.  
  
### 1.6 Scouting and trait tells  
  
Moderate and near-flank leaders offer one subtle, readable tell in their initial dialogue. A tell points toward their active trait without naming it directly. For example, a detail-oriented leader may mention line items, while a big-picture leader may describe the future they want for students. The tell is selected from the leader's assigned trait pair for that playthrough and phrased in that leader's established voice.  
  
Extreme leaders provide no reliable in-conversation tell. The player may learn their active trait through an optional scouting interaction with an appropriate staffer, intern, message board, or press-conference scene. Successful scouting writes a plain-language entry to the Notebook, such as "Sen. Kane responds best to firm commitments."  
  
Scouting is optional. Players who do not scout can still succeed through observation, multiple attempts, and normal civics knowledge.  
  
### 1.7 Voting Record  
  
Each non-neutral Rapport response logs one permanent `stanceTag` for the current playthrough. A stance tag records the communication approach used, such as `pragmatic`, `idealistic`, `compromiser`, `firm`, `detailOriented`, or `bigPicture`. Civics answers never create stance tags.  
  
When a later leader evaluates Rapport dialogue, the game may reference a relevant prior stance tag in dialogue. Contradicting a prior tag is allowed; it never locks content, removes votes, or forces a restart. It can apply one small difficulty adjustment to that later encounter:  
  
- Consistent approach: retain the normal Rapport result.  
- Contradictory approach: reduce the resulting Rapport by 5, to a minimum of 0.  
- A neutral respectful option creates no stance tag and cannot create a contradiction.  
  
The UI must explain the consequence in plain language when it occurs, for example: "This leader noticed that your earlier approach was different. Rapport gained was reduced." The system models the challenge of explaining a changing strategy, not a punishment for holding different views.  
  
## 2. Question, Notebook, and Progress Rules  
  
### 2.1 Separate states  
  
The game tracks three independent states for every question:  
  
| State | Meaning |  
| --- | --- |  
| `encountered` | The question was presented in a live encounter. |  
| `answeredCorrectly` | The player answered it correctly in a live encounter and earned its INF reward. |  
| `notebookUnlocked` | Its question-and-answer pair can be studied in the Notebook. |  
  
Notebook entries can be unlocked by live encounters, side quests, the Rotunda Shop, or Ghost encounters. Unlocking an entry alone never grants score, INF, or `answeredCorrectly` credit.  
  
### 2.2 Live-question pool  
  
Each normal playthrough selects 64 unique questions for live House, Committee, and Senate encounters. A question is removed from that live pool after it is presented, whether the player answers correctly or not. Normal encounters do not repeat questions.  
  
### 2.2.1 Leader attempt and retry rule  
  
Every vote-holding leader uses the same normal-campaign attempt rule:  
  
1. A player who misses the first civics attempt may take one immediate second attempt.  
2. The second attempt uses a different unasked question from the active level pool. The original missed question does not repeat.  
3. If the player misses the second attempt, that leader locks for the rest of the normal campaign and does not award votes.  
4. A locked leader never blocks map movement or the player's ability to pursue other open-map encounters.  
5. During a Veto Override, every leader locked by two missed attempts receives one final, single-attempt reopening. The reopening follows the Override question-pool rules and cannot be retried again.  
  
This rule applies to House and Senate vote-holding leaders. Committee Dungeon interactions use their own one-attempt approval/rejection flow because the player must be able to continue through every committee member.  
  
### 2.2.2 Map encounter status indicators  
  
Every vote-holding NPC displays one clear pixel-art status icon above their in-world sprite outside active dialogue. The icon is paired with a text label in the interaction prompt so its meaning does not depend on color alone.  
  
| NPC status | Map icon | Interaction-prompt label | Behavior |  
| --- | --- | --- | --- |  
| Available | White `!` in a dark outline bubble | "Available to talk" | The NPC has an encounter or remaining attempt available. |  
| Approved | Green check mark | "Support secured" | The NPC has awarded their vote block and no longer starts a normal campaign encounter. |  
| Locked | Red `X` | "No further meeting" | The NPC was missed twice and has no normal-campaign attempt remaining. |  
| Override reopened | White `!` in a gold outline bubble | "One more chance" | A previously locked NPC has its one Veto Override attempt available. |  
  
Status icons use a gentle one-pixel bob only for available and Override-reopened NPCs. Approved and locked icons remain still. The player can inspect any icon through the interaction prompt; no NPC becomes invisible or is removed from the map after an outcome.  
  
The old multi-part repeat/elimination rule is removed from normal play because normal questions cannot repeat. It applies only if a future design deliberately allows a repeated question outside this specification.  
  
### 2.3 Level routing  
  
| Stage | Eligible question range |  
| --- | --- |  
| House start | 1-16 |  
| House after four successful live encounters | 1-72 |  
| Committee Dungeon | Same currently active House pool |  
| Senate start | 73-118 |  
| Senate after the 50-vote Filibuster trigger | 73-128 |  
| Oval Office | Global 1-128 pool, subject to the President encounter rules |  
  
The House map is open after the opening tutorial. The player may approach any currently reachable House NPC in any order; Wren Castellano is the first suggested encounter, not a required first interaction. A successful encounter means the player earns that NPC's approval or vote through a correct live civics answer. Once the player has four successful House encounters, questions 17-72 unlock for all later House and Committee draws. The 64-question cap applies to normal live encounters before the Oval Office. The Oval Office may draw from the global pool as its own final assessment. The Veto Override first draws only from questions the player missed or never encountered in the original 64-question pool; if none are available, it draws from unused questions in the other half of the 128-question bank.  
  
### 2.4 Notebook completion  
  
The Notebook can reach 128 entries in one playthrough through 96 side-quest entries, 30 store-exclusive entries, and 2 Ghost-exclusive entries. This does not mean all 128 were used in live encounters.  
  
The Washington ghost tests the 22nd Amendment/two-term-limit fact. Its prerequisite is that the player has answered or unlocked that fact from any non-Ghost source, not that they already own Washington's Ghost-exclusive Notebook entry. The Ghost encounter then awards its exclusive entry.  
  
## 3. Dynamic Civics Answers  
  
The question data must label dynamic questions rather than treating them as fixed strings.  
  
| Question | Validation source |  
| --- | --- |  
| 23, current U.S. senator | Saved state/territory lookup; D.C. and territories accept their official "no U.S. senators" response |  
| 29, current U.S. representative | City-to-district lookup, with state/territory fallback where appropriate |  
| 30, current Speaker | Current national officeholder table |  
| 38, current President | Current national officeholder table |  
| 39, current Vice President | Current national officeholder table |  
| 57, current Chief Justice | Current national officeholder table |  
| 61, current governor | Saved state lookup; D.C. accepts "no governor" |  
| 62, state or territory capital | Saved state/territory lookup; D.C. accepts "not a state/no state capital" |  
  
At save creation, collect a state or territory and an optional city. If a representative lookup is missing or ambiguous, swap that question for a different eligible unasked question.  
  
### 3.1 Current-officeholder data maintenance  
  
Current-officeholder questions remain enabled for all players. The game does not use a browser-only teacher toggle because that would affect only one browser profile and could not reliably control a class of students without a shared teacher account, class code, or backend.  
  
The local officeholder dataset is reviewed and republished twice each year:  
  
| Review date | Purpose |  
| --- | --- |  
| January 28 | Confirm officeholders and jurisdiction data after the start-of-year transition period. |  
| August 28 | Confirm officeholders and jurisdiction data before the school-year civics unit. |  
  
The game displays a visible "Last verified" date for this dataset in the Notebook or student profile. When the current date is past the next scheduled review date, show an educator-facing notice that the data is due for review. The game may automatically determine that its local dataset is overdue, but it does not automatically fetch or replace real-world officeholder data without a trusted external source and an internet connection.  
  
When a current-officeholder answer cannot be safely validated because data is stale, missing, or ambiguous, the question is swapped for another eligible unasked question rather than marking the student wrong. This preserves the question as study material while protecting students from a stale-data penalty.  
  
For officeholder-name answers, accept a last name by default. Require a first name only when more than one relevant officeholder in the active lookup shares that last name. A full first-and-last-name answer is always accepted when it matches the maintained lookup.  
  
Whenever the game presents a current-officeholder question, show this concise instruction beside the input: "A last name is usually enough. Add a first name only if more than one relevant official shares that last name."  
  
## 4. Player Representative  
  
The player is a newly elected freshman U.S. Representative beginning their first major legislative effort. They carry the Connected Classrooms Act because they want to make a meaningful early impact and prove to the constituents who elected them that they can turn a good idea into practical public service.  
  
### 4.1 Character creation  
  
Character creation occurs before the first House scene and is saved per playthrough.  
  
| Field | Rule |  
| --- | --- |  
| Representative name | Player-entered, 2-20 alphabetical characters only. Spaces, punctuation, numbers, symbols, and emoji are rejected. Trim leading and trailing whitespace before validation. |  
| Gender presentation | Player chooses male or female presentation. This controls portrait options and pronouns used by NPC dialogue. It does not affect mechanics, difficulty, dialogue choices, votes, or story outcome. |  
| Skin tone | Player chooses from a small, clearly labeled range of natural skin-tone swatches. This affects the portrait and in-world sprite only. It does not affect mechanics or narrative treatment. |  
| Pronouns | Derive from the chosen presentation: he/him for male and she/her for female. The player name is used wherever possible so dialogue remains natural. |  
| Default name | If the player has not entered a valid name, use "Representative" in UI previews and keep the Start button disabled until a valid name is provided. |  
  
The first version does not need to offer a full character editor. Use a consistent pixel-art portrait base with gender presentation, hairstyle options appropriate to that presentation, and skin-tone selection. More cosmetic options can be added later without changing saved game logic.  
  
### 4.2 Player portrait and sprite  
  
The player uses the same pixel-art portrait-box style as the Oval Office characters. Build a 48x48 portrait from compatible modular art and a simple in-world sprite that uses the selected presentation and skin tone.  
  
- The portrait must remain readable at normal Chromebook screen sizes.  
- Do not use appearance as a gameplay clue or dialogue requirement.  
- The player portrait may appear opposite the active NPC portrait during major dialogue scenes.  
- Use the saved name in dialogue headers, for example, "Rep. Jordan" or "Representative Jordan," without assuming a real state or district identity.  
  
### 4.3 Opening motivation  
  
The opening scene establishes the player's goal in plain language:  
  
> "Your constituents elected you to get things done. The Connected Classrooms Act is your chance to show that a freshman Representative can listen, learn, and bring people together for students."  
  
The game treats the player as ambitious but sincere. Their goal is not personal fame; they want to make a visible, responsible difference for the people who trusted them with their first term.  
  
### 4.4 Opening tutorial: Mr. Ben Venello  
  
**Mr. Ben Venello** introduces the player to the Capitol, leads them to the Connected Classrooms Act, and delivers the opening tutorial. He is a knowledgeable, steady mentor figure who explains systems plainly without talking down to a new Representative.  

| Element | Canonical direction |  
| --- | --- |  
| Narrative role | House mentor and tutorial guide. He meets the player at the House entrance, helps them orient themselves, and leads them to the bill desk where the Connected Classrooms Act awaits. |  
| Relationship to player | A supportive Capitol colleague who recognizes the player's ambition and wants them to succeed, while making clear that support must be earned through listening, preparation, and coalition-building. |  
| Appearance | Similar overall build and tailored-suit silhouette to President DiSantis: bald white man with a neatly kept beard. Unlike DiSantis, Venello does not wear glasses. Give him a quieter suit palette and a simple House visitor or staff lapel badge so the two characters remain visually distinct. |  
| Portrait | 48x48 pixel-art bust portrait in a dialogue box. Required expressions: welcoming, thoughtful, encouraging, and concerned. |  
| Tutorial scope | Introduces movement, interacting with people, the vote counter, the Living Bill Scroll, the Notebook, the first civics encounter, and the Rotunda as the place for items and saving. Teach one concept at a time as the player reaches it. |  
| Gameplay boundary | Mr. Venello never supplies trivia answers or free votes. He explains systems and directs the player toward the next goal, but the player earns all progress. |  
| Dialogue tone | Clear, warm, a little dry, and encouraging. He uses short practical advice rather than jokes or speeches. |  

**Opening sequence**

1. Mr. Venello meets the player outside the House chamber and welcomes them by their chosen name.
2. He explains that the player has one chance to make a strong first impression for the constituents who elected them.
3. He leads the player to the bill desk and presents the Connected Classrooms Act's broad three-goal starting draft.
4. He explains that a good idea needs enough votes and enough detail to become a law.
5. He points the player to Rep. Wren Castellano, the first nearby House encounter, and introduces the vote counter.
6. After that encounter, he directs the player toward the Rotunda, where the player learns about the Living Bill Scroll, Notebook, shop, and Save Station when those features become relevant.

**Dialogue samples**

- Welcome: "Representative {name}. First day on the floor, first bill in hand. That is a lot of firsts. Good thing you came prepared to learn."
- At the bill desk: "The Connected Classrooms Act has a strong idea behind it. Now it needs the kind of detail that turns an idea into a promise people can rely on."
- Before the first encounter: "Start with Representative Castellano. Listen for what matters to her, make your case clearly, and keep your civics sharp."
- On a setback: "A 'no' is information, not a locked door. Take what you learned and find the next path forward."

### 4.5 First House encounter: Rep. Wren Castellano

**Rep. Wren Castellano** is the player's first House encounter. She is a freshman-friendly mentor figure who actively wants the new Representative to succeed, making her the right introduction to the game's conversation, Rapport, and civics systems.

| Element | Canonical direction |
| --- | --- |
| Role | Mid-tier House bloc leader and the first tutorial encounter. |
| Personality | Welcoming, encouraging, practical, and direct. She treats the player as a colleague, not a child. |
| Base encounter format | 3-option multiple choice. Her provisional polarization is 48, so `D = 2`. |
| Rapport phase | A short tutorial Rapport conversation. Wren is always a Compromiser rather than randomized, so the first interaction gives a stable, gentle example of how Rapport works. |
| Question selection | Randomly select one unasked question from the current House starter pool, questions 1-16. Do not permanently tie Wren to one question. |
| Answer presentation | Show the official question wording and three clearly distinct choices, with one correct answer selected from the official USCIS accepted-answer set. |
| First-run protection | If the player answers incorrectly, offer the normal second attempt using a different unasked question from questions 1-16. The encounter remains a supportive tutorial and does not create an early hard lock. |
| Vote reward | Use Wren's finalized mid-tier bloc value once the House roster is consolidated. Her tutorial status does not change that vote value. |

Mr. Venello introduces Wren as someone who remembers what it feels like to be new on the House floor, but the player is free to approach any reachable House NPC instead. The standard House starter pool remains active until four successful House encounters, at which point questions 17-72 unlock under Section 2.3.

**Wren's Rapport tutorial**

Wren says: "The Connected Classrooms Act has a good goal, but good goals do not pass bills by themselves. What will you tell the members who are not sure yet?"

| Player response | Trait approach | Result |
| --- | --- | --- |
| "I will listen to their concerns and find a version of the bill that schools across the country can support." | Compromiser | +15 Rapport |
| "I will make sure every student has reliable learning tools, and I will not let that promise get watered down." | Firm | -15 Rapport |
| "I will start by asking what students and teachers in their districts need most." | Neutral respectful option | No Rapport change |

Wren's tell is explicit but natural: "A bill lasts longer when people can see their concerns in it." After the player chooses, Mr. Venello briefly explains: "Different Representatives listen for different things. Pay attention to what matters to them." This is the only tutorial explanation of the Rapport mechanic; later NPCs rely on their own dialogue and tells.

## 5. Save and Persistence

The game uses one main save slot per browser profile and game website origin, stored as a versioned JSON record in browser `localStorage`. Students signed into separate Chromebook accounts have separate browser profiles and therefore separate saves on the same physical device. The game does not require students to create an account or enter a password.

### 5.1 Save behavior

| Save type | When it occurs |
| --- | --- |
| Manual save | The player uses the Save Station in the Rotunda. |
| Automatic save | Character creation completes. |
| Automatic save | A House or Senate leader is approved or locks. |
| Automatic save | The House question pool expands after four successful encounters. |
| Automatic save | The Committee Dungeon ends. |
| Automatic save | The Filibuster Gauntlet resolves. |
| Automatic save | The Oval Office encounter or Veto Override resolves. |

Save at the end of an outcome, never in the middle of a live civics question or timed encounter. Reloading therefore never changes an already-started question, resets a timer, or creates a retry exploit.

### 5.2 Required save data

The save must retain enough state to reproduce the same playthrough after reload:

- Save schema version and creation/update timestamps.
- Player name, gender presentation, skin tone, state/territory, and optional city.
- Random seed and all generated results, including House vote values, leader trait pairs, active traits, and question ordering.
- NPC Rapport scores, attempts used, approval/lock state, and Veto Override reopening state.
- Voting Record stance tags.
- House and Senate vote counters, Committee result, Gridlock state, and all story/progression flags.
- Encountered, correctly answered, missed, and currently eligible question IDs.
- Notebook entries, Living Bill Scroll amendment states, INF, inventory, score, and in-game clock.
- Current scene and safe player spawn position.

### 5.3 Save limitations and recovery

- A save belongs to the current browser profile and does not automatically transfer to another device.
- Clearing browser site data can erase the save.
- The first implementation uses one main save slot only. Starting a new game requires an explicit confirmation before overwriting the existing save.
- A future export/import feature may be added for teacher support or device changes, but it is not required before the core game is built.

## 6. Rotunda Shop and INF Economy

The Capitol Rotunda is the central hub between the House and Senate. It contains the Save Station, the Living Bill Scroll access point, and the Rotunda Shop. The Shop sells optional preparation tools and Notebook entries; no purchase is required to finish the core campaign.

### 6.1 Earning INF

Players earn Influence Points (INF) only for correct live civics answers. The reward uses the encounter's fixed base format, not the player's Rapport tier:

| Base encounter format | INF for a correct answer |
| --- | ---: |
| 3-option or 4-option multiple choice | 15 INF |
| Open keyboard response | 25 INF |
| 12-option confusion grid or mumbled response | 40 INF |

Correct answers in the Committee Dungeon, favor chain, Senate Gauntlet, Rogue Nodes, and Oval Office award INF using their displayed encounter format. Side-quest and Notebook unlocks do not award INF. A question earns INF only once per playthrough, even if it returns during a Veto Override.

### 6.2 Shop inventory

| Item | Cost | Limit | Effect |
| --- | ---: | --- | --- |
| Store-exclusive Notebook entry | 25 INF | 30 total distinct entries | Adds one available store-exclusive Q&A pair to the Notebook. It is study material only and never grants INF, score, or a correct-answer credit. |
| Cafeteria Coffee | 30 INF | 3 carried at once | During a live timed Senate or Oval Office question, the player may consume it to pause the current question timer for 15 seconds. It has no effect in untimed encounters. |
| Talking Points Memo | 40 INF | 3 carried at once | During a live multiple-choice question, the player may consume it to remove one incorrect choice. It cannot reduce a 3-option question below two displayed choices or a 12-option grid below 11 choices. |
| Hearing Aid | 60 INF | 3 carried at once | During a live mumbled open-response question, the player may consume it to reveal one obscured nonessential phrase. It never reveals the answer itself. |
| Super PAC Injection | 250 INF | 1 per playthrough | During Senate Overtime only, consume it to clear five Rogue Senator Nodes. It has no effect if Path B has already cleared Gridlock. |

The Shop must explain the item effect and eligible encounter type before purchase. Consumables are never activated automatically. A player may keep an item through the Committee Dungeon's readiness check because that check verifies inventory without consuming the item.

### 6.3 Shop interface and safeguards

- Display the player's current INF, item cost, inventory count, and any item limit before confirmation.
- Store-exclusive Notebook entries are purchased one at a time from the unowned pool. Once all 30 are owned, the entry option is unavailable.
- During a live question, show only the consumable tools eligible for that question in a clear "Use an item" control. Consuming an item applies its stated effect immediately, deducts it from inventory, and then returns the player to the active question.
- Items that cannot affect any remaining encounter may still be shown but must be labeled "No remaining use this run" before purchase. The Super PAC Injection is unavailable until Senate Overtime begins.
- Shop purchases save immediately after confirmation.
- The Shop never sells answers during a live encounter. The Notebook cannot be opened during one.

### 6.4 Economy target

A thorough player who answers most of their normal live questions correctly should earn approximately 1,400-1,800 INF in a playthrough. All 30 store-exclusive Notebook entries cost 750 INF, leaving enough for useful preparation items. The economy should reward practice and thoughtful spending without making any item necessary for core completion.

## 7. Legislative Progression

### 7.0 The player bill: Connected Classrooms Act

The player's bill is the **Connected Classrooms Act**, a broadly supported education bill intended to help public schools improve reliable internet access, replace outdated learning equipment, and provide practical support for teachers using those tools.

The bill begins with a deliberately simple promise: students should be able to learn with reliable, modern classroom resources regardless of their ZIP code. Most NPCs agree with that goal. The legislative conflict is about whether the bill has earned support before its details are fully developed.

#### 4.0.1 Starting draft

At the start of the game, the bill contains three clear goals but leaves implementation choices open:

1. Expand reliable high-speed internet access for public schools.
2. Help schools replace outdated learning technology and accessibility equipment.
3. Support teacher training and ongoing maintenance for new classroom tools.

The bill does not begin with a fixed funding formula, timeline, local-control plan, privacy standard, maintenance requirement, or measure of success. This is intentional: the player is learning how a broadly popular idea becomes a workable law through questions, negotiation, and revision.

#### 4.0.2 Why support varies

No major character opposes students having useful educational resources. Concerns arise from the draft's missing details:

| Concern | NPCs likely to raise it | Productive player response |
| --- | --- | --- |
| Cost and long-term maintenance | Pragmatic and detail-oriented leaders | Explain a realistic implementation plan, maintenance funding, and measurable outcomes. |
| Local flexibility | Firm and pragmatic leaders | Explain clear national goals while allowing schools to meet local needs. |
| Fairness and access | Idealistic and big-picture leaders | Explain how rural, low-income, disabled, and under-resourced students benefit. |
| Coalition durability | Compromiser leaders | Explain how the bill can include different communities without losing its core purpose. |
| Accountability and privacy | Detail-oriented leaders | Explain safeguards, reporting, student privacy, and responsible use of public funds. |
| Clear priorities | Firm leaders and extreme leaders | Explain which commitments are non-negotiable and which details can be shaped through amendment. |

The extreme leaders are not hostile to education. They challenge the player because the starting draft is under-specified and they believe broad goals are not enough without enforceable commitments. Their encounters test whether the player can defend the bill's purpose, acknowledge legitimate gaps, and build support without pretending that every concern has already been solved.

#### 4.0.3 Committee amendments

The Committee Dungeon turns the broad starting draft into a more complete bill. As the player correctly answers committee civics questions and completes the room's supporting tasks, the bill receives fictional, broadly popular amendments.

These amendments are **content updates**, not competing policy branches. Every successful Committee run can add the same set of approved details in a clear order. They appear on the player's bill screen and can be referenced by later NPC dialogue, giving the player a visible sense that the bill has become more complete.

| Amendment | Fictional bill detail | Narrative purpose |
| --- | --- | --- |
| Reliable Connections Standard | Participating schools receive support for dependable classroom internet and a basic backup connection plan. | Answers the concern that access must work consistently, not only on paper. |
| Classroom Tools Refresh Fund | Schools may replace outdated learning and accessibility equipment on a regular review cycle. | Makes the technology goal concrete without tying it to a real funding program. |
| Teacher Ready Grant | Participating schools receive time and training support so teachers can use new tools confidently. | Shows that technology is useful only when educators are supported. |
| Local Learning and Privacy Plan | Each school district submits a short plan showing how resources meet local needs and protect student information. | Addresses local flexibility, accountability, and privacy together. |
| Access for Every Learner | Schools identify accessibility needs and provide compatible tools for students who need them. | Makes the bill's equity goal visible and concrete. |

The amendment names and details are fictional. They must not imply that a real federal program, legal requirement, or current public policy exists.

#### 4.0.4 Narrative and gameplay use

- Rapport dialogue uses the Connected Classrooms Act's real concerns rather than generic political statements.
- Committee Dungeon tasks represent the work of approving the fictional bill details above, such as reviewing a maintenance plan, comparing accessibility needs, or locating an impact briefing.
- Correct committee answers unlock the next approved amendment. Incorrect answers do not add a competing amendment or punish the player with an unpopular policy; they only affect the Dungeon's pass/fail result and associated vote award.
- The player does not choose a partisan platform. Their choices are communication approaches and priorities for explaining the same broadly supported bill.
- The bill's final text does not branch into separate laws. Dialogue, Notebook notes, and scene reactions can reflect the amendments unlocked during the campaign.
- The Veto Override remains about building the higher vote threshold behind a bill whose goals remain popular but whose details require stronger justification.

### 7.1 House

House NPC identities, roles, polarizations, trait pairs, and map placements stay fixed. Their vote values are randomized once at the start of each playthrough, then remain fixed for that save. The complete House ledger must always total exactly 435 votes. A bill passes at 218 votes.

The generator must keep each value inside the role range established by the Design Addendum:

| NPC role | Per-NPC vote range | Generation rule |
| --- | --- | --- |
| Major bloc leader | 35-40 | Generate three values within range. |
| Mid-tier bloc leader | 18-24 | Generate each value within range. |
| Near-center loner | 8-10 | Generate each value within range. |
| Mid-distance loner | 5-7 | Generate each value within range. |
| Far-extreme loner | 2-4 | Generate each value within range. |

The generator first assigns values within those ranges, then adjusts eligible NPC values by one vote at a time without leaving their ranges until the total is exactly 435. It must never change the role ranges, create negative values, or assign a character a value outside their listed centrality band. The final ledger is displayed in the vote tracker so the player can make informed coalition choices.

This randomization applies to normal House vote-holding NPCs only. The Backbench Reserve Pool is a separate emergency mechanic that also randomizes its members' values but always totals exactly 40 votes when it becomes available.

#### 7.1.1 Fixed House roster structure

Each playthrough uses the same 22 vote-holding House NPCs:

| Role | Count | Named roster |
| --- | ---: | --- |
| Major bloc leaders | 3 | Rep. Sarah Sterling, Rep. Diane Okafor, Rep. Tom Bracewell |
| Mid-tier bloc leaders | 11 | Rep. Marcus Vance, Rep. Priya Anand, Rep. Hank Delgado, Rep. Wren Castellano, Rep. Gus Whitfield, Rep. Naomi Cho, Rep. Earl Pruitt, Rep. Selena Marsh, Rep. Otis Reinholt, Rep. Ines Falkenrath, Rep. Cyrus Boone |
| Loners | 8 | Rep. Alma Judd, Rep. Dez Okonkwo, Rep. Fritz Callahan, Rep. Robin Yates, Rep. Marv Tillson, Rep. Ada Boykin, Rep. Silas Kroft, Rep. Clem Osgood |

The loner centrality bands are fixed: Alma Judd, Dez Okonkwo, and Fritz Callahan are near-center; Robin Yates and Marv Tillson are mid-distance; Ada Boykin, Silas Kroft, and Clem Osgood are far-extreme. The 3-major, 11-mid-tier, and 8-loner structure can produce an exact 435-vote ledger while keeping every NPC inside the approved vote range.

#### 7.1.2 House trait randomization

All House vote-holding leaders receive a randomly assigned trait pair and active trait when a playthrough begins. The only exception is Rep. Wren Castellano's first tutorial interaction: she is always a Compromiser for that tutorial. After the tutorial encounter is resolved, later Wren appearances use the normal assigned trait for that playthrough if the design adds any.

Rep. Cyrus Boone's firm, demanding committee-chair personality is fixed narrative characterization, not a mechanical trait assignment. His Rapport trait pair follows the same per-playthrough randomization as other House leaders.

At the first point the player reaches 175 or more votes, standard movement pauses and the Extremist Ambush triggers once. The player cannot collect another vote before resolving it.

The Committee Dungeon then opens as one self-contained markup room with seven committee NPCs. The player is locked in until the room reaches a pass or the player has spoken with every committee NPC, then returns directly to the House floor.

Each committee NPC can give one approval or one rejection. Four approvals represent enough committee support to advance the bill, and immediately end the room. Rejections never end the room early. If the player cannot reach four approvals, they must continue through every remaining committee NPC so they can still collect as many bill details as possible before returning to the House floor.

| Result reached | Condition | Outcome |
| --- | --- | --- |
| Markup passed | 4 committee approvals | End the Dungeon immediately and award +35 House votes. |
| Markup incomplete | All 7 committee NPCs have been resolved with fewer than 4 approvals | End the Dungeon and award +15 House votes. The player must secure more remaining support on the House floor. |
| Markup rejected by everyone | All 7 committee NPCs reject the bill | End the Dungeon and award +15 House votes, with no committee amendments added. |

The seven committee NPC interactions are:

| Interaction | Count | Resolution | Bill update |
| --- | ---: | --- | --- |
| Rotunda readiness check | 1 | The NPC asks the player to show any Rotunda power-up currently in their inventory. The item is verified but never consumed. If the player has no power-up, this NPC rejects the markup. | None; this teaches that purchased tools are available and useful. |
| Favor chain | 1 | The NPC needs help from a separate committee helper. The player must answer one additional question from that helper to unlock the NPC's approval. A wrong answer makes this committee NPC reject the markup. | None; this represents the relationship work behind a committee vote. |
| Direct trivia approvals | 5 | Each NPC asks one question from the active shared House pool. A correct answer gains approval; an incorrect answer gains rejection. | Each correct approval unlocks one fictional Connected Classrooms Act amendment. |

The favor helper is a support-only character, not one of the seven committee votes. Its extra question follows the normal pop-and-discard rule and uses a different unasked question from the active House pool.

The power-up check accepts any Rotunda utility item, including a Talking Points Memo, Hearing Aid, Cafeteria Coffee, or Super PAC Injection. It never removes, activates, or otherwise changes the item. The player can still pass the Dungeon without owning one, because four approvals are required from seven possible committee votes.

#### 7.1.3 Committee Dungeon roster

The Committee Dungeon uses a mixed markup committee: five education-focused members, one budget-and-readiness member, and one House-process member. These are distinct committee characters, not repeat encounters with the House Floor's vote-holding bloc leaders.

| ID | NPC | Committee role | Interaction | Bill detail on approval | Source |
| --- | --- | --- | --- | --- | --- |
| C01 | Rep. Priya Anand | Learning Technology and Evidence | Direct trivia | Reliable Connections Standard | Addendum name and policy-wonk personality |
| C02 | Rep. Gus Whitfield | School Facilities and Maintenance | Direct trivia | Classroom Tools Refresh Fund | Addendum name and committee-room personality |
| C03 | Rep. Wren Castellano | Teacher Support | Direct trivia | Teacher Ready Grant | Addendum name and mentor personality |
| C04 | Rep. Naomi Cho | Student Privacy and Public Communication | Direct trivia | Local Learning and Privacy Plan | Addendum name and media-savvy personality |
| C05 | Rep. Hina Khan | Student Access and Accessibility | Direct trivia | Access for Every Learner | NPC Bible fallback name and question association |
| C06 | Rep. Otis Reinholt | Budget Readiness | Rotunda readiness check | None | Addendum name and budget-hawk personality |
| C07 | Rep. Cyrus Boone | House Rules and Amendments | Favor chain | None | Addendum name and committee-chair personality |

The C07 favor chain is supported by **Committee Clerk Hiroshi Tanaka**, an NPC Bible fallback character. The Clerk is not a committee voter. He asks one extra question from the active House pool; a correct answer supplies the procedural help Rep. Boone needs to approve the markup.

#### 7.1.4 Committee writing direction

- Education-specialist dialogue stays grounded in fictional classroom needs, not claims about real federal programs.
- Rep. Reinholt's readiness check teaches the player that Rotunda items exist and can be useful. He does not consume the item or grant a combat advantage for owning it.
- Rep. Boone's favor chain teaches that legislative work sometimes requires assistance from another office. The Clerk's extra question is a normal civic question, not a separate minigame.
- Each direct-trivia NPC reacts to a correct answer by adding their named fictional amendment to the bill screen. A rejection leaves that amendment unavailable for the rest of the run but never prevents the player from leaving the Committee Dungeon.
- Committee members may use one concise Rapport-style line, but they do not run full randomized Rapport phases. Their main learning interaction is the committee question and bill update.

#### 7.1.5 Living bill scroll

The player's bill is presented as a **Living Bill Scroll**: a pixel-art parchment carried by the player and available from the main UI outside live encounters.

| Element | Direction |
| --- | --- |
| Starting view | Show the Connected Classrooms Act title, its three original goals, and five empty amendment spaces marked "Pending committee review." |
| Approved amendment | Add the amendment's name and one plain-language summary to its section. Stamp the section with a clear pixel-art "APPROVED" seal and a brief low-motion ink-fill effect. |
| Rejected amendment | Leave the section visible but crossed out with "Not included in this markup." Do not hide it, so the player can understand which detail was considered and not added. |
| Committee result | Show a top-of-scroll status stamp: "MARKUP PASSED" at four approvals or "MARKUP INCOMPLETE" after all seven members are resolved with fewer than four approvals. |
| Later dialogue | House, Senate, and Oval Office dialogue may refer only to amendments visibly approved on the scroll. |
| Accessibility | The status of every amendment is conveyed with text and icon shape, not color alone. Reduced-motion settings replace the ink-fill effect with an immediate static update. |

The scroll is narrative and instructional content. Approved amendments do not change question correctness, base difficulty, NPC vote values, or the bill's final legal outcome. They make the player's legislative progress visible and give later dialogue concrete details to acknowledge.

The Committee Dungeon then awards:

| Outcome | Vote award |
| --- | --- |
| Pass | +35 |
| Fail | +15 |

The dungeon result must not promise an exact final total; it is added to the player's actual current vote count. Both outcomes leave a viable route to 218 through remaining NPCs.

If every reachable House NPC has been exhausted below 218, the Backbench Reserve Pool becomes available once. Its generated vote values must total exactly 40. If the player remains below 218 after that pool, the House run is lost and the player restarts.

### 7.2 Senate

The Senate is locked until the House has passed the Connected Classrooms Act with at least 218 votes. Before that point, the Rotunda route to the Senate displays a clear "House passage required: 218 votes" message. Once the House passes, a short transition establishes that the bill has moved to the Senate.

The Senate has 10 faction leaders worth 10 votes each. Cloture requires 60 votes. The Senate is an open map: the player may approach any reachable leader in any order, subject to the four Near-Flank Holds.

#### 7.2.1 Senate roster

| ID | Senator | Tier | Polarization | Hold requirement | Character direction |
| --- | --- | --- | ---: | --- | --- |
| S01 | Sen. Regina Alvarez | Moderate core | 45 | None | Dealmaker who enjoys negotiation as a craft. |
| S02 | Sen. Walt Iverson | Moderate core | 48 | None | Calm institutionalist who quotes Senate precedent. |
| S03 | Sen. Bee Nakamura | Moderate core | 55 | None | Energetic new leadership figure eager to prove herself. |
| S04 | Sen. Roland Fitch | Moderate core | 62 | None | Retiring soon and unusually candid. |
| S05 | Sen. Eleanor Vance | Near-flank | 35 | Economic Impact Briefing fetch quest | Archivist-style gatekeeper; this is the template Hold. |
| S06 | Sen. Corinne Vasquez | Near-flank | 32 | Favor Trade | Transactional and direct. |
| S07 | Sen. Del Ashworth | Near-flank | 68 | Notebook progress | Old-school and expects civic preparation. |
| S08 | Sen. Luciana Abbonizio | Near-flank | 72 | Scheduling Favor or briefcase/notes fetch quest | Busy, impatient, and respects preparation. |
| S09 | Sen. Augustus "The Anchor" Kane | Extreme | 15 | Optional scouting before boss encounter | Booming and theatrical; treats every conversation like a floor speech. |
| S10 | Sen. Lucia Marchetti | Extreme | 85 | Optional scouting before boss encounter | Intense and principled; has no patience for perceived half-measures. |

All Senate leaders are worth 10 votes. Their trait pair and active trait randomize once per playthrough under the canonical trait system. Their established character voice and role remain fixed.

#### 7.2.2 Senate Holds

Near-Flank leaders cannot begin their normal Rapport and civics encounter until their Hold requirement is resolved. Holds are visible on the map as a clear "Hold active" label and do not consume an attempt.

| Senator | Hold resolution |
| --- | --- |
| Eleanor Vance | Retrieve the fictional Economic Impact Briefing from the basement archive maze. The briefing is a single required fetch objective and adds a Notebook note about evaluating a bill's practical effects. |
| Corinne Vasquez | Complete one additional live civics question framed as helping her persuade a colleague. The question comes from the active Senate pool and follows normal answer and INF rules. One miss still uses the normal immediate second attempt rule. |
| Del Ashworth | Have 64 Notebook entries when first speaking with him, or collect five new Notebook entries after that first conversation. Store, side-quest, Ghost, and live-encounter entries all count. |
| Luciana Abbonizio | Retrieve her missing briefcase/notes, or spend 100 INF on a Scheduling Favor at the Rotunda Shop. The spending option is a permanent service purchase, not an inventory item. |

Holds never lock a leader permanently and are not failures. Once resolved, the leader displays the normal available `!` status and can be approached using the standard two-attempt rule.

#### 7.2.3 Filibuster Gauntlet

At the first point the Senate vote counter reaches 50 or more, standard movement pauses and the Filibuster Gauntlet begins once. The player cannot collect another Senate vote before it resolves.

- The encounter uses the same pixel-art portrait-box presentation as the Oval Office, but its setting is the Senate rostrum. A designated Senate leader takes the rostrum; the final leader identity may be chosen during narrative writing because the role does not change the mechanics.
- Before the questions begin, the leader gives a short plain-language explanation: "A filibuster is a way Senators can delay or block action. To move this bill forward, you need enough support to end the delay. That vote is called cloture." This explanation must make clear that the game is a simplified classroom model of Senate procedure.
- The Gauntlet asks five back-to-back multiple-choice questions from the active Senate pool.
- Each question displays four options and has no pause between question transitions.
- The player passes by answering at least three of the five questions correctly.
- Talking Points Memos may be used during individual Gauntlet questions. Cafeteria Coffee and Hearing Aids are not eligible because the Gauntlet is multiple-choice and untimed.
- Passing clears the Filibuster. Show a brief playful, game-like "Cloture achieved" transport screen, then transition the player directly to the White House for the Oval Office stage.
- Failing sets `gridlock = true` and begins Senate Overtime. The border flashes red, the rostrum leader explains that the bill is stalled, and the player remains in the Senate with both Overtime paths clearly presented.

**Gridlock explanation:** "The filibuster held. You still have two ways forward: find the Rogue Senator Nodes through the Cloakrooms and Subway, or persuade one of the Senate's most difficult leaders to break the deadlock."

**White House transport presentation:** The transition uses a cheerful pixel-art Capitol-to-White-House travel card rather than a solemn procedural screen. The bill scroll gets a small "SENATE CLEARED" stamp, a tiny courier animation carries it across a simplified Washington skyline, and a short line such as "Next stop: the Oval Office!" appears before the White House scene loads. The sequence is skippable after its first viewing and respects reduced-motion settings with a static illustrated card.

#### 7.2.4 Senate Overtime

| Path | Requirement | Result |
| --- | --- | --- |
| A: Rogue Nodes | Complete 10 Rogue Senator Nodes in the hidden Cloakroom/Subway maps. Each node is an open-ended, no-hint civics challenge worth 1 vote. | Reach 60 votes through ten earned votes and clear Gridlock. |
| B: Extreme Leader | Defeat either extreme leader's boss encounter. The multiple-choice form uses a 12-option grid with multiple correct selections; the player must earn at least 75% accuracy. The open-ended form remains one answer at a time. | Clear Gridlock and award the 10 votes needed to reach 60. |

Path B may be attempted once per extreme leader. A successful Path B ends Overtime immediately. The Super PAC Injection may be consumed in Path A to clear five Rogue Senator Nodes; it has no effect after Gridlock has been cleared. Rogue Senator Nodes exist only on Senate maps.

#### 7.2.5 Senate map presentation

The Senate level combines a polished public chamber with secretive backroom areas. The contrast teaches that formal debate and behind-the-scenes coalition work are both part of the game's simplified legislative world.

| Area | Visual direction | Gameplay purpose |
| --- | --- | --- |
| Senate Chamber | Formal, orderly, and bright: rich blue carpeting, wood desks, clear aisles, a central rostrum, and restrained gold accents. | Main open-map space for the four Moderate and four Near-Flank leaders, the vote tracker, and the 50-vote Filibuster Gauntlet. |
| Leadership Corridor | Polished side hall with framed historical-style civic art, staff desks, and quieter conversation spaces. | Houses some Hold clues, staffers, and the approach to leadership offices. |
| Cloakrooms | Dimmer wood-paneled rooms with coat racks, message boards, closed doors, and low-key staff movement. | Hidden entrance to Senate Overtime Path A and scouting opportunities for Extreme leaders. |
| Subway Passage | Narrow underground route with tiled walls, utility lights, and directional signs. It feels secretive but safe and school-appropriate, never threatening. | Contains the Rogue Senator Nodes during Gridlock and provides a shortcut loop back toward the Chamber. |
| Archive Basement | Organized records area with labeled shelves, rolling ladders, and a small research desk. | Location for Eleanor Vance's Economic Impact Briefing fetch quest. |

The public Chamber remains accessible and readable at all times. Backroom areas open through visible, explained routes rather than hidden pixel-perfect passages. During normal Senate play, the Cloakrooms and Subway provide optional scouting and flavor; after a failed Filibuster, their Rogue Node route becomes clearly marked as an available Overtime path.

### 7.3 Oval Office and Veto Override

The Oval Office character is **President Anthony J. DiSantis**, a fictional in-game President created for Capitol Hill Crawler. He is the narrative character used for both the Ally and Opposition encounter paths; the coin flip determines his alignment toward the player's bill, not which President appears.

President DiSantis is not an answer for USCIS question 38, "What is the name of the President of the United States now?" That question must continue to use the separately maintained, real-world national officeholder table described in Section 3.

#### 7.3.1 White House approach and preparation rooms

After the playful Capitol-to-White-House transport card, the player arrives in a short White House hallway rather than directly inside the Oval Office. The hallway and adjacent preparation rooms are freely explorable before the player enters the Oval Office. The final President encounter does not begin until the player walks through the clearly marked Oval Office door.

Once the bill has passed both chambers, the White House becomes a permanent enterable location on the DC Map. If the player leaves the White House before beginning the Oval Office encounter, they return to the DC Map and may re-enter the White House at any time. Their preparation-room progress, inventory, Notebook, bill amendments, and generated President alignment remain unchanged. The game never rerolls the final encounter when the player leaves and returns.

| Area | Purpose | Gameplay boundary |
| --- | --- | --- |
| White House Hall | Arrival space with the Oval Office door visible at the end of the hall. | Lets the player orient themselves and choose when to begin the final encounter. |
| Presidential Briefing Room | A staff NPC helps the player infer what kind of meeting President DiSantis is likely to hold in this playthrough. | Gives plain-language, non-answer information about whether his current stance feels supportive or skeptical. It does not reveal civics answers or change the Ally/Opposition result. |
| Preparation Room | A separate staff NPC explains the final encounter format and reminds the player to review their Notebook, Living Bill Scroll, and inventory. | The player may freely use the Notebook and inspect their bill here. No live question is active. |
| Rotunda Shop Pop-Up | A small, optional shop counter or dialogue window appears in the Preparation Room. | Sells only the three in-question power-ups: Cafeteria Coffee, Talking Points Memo, and Hearing Aid, using their normal INF costs and inventory limits. |

The preparation-area NPCs are tutorial/support roles, not vote-holding characters. Their final names and portrait designs remain open content work. They should be written as helpful White House staff, not as real public officials.

The Presidential Briefing Room may use a playful, indirect line such as: "The President has been tapping his colorful tie against the briefing folder. That usually means he has questions, but he is listening." The player learns the meeting's likely tone through observation and staff context, not through a visible coin toss or a guaranteed outcome.

The Preparation Room should make the encounter rules explicit before the player enters: Ally President path uses up to 20 multiple-choice questions and passes at 12 correct; Opposition President path uses 10 timed open-ended questions and passes at 6 correct. The player does not know which path will apply until entering the Oval Office.

The Rotunda Shop Pop-Up is the final opportunity to buy the three live-question tools:

| Item | Cost | Live-question use |
| --- | ---: | --- |
| Cafeteria Coffee | 30 INF | Pauses the current timed question for 15 seconds. |
| Talking Points Memo | 40 INF | Removes one incorrect answer from a multiple-choice question. |
| Hearing Aid | 60 INF | Reveals one obscured nonessential phrase in a mumbled open-response question. |

The player can leave the White House, return to the DC Map, and re-enter these rooms as long as they have not entered the Oval Office. Entering the Oval Office begins the portrait-box scene with President DiSantis and Sutton DiSantis, resolves the hidden alignment result, and starts the final encounter. The Notebook closes once the live questions begin; eligible inventory items remain available through the in-question item control.

## 8. DC Map

The DC Map is a compact, optional pixel-art overworld that opens after the player first reaches the Rotunda. It gives players room to explore Washington, collect Notebook study material, scout traits, find night alternates, and prepare for later levels without blocking the core House-Senate-Oval Office route.

### 8.1 Access and landmarks

The Rotunda includes a clearly marked exit to the DC Map once its introductory scene is complete. The player can return to the Capitol, House, and available Senate areas through visible map entrances.

| Landmark | Access | Main purpose |
| --- | --- | --- |
| U.S. Capitol and Rotunda | Available when DC Map opens | Return route to the House, Senate when unlocked, Shop, Save Station, and Living Bill Scroll. |
| White House | Visible from the beginning; enterable after House and Senate passage | Final preparation rooms and the Oval Office encounter. |
| Washington Monument | Available when DC Map opens | Tourist interactions and the nighttime Ghost of Washington sequence. |
| Lincoln Memorial | Available when DC Map opens | Tourist interactions and the late-game Ghost of Lincoln sequence. |
| Library of Congress | Available when DC Map opens | Scholar-style side quests, research flavor, and Notebook entries. |
| Supreme Court | Available when DC Map opens | Civics-themed side quests, staffer conversations, and Notebook entries. |
| National Mall cafe and diner area | Available when DC Map opens | Night alternates, tourists, and relaxed optional conversations. |

The DC Map remains optional for core completion. It must not be required to clear the House, Senate, or standard Oval Office route. Its content is useful preparation and supports the 128-entry Notebook completion path.

### 8.2 Optional DC activities

| Activity | Purpose |
| --- | --- |
| Tourist conversations | Give civic-history flavor, optional side-quest leads, and Notebook Q&A entries. |
| Staffer, intern, message-board, and press interactions | Provide optional scouting intel for Extreme leaders and write plain-language trait clues to the Notebook. |
| Scholar-style side quests | Award one or more Notebook study entries. They do not directly award INF or correct-answer credit. |
| Night alternates | Let four non-major House NPCs be approached in a more relaxed setting with a small Rapport bonus. The normal daytime Capitol encounter always remains available. |
| Ghost encounters | Provide the two Ghost-exclusive Notebook entries through the Washington and Lincoln sequences. |

### 8.3 Night alternates

| NPC | DC location | Benefit |
| --- | --- | --- |
| Rep. Wren Castellano | Quiet cafe near the Mall | Start the Rapport conversation with a small +10 bonus. |
| Rep. Naomi Cho | Evening press stand-up near the monuments | Start the Rapport conversation with a small +10 bonus. |
| Rep. Dez Okonkwo | Wandering the DC Map and talking with tourists | Start the Rapport conversation with a small +10 bonus. |
| Rep. Fritz Callahan | Late-night diner near the monuments | Start the Rapport conversation with a small +10 bonus. |

The night bonus applies only if the player begins that NPC's encounter in the listed DC location. It does not change polarization, question format, vote value, or the two-attempt rule.

### 8.4 Day/night cycle and waiting

| Time period | In-game time |
| --- | --- |
| Day | 6:00 AM to 7:59 PM |
| Night | 8:00 PM to 5:59 AM |

Each vote earned advances the in-game clock by 10 minutes. Each map step advances it by 5 minutes. A full day/night cycle is 1,440 minutes.

The player may use clearly marked resting spots on the DC Map, such as a park bench, cafe table, or diner booth, to wait until the next Day or Night period. Waiting shows the new time before confirmation and does not consume INF, alter question pools, change NPC vote values, or reset encounters.

Time has only three gameplay effects:

1. It determines whether the four DC night alternates are available.
2. It gates the Ghost of Washington's nighttime appearance.
3. It contributes to the final Day/Night Speed Bonus.

Normal map difficulty, question pools, leader availability at their daytime locations, and core progression do not change with the time of day.

### 8.5 Ghosts of Washington and Lincoln

The Ghost of George Washington and Ghost of Abraham Lincoln are the two Ghost-exclusive Notebook entries. They follow the Design Addendum's two-stage secret structure and are the only way to complete the final two entries of the 128-entry Notebook.

| Ghost | Location | Appearance requirement | Encounter and reward |
| --- | --- | --- | --- |
| George Washington | Washington Monument | Nighttime and at least 100 Notebook entries, plus prior knowledge of the 22nd Amendment/two-term limit from a non-Ghost source | Washington presents the Addendum's riddle about declining a third term. The player answers "22nd Amendment" or "two-term limit" to earn the Washington Ghost-exclusive Notebook entry. |
| Abraham Lincoln | Lincoln Memorial | 127 of 128 Notebook entries and the player is at the Oval Office threshold, ready to enter | The White House preparation NPC offers one final stop. Lincoln asks the Addendum's narrative-only question, "So. Why'd you come back?" Every respectful response leads to the Emancipation Proclamation entry and completes the Notebook. |

Washington does not award his Ghost-exclusive Notebook entry until the player demonstrates prior knowledge of the fact through another valid source. This protects the Addendum's intended "verify, do not guess" moment without requiring the player to already own the exclusive entry.

Lincoln's three Addendum dialogue choices remain narrative-only and have no right or wrong answer:

1. "I couldn't leave the job half-finished."
2. "It mattered to me to get it right, not just get it done."
3. "Honestly? I just wanted to see if I could."

The Ghost sequences never change votes, INF, question difficulty, or the main campaign route. They reward exploration and Notebook completion. The Washington sequence is gated by night; the Lincoln sequence is available only at the endgame Oval Office threshold, not through ordinary DC exploration.

## 9. Endings, Celebration, and Score Lock

The bill becomes law when the player succeeds in either the Oval Office encounter or the Veto Override. The 128/128 Notebook completion route also results in the bill being signed, but skips the President's live civics encounter as established in the Design Addendum.

### 9.1 Bill-becomes-law celebration

Every successful route first plays a short, cheerful celebration screen before showing score choices. The screen uses the pixel-art portrait-box style and a playful civic tone.

| Element | Direction |
| --- | --- |
| Main image | President DiSantis signs the Connected Classrooms Act with Sutton nearby, celebrating the moment. |
| Bill scroll | The Living Bill Scroll receives a large "SIGNED INTO LAW" stamp. |
| Player recognition | Show the player's chosen name and a message such as "Representative {name}, the Connected Classrooms Act is now law!" |
| Optional bill details | Display the fictional committee amendments the player secured during markup, if any. |
| Presentation | Use cheerful, school-appropriate pixel-art confetti, a signing-pen animation, and a brief musical flourish. Respect reduced-motion settings with a static celebratory illustration. |
| Narrative scope | Clearly state that this is the game's fictional law and fictional presidential administration. Do not imply a real-world law has passed. |

The celebration wording differs slightly by route while reaching the same result:

- Oval Office success: President DiSantis signs after the player demonstrates the required civics knowledge.
- Veto Override success: Congress has secured the required override votes, and the bill becomes law despite the veto.
- Notebook completion route: President DiSantis recognizes the completed study record and signs without the live interview.

### 9.2 Provisional score and player choice

After the celebration, calculate and display a **provisional score**. The player then chooses one of two paths:

| Player choice | Result |
| --- | --- |
| Lock in score | Permanently record the displayed score for this completed run, show the final results screen and credits, and offer New Game from the title flow. |
| Continue exploring | Return the player to the DC Map in post-victory exploration mode. The score remains provisional and is not recorded yet. |

Post-victory exploration lets players finish optional Notebook entries, buy remaining Notebook entries, visit Ghosts when eligible, and use the White House preparation areas. The bill is already law: House, Senate, Committee, and Oval Office vote encounters do not replay for additional votes or INF.

Returning to the Oval Office after choosing Continue Exploring opens a clear confirmation prompt: **"Lock in your final score now?"** Confirming locks the score using the player's current eligible progress. Cancelling returns the player to the White House hallway and leaves the score provisional. This is the only way to finalize a provisional score after the initial celebration.

### 9.3 Final score

The final score target is 10,000 points.

| Category | Maximum | Basis |
| --- | ---: | --- |
| Base Clear | 2,000 | Bill becomes law through any successful route. |
| Correct Live Answers | Variable | 25 points for each correctly answered live civics question. This distinguishes accuracy across otherwise successful runs. |
| Notebook Entries | Variable | 10 points for each Q&A study entry collected from exploration, Shop purchases, quests, and other Notebook rewards. |
| Oval Office Accuracy | 800 | Up to 100 points for each of up to eight unanswered Ally President questions when the player reaches the success threshold early. The category is 0 on the Opposition and Notebook-completion routes. |
| Full Notebook Completion | 2,000 | All 128 Notebook entries are unlocked before score lock. |
| Day/Night Speed Bonus | 2,000 | Based on the campaign completion time when the bill becomes law. Post-victory exploration cannot improve or reduce this locked time value. |
| INF Efficiency Bonus | 3,200 | Three points per INF remaining when the score locks, capped at 3,200. |
| Perfect total | At least 10,000 | The original 10,000-point benchmark remains the core achievement target; direct answer and Notebook-entry points provide additional competition differentiation. |

The final results screen displays every category, the total, completed bill amendments, Notebook count, and whether the run was locked immediately or after post-victory exploration. Once locked, a score cannot be changed by returning to the game.

### 9.4 Failure states

| Failure | Result |
| --- | --- |
| House | The player exhausts reachable House support and the Backbench Reserve Pool but remains below 218 votes. |
| Veto Override | The player cannot reach the required override thresholds after the final available reopening attempts. |

Both failure states show a supportive restart screen explaining that the bill did not advance in this run. The player may begin a new playthrough after confirmation; no failure screen implies that civic learning itself was failed.

### 7.3.2 President Anthony J. DiSantis character brief

| Element | Canonical direction |
| --- | --- |
| Narrative role | Final civic-interview opponent and the person who signs or vetoes the player's bill. |
| Personality | Quirky, chipper, confident, and quick with a clean wit. He enjoys an energetic policy conversation and treats a strong answer as a reason to celebrate, not an opportunity to belittle the player. |
| Core value | Preparedness. He respects players who can explain civic facts clearly, regardless of whether he initially supports their bill. |
| Ally-path mood | Warm, playful, and encouraging. He frames the 20-question multiple-choice sequence as a fast-paced "Oval Office pop quiz." |
| Opposition-path mood | Still personable, but brisk and exacting. He frames the timed open-response sequence as proof that the player can defend a bill under pressure. He is challenging without becoming cruel or partisan. |
| Age | 42. He has energetic, hands-on policy-nerd confidence rather than a distant or grandfatherly presence. |
| Visual silhouette | Bald white man with black-framed glasses and a neatly kept beard. Use a tailored navy suit, white shirt, a brightly colored patterned tie, colorful socks visible when he sits, and a Freemason lapel pin. The pin is a character detail only, not a gameplay requirement or a statement about real public officials. |
| Animation cues | Glasses adjustment when considering an answer; quick grin after a clever response; taps a pencil or points to the bill while the timer runs. A seated pose can briefly reveal his colorful socks. Avoid exaggerated political caricature. |
| Dialogue style | Short, conversational sentences; occasional civic or office-themed wordplay; no real-party labels, real-candidate references, or insults. |
| Accessibility | Any spoken-style joke must remain understandable in text alone. Do not make a correct answer depend on recognizing a visual cue or joke. |

**Dialogue samples**

- Arrival: "Representative! I have read your bill, circled three parts, and somehow found coffee on page seven. Let's see whether the civics are as sturdy as the stapling."
- Ally-path start: "Good news: I like where this is headed. Better news: you only need twelve strong answers. Let's make the briefing book proud."
- Ally-path success: "Twelve correct. That is the kind of preparation that makes a signing pen feel useful. Consider this bill signed."
- Opposition-path start: "I am not sold on this bill yet. But a Representative who can think clearly under pressure deserves a fair hearing. Six answers. Thirty seconds each. Ready?"
- Opposition-path success: "You made the case. The veto pen can stay capped today. Let's get this signed."
- Veto transition: "Not enough to earn my signature today. That is not the same as the end of the argument. If you can build the votes, bring this bill back with an override."

### 7.3.3 Sutton DiSantis character brief

| Element | Canonical direction |
| --- | --- |
| Narrative role | President DiSantis's eight-year-old daughter and a small, optional Oval Office scene character. She provides warmth, a child-friendly viewpoint, and brief encouragement before or after the final encounter. |
| Appearance | Brunette, distinctly girly style, and dressed in a polished but age-appropriate outfit that is readable in pixel art, such as a colorful dress, hair bow, and small cardigan. |
| Personality | Bright, affectionate, curious, and openly a daddy's girl. She is proud of her father while still comfortable teasing him gently. |
| Relationship dynamic | President DiSantis becomes a little more playful around Sutton. He listens to her, but he remains the sole decision-maker on the bill and final encounter. |
| Gameplay boundary | Sutton never supplies a trivia answer, hint, vote, currency, or outcome-changing advantage. Her presence is narrative-only, so the assessment remains fair for every player. |
| Optional interaction | Before the encounter, the player may speak with her once for a short dialogue exchange. After success, she celebrates; after a veto, she encourages the player to keep working toward the override. |

**Sutton dialogue samples**

- Arrival: "Dad says the Oval Office is serious, but he also wears rainbow socks to serious meetings. So it cannot be *that* serious."
- Before the encounter: "He asks lots of questions when he is excited. If he starts smiling at his notes, that means you are doing pretty well."
- After signing: "I knew you could do it! Dad only does the big pen thing when he is really impressed."
- After veto: "He said you can still try again. Dad likes people who do not quit just because something is hard."

### 7.3.4 Oval Office portrait presentation

The Oval Office uses **pixel-art portrait boxes** for President DiSantis and Sutton DiSantis. This is the canonical dialogue presentation for the final level.

| Element | Direction |
| --- | --- |
| Portrait format | Pixel-art bust portrait in the dialogue box, with the active speaker's name displayed above the text. |
| President portrait | Use a 48x48 base portrait assembled with the Modern UI Portrait Generator, then scale with nearest-neighbor rendering. His bald head, black-framed glasses, beard, colorful tie, and Freemason lapel pin must remain legible at the final display size. |
| Sutton portrait | Use a separate 48x48 base portrait with brunette hair, an age-appropriate girly outfit, and a bright accessory such as a bow or headband. |
| Dialogue layout | Portrait appears on the left for President DiSantis and on the right for Sutton to make speaker changes immediately clear. The player portrait, when present, uses the opposite side from the active NPC. |
| Expression set | Each character needs neutral, pleased, thoughtful, and concerned expressions. President DiSantis also needs a witty grin; Sutton needs an excited celebration expression. |
| Animation | Use brief, low-motion effects only: one-pixel idle bob, blink, and a short expression transition. Respect reduced-motion preferences by showing static portraits. |
| Accessibility | Speaker names, full dialogue text, and emotional meaning must be understandable without color or animation. Portrait expressions support the dialogue but never convey required gameplay information. |

In-world Oval Office sprites may be used as small decorative scene elements, but portrait boxes carry the dialogue and characterization. Do not require custom full-body character art before the final encounter can be implemented.

The Ally President path asks up to 20 multiple-choice questions and succeeds at 12 correct. Each unasked question after success is worth 100 points.

The Opposition President path asks 10 open-ended questions with a 30-second timer per question and succeeds at 6 correct, using edit distance 2.

If the President encounter fails, begin the Veto Override. The player must reach approximately 290 House votes and 67 Senate votes using the existing maps and reopened NPCs. Previously locked NPCs receive one Override-only attempt. Failure of the Override is game over.

## 5. Canonical Data Requirements

Before coding new encounters, create one roster entry for each vote-holding NPC with these required fields:

`id`, `name`, `level`, `role`, `polarization`, `alignment`, `votes`, `traitPair`, `mapPlacement`, `isLeader`, `isLoner`, `holdRequirement`, and `dialogueKey`.

The Design Addendum's named roster is the current naming authority for characters it explicitly names. For all remaining NPCs, reuse the NPC Character Bible V7 names and details where they do not conflict with the Addendum. Existing prototype names remain placeholders until they are reconciled with this combined roster.

## 6. Superseded Rules

Do not implement these older rules:

- The 100-question curriculum.
- Scholar's Path / 65-20 gameplay exemption.
- Flat 50 or 100 INF per correct answer.
- Flat 300-INF shop pricing.
- The Ally President's old 10-question, 6-correct format.
- The old 150-points-per-unanswered scoring formula.
- House-side Rogue Nodes.
- The legacy NPC Bible as the sole NPC naming or question-routing source. It is the fallback source for details the Addendum does not specify.
