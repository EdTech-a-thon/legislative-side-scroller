# Capitol Hill Crawler: Complete NotebookLM Source Guide

## Purpose Of This Document

This is an exhaustive source document for an AI video-generation workflow, specifically NotebookLM. It is not a short player handout and it is not a video script. Use it as background knowledge when generating a video that explains, demonstrates, or summarizes the game. Screenshots supplied alongside this document should be treated as visual evidence of the interface, maps, characters, and pixel-art style described here.

The game is called **Capitol Hill Crawler**. Its subtitle is **A Civics Quest**. It is a single-player, browser-based, pixel-art civics study game. It uses the 2025 USCIS 128-question civics bank as its academic question source. It teaches a simplified, classroom-friendly model of how a bill moves through the House of Representatives, the Senate, and the White House.

When creating a video, describe the game as a fictional educational simulation. Do not imply that its fictional bill, its fictional lawmakers, or its fictional President are real people, laws, or current events.

## Core Premise

The player is a newly elected freshman U.S. Representative. Their constituents elected them to make a meaningful early impact. The player carries a fictional education bill called the **Connected Classrooms Act**.

The bill's starting purpose is to help public schools:

- Expand reliable high-speed internet access.
- Replace outdated learning technology and accessibility equipment.
- Support teacher training and continuing maintenance for new classroom tools.

The central idea is that students should have reliable, modern classroom resources regardless of ZIP code. Most characters agree with that broad goal. The challenge is building a coalition by listening to concerns, explaining the plan clearly, showing civic knowledge, and earning enough votes.

The player must move the bill through these stages:

1. Build support in the House of Representatives.
2. Navigate a House committee markup.
3. Pass the House with at least 218 votes.
4. Build support in the Senate.
5. Clear a filibuster and reach 60 Senate votes for cloture.
6. Prepare for a final White House meeting.
7. Demonstrate civics knowledge in the Oval Office.
8. Have the bill signed into law, or, after a veto, earn the higher House and Senate totals needed for a veto override.

The game also rewards studying, optional D.C. exploration, Notebook collection, and effective use of resources.

## Visual Identity And Interface

The game uses a warm, detailed pixel-art visual style. It combines top-down explorable maps with portrait-box dialogue scenes, civic paperwork, meters, status icons, and modal learning panels.

Key visual themes:

- The Capitol, House, Senate, Rotunda, National Mall, White House, Oval Office, committee room, archive basement, cloakrooms, and subway passage are all represented as explorable or illustrated spaces.
- The House and Senate maps are top-down rooms with a player sprite walking among legislators and civic props.
- Major dialogue uses large UI panels, text, and portrait-style character images or initials.
- Vote counts appear in prominent HUD meters.
- Influence is displayed as `INF`.
- The player's bill is represented as a parchment-like **Living Bill Scroll**.
- Civics questions are framed as conversations with lawmakers, formal committee reviews, Senate procedure challenges, or final presidential assessment questions.

The main HUD branding reads `CHC`, `CAPITOL HILL CRAWLER`, and a bill name. House HUD wording may display `CONNECTED SCHOOLS ACT` in some places while the broader game materials use `CONNECTED CLASSROOMS ACT`. Treat this as one fictional bill. In any generated explanation, use **Connected Classrooms Act** consistently.

## Start Of A Campaign

On the title screen, players can start a campaign, continue a local campaign, begin a new campaign, view the last completion record, or view asset credits.

The title screen presents the game as a civics quest and introduces the core promise: build a coalition, master the Constitution, and get the bill to 218 votes.

Before beginning, the player creates a Representative profile:

- First and last name.
- Male or female presentation.
- Skin tone.
- Party alignment: D or R. This changes how some far-polarization encounters are presented, but does not create a partisan story path.
- State or territory.
- Optional city.

The state or territory supports jurisdiction-based civics questions, such as state-capital or current-officeholder questions. If a current-official answer cannot be safely validated because data is stale, unavailable, or ambiguous, the game replaces that question without penalizing the player.

The player starts with no votes and no Influence. The campaign is stored in browser local storage. Important milestones save automatically, and the Rotunda is the main hub for saving and preparation.

## Controls And Map Interaction

On maps, players move using arrow keys or WASD. To interact with nearby lawmakers, landmarks, doors, props, or stations, players press `E` or `Enter`.

Common map status icons above lawmakers:

- White exclamation mark: available to talk.
- Green check mark: support has been secured.
- Red X: no normal attempts remain.
- Gold H: the Senator has an active Hold that must be resolved before a normal meeting.

The player can inspect locations, papers, ledgers, message boards, rooms, staffers, tourists, and landmarks. These optional interactions frequently unlock Notebook entries or give useful strategic information.

## Tutorial And Opening Story

The player enters the Capitol Rotunda and then the House. Mr. Ben Venello, a knowledgeable and encouraging House mentor, introduces the player to the game.

Mr. Venello explains that the Connected Classrooms Act begins with three broad goals: reliable school internet, modern and accessible tools, and support for teachers. He emphasizes that a good idea must be developed into a workable law through preparation, listening, and coalition building.

He teaches the following ideas:

- Move around the House floor.
- Talk to Representatives.
- Earn votes rather than receiving them automatically.
- Read and answer civics questions.
- Watch the vote counter.
- Use the Living Bill Scroll.
- Study with the Notebook.
- Visit the Rotunda for the Shop and saving.

Mr. Venello directs the player toward Rep. Wren Castellano as a suggested first conversation. Wren is a welcoming freshman mentor. She is the clearest early example of the game's conversation, Rapport, and civics-question flow.

## Core Conversation And Question Loop

Most vote-holding lawmakers use the same overall encounter loop:

1. The player approaches a lawmaker on a map.
2. The lawmaker explains a practical concern about the bill in their own voice.
3. Most leaders offer a short `MAKE YOUR CASE` Rapport choice.
4. The player answers a USCIS-based civics question.
5. Correct answers secure the lawmaker's vote block and grant Influence.
6. Incorrect answers reveal at least one accepted answer and often a study note.
7. A player who misses a leader's first question can receive one additional fresh question. A second miss normally locks that leader for the regular campaign.

Questions are not meant to repeat during normal campaign encounters. The feedback after a miss is therefore important study material.

Question formats vary by the lawmaker's difficulty and political distance from the player's party alignment:

- Three-choice multiple choice for near-center encounters.
- Four-choice multiple choice for moderate encounters.
- Typed short-answer responses.
- Twelve-choice matrix or confusion-grid questions for some far-alignment encounters.
- Mumbled typed-response questions for far cross-aisle encounters. In mumbled questions, some nonessential words are obscured, but the core answer remains possible.

Standard timed typed encounters use a countdown. Friendly Rapport can increase time; hostile Rapport can reduce it. The player cannot open the Notebook during a live question.

Correct-answer feedback is framed positively, for example `SUPPORT SECURED`. Incorrect feedback is framed as `NOT QUITE` and shows an accepted answer plus a study note when one is available.

## Rapport And Coalition Building

Rapport represents whether a lawmaker feels the player made their case in a way that matches that leader's preferred communication approach. Rapport affects assistance, not the fundamental question format.

The player may make one of three case-making choices:

- A response matching the leader's active communication trait. This increases Rapport.
- A response using the opposite trait. This decreases Rapport.
- A respectful neutral response. This does not change Rapport.

The six communication traits are grouped into three pairs:

- Pragmatic: focus on feasible steps, implementation, resources, maintenance, and concrete results.
- Idealistic: focus on fairness, values, long-term purpose, and why every student matters.
- Compromiser: focus on common ground, listening, workable tradeoffs, and coalition building.
- Firm: focus on clear commitments, standards, boundaries, and promises that will not be traded away.
- Detail-oriented: focus on evidence, costs, timelines, specifics, and how the plan works.
- Big-picture: focus on future outcomes, community impact, broad goals, and why the work matters.

Rapport tiers:

- Hostile, roughly 0 to 33: less help, stricter typed-answer matching, and less time.
- Neutral, roughly 34 to 66: standard help and standard answer matching.
- Friendly, roughly 67 to 100: clearer hints, more forgiving typed-answer matching, more time, or clearer mumbled text.

Leaders normally give subtle clues about their preferred approach in their dialogue. For example, a detail-oriented leader may ask about evidence and timelines, while a big-picture leader may focus on the future for students. Extreme Senate leaders do not give a reliable direct clue; they can be scouted through optional exploration.

The game treats all of these approaches as valid civic communication styles. It does not ask players to choose a partisan ideology or a morally correct political identity. The player is learning to communicate the same bill effectively to people with different concerns.

## Influence And Rotunda Shop

Correct civics answers award **Influence**, abbreviated `INF`. INF is an in-game resource used for study and optional assistance.

Typical INF rewards:

- Multiple-choice encounter: 15 INF.
- Typed short answer: 25 INF.
- Twelve-choice matrix or mumbled response: 40 INF.

The Rotunda Shop is called the `PREP COUNTER`. It contains the following items:

| Item | Cost | Function |
| --- | ---: | --- |
| Notebook Study Entry | 25 INF | Unlocks one study question-and-answer entry in the Notebook. |
| Cafeteria Coffee | 30 INF | Pauses a timed live question for 15 seconds. |
| Talking Points Memo | 40 INF | Removes one incorrect answer from an eligible multiple-choice question. |
| Hearing Aid | 60 INF | Clarifies one obscured phrase in an eligible mumbled question. |
| Super PAC Injection | 250 INF | Must be purchased before the Filibuster; in Senate Overtime it clears five Rogue Senator Nodes. |

The three standard power-ups have a carrying limit of three each. The Super PAC Injection has a limit of one. No Shop item is required to complete the basic campaign. The Shop is meant to reward preparation and thoughtful resource management.

## Notebook And Vocabulary Guide

The Notebook is a major study system. It has two tabs:

- `Civics Entries`: unlocked question-and-answer study material.
- `Vocabulary Guide`: government terms and civics vocabulary.

Notebook entries can be gained through:

- Live civics encounters.
- Rotunda Shop purchases.
- D.C. landmarks.
- Tourists and locals.
- Papers, ledgers, exhibits, message boards, and side rooms.
- Senate Hold quests.
- Scouting information.
- Committee reference files.
- The Duncan Johnson special reward.
- Ghost encounters.

Unlocking a Notebook entry is study progress. It does not automatically grant INF or count as a correct live answer.

There are up to 128 Notebook entries, corresponding to the game's full civics study collection. Collecting all 128 is an optional completionist objective with a large score bonus and special late-game content.

The Vocabulary Guide also contains a hidden clue for dedicated explorers: after enough vocabulary exploration, it hints that Washington may appear at the Monument at night and Lincoln may wait near the end of a nearly complete Notebook journey.

## The Living Bill Scroll

The Connected Classrooms Act appears as a parchment-like `Living Bill Scroll`. The scroll begins with the three initial goals and has five committee-amendment spaces marked as pending.

During the House committee markup, the player can secure these fictional bill details:

- Reliable Connections Standard: dependable classroom internet and a basic backup connection plan.
- Classroom Tools Refresh Fund: regular replacement and review for outdated learning and accessibility equipment.
- Teacher Ready Grant: time and training support for teachers using new tools.
- Local Learning and Privacy Plan: each district explains how it will meet local needs and protect student information.
- Access for Every Learner: schools identify accessibility needs and provide compatible tools.

Successful amendments are visibly stamped `APPROVED` on the scroll. Rejected or unavailable amendments remain visible as not included in the markup. These bill details make the legislative journey concrete and can be referenced by later dialogue, but they do not create separate branching laws or change the final victory condition.

## House Of Representatives Stage

The House is the first major campaign area. It is a large top-down chamber with lawmakers, cloakrooms, caucus rooms, a committee route, study finds, a Rotunda return, and a route to D.C.

The House objective is to earn at least **218 House votes**. The House HUD displays a vote meter and the current Influence total.

The regular House roster contains 22 vote-holding Representatives. Their specific vote-block sizes vary by campaign, but the leaders represent blocs or groups of House votes rather than individual one-vote characters.

Major House figures include:

- Rep. Wren Castellano: freshman mentor; welcoming and coalition-minded.
- Rep. Sarah Sterling: major bipartisan solver.
- Rep. Diane Okafor: major caucus leader with a budget and implementation focus.
- Rep. Tom Bracewell: major caucus leader and former history teacher.
- Rep. Marcus Vance: strong standards-focused leader.
- Rep. Priya Anand: policy wonk who values evidence, timelines, maintenance, and teacher readiness.
- Rep. Hank Delgado: small-business voice focused on whether a plan works in everyday life.
- Rep. Gus Whitfield: committee corridor veteran focused on preparation and maintenance.
- Rep. Naomi Cho: public communicator who wants families to understand the bill.
- Rep. Otis Reinholt: budget hawk focused on readiness and public resources.
- Rep. Selena Marsh: coalition builder.
- Rep. Ines Falkenrath: first-term idealist focused on opportunity.
- Rep. Earl Pruitt: rural-district voice concerned that support reaches distant communities.
- Rep. Cyrus Boone: committee-focused House rules and procedure leader.
- Reps. Alma Judd, Dez Okonkwo, Fritz Callahan, Robin Yates, Marv Tillson, Ada Boykin, Silas Kroft, and Clem Osgood: individual loner-style encounters with their own perspectives and difficulty.

House leaders can be approached in an open order. Wren is suggested first but is not the only possible first interaction.

After four successful House encounters, the available House question pool expands from early foundational questions to a broader set. This supports a gradual learning curve.

Optional House exploration includes the West Cloakroom, East Cloakroom, West Caucus, East Caucus, papers, study cards, briefing folders, and message boards. These can provide Notebook study material.

## House Committee Markup

At the first point the player reaches **175 House votes**, normal House campaigning is interrupted by a Committee Ambush and the bill enters committee markup.

The Committee Dungeon is a self-contained illustrated committee room. It is a simplified classroom model of committee work: members study the bill, ask questions, and decide whether its details are ready to move forward.

The committee room contains seven member interactions. The player needs **four approvals** to pass markup.

Committee members and tasks:

- Rep. Priya Anand: civics question; approval adds the Reliable Connections Standard.
- Rep. Gus Whitfield: civics question; approval adds the Classroom Tools Refresh Fund.
- Rep. Wren Castellano: civics question; approval adds the Teacher Ready Grant.
- Rep. Naomi Cho: civics question; approval adds the Local Learning and Privacy Plan.
- Rep. Hina Khan: civics question; approval adds Access for Every Learner.
- Rep. Otis Reinholt: readiness check. The player must have any Rotunda power-up in inventory. The item is checked but never consumed.
- Rep. Cyrus Boone: favor chain. The player answers an extra civics question for Committee Clerk Hiroshi Tanaka.

The room also contains a searchable `REFERENCE FILES` cabinet that can award a Notebook entry.

Committee outcomes:

- Four approvals: markup passes, ends immediately, and awards +35 House votes.
- Fewer than four approvals after all seven members: markup is incomplete and awards +15 House votes.

The player can still continue toward House passage after an incomplete markup. The markup is not a permanent dead end. A passed markup strengthens the visible bill scroll by adding more fictional policy details.

## House Passage

At **218 House votes**, the House roll-call sequence announces that the bill passes. The Senate becomes available from the Rotunda.

The player can continue exploring and campaigning in the House after passage. This is useful because a later veto override requires a higher House total of **290 votes**.

## Rotunda As Central Hub

The Rotunda connects major game systems and routes. It includes access to:

- House Floor.
- Senate Doors, locked until House passage.
- Rotunda Shop.
- Living Bill Scroll.
- Notebook.
- Vocabulary Guide.
- Student Profile.
- D.C. exploration.
- Civics exhibits and small Notebook finds.

The Rotunda is the main place to pause between challenges, review the bill, spend INF, and save campaign progress.

## Senate Stage

The Senate unlocks after the House passes the bill. The Senate is another open top-down map with a public chamber, Leadership Corridor, Cloakrooms, archive access, staff contacts, papers, and routes into Senate Overtime.

Every main Senate leader is worth 10 Senate votes. The normal Senate objective is **60 votes**, representing the game’s simplified cloture threshold.

Senate leaders include:

- Sen. Regina Alvarez: moderate dealmaker who views negotiation as a craft.
- Sen. Walt Iverson: moderate institutionalist who values Senate rules and precedent.
- Sen. Bee Nakamura: energetic newer leader.
- Sen. Roland Fitch: candid veteran nearing retirement.
- Sen. Eleanor Vance: near-flank leader with an Economic Impact Briefing Hold.
- Sen. Corinne Vasquez: near-flank leader with a Favor Trade Hold.
- Sen. Del Ashworth: near-flank leader with a Notebook study Hold.
- Sen. Luciana Abbonizio: near-flank leader with missing-notes or Scheduling Favor Hold.
- Sen. Augustus `The Anchor` Kane: extreme leader, available as a Gridlock-solving option after the Filibuster fails.
- Sen. Lucia Marchetti: extreme leader, also available as a Gridlock-solving option after the Filibuster fails.

The Senate does not use real party labels as a narrative conflict. The player is still advocating for the same broadly supported fictional education bill and answering civics questions.

## Senate Holds

Four Senators have visible Holds. A Hold is a preparation requirement, not a failure and not a permanent lock.

Senate Hold details:

| Senator | Hold | Resolution |
| --- | --- | --- |
| Eleanor Vance | Economic Impact Briefing | Retrieve the fictional briefing from the Archive Basement. This also unlocks a Notebook entry. |
| Corinne Vasquez | Favor Trade | Answer an additional live civics question framed as helping her persuade a colleague. |
| Del Ashworth | Notebook Study Check | Have 64 Notebook entries when first speaking with him, or collect five additional Notebook entries afterward. |
| Luciana Abbonizio | Missing Notes / Scheduling Favor | Recover her missing briefcase and notes from the Leadership Office, or spend 100 INF for a Scheduling Favor. |

Once a Hold is resolved, that Senator becomes available for the normal conversation, Rapport, question, and vote process.

The Archive Basement is an organized research area with shelves, rolling ladders, labels, and a records desk. The Leadership Office is a Senate side area tied to Luciana Abbonizio's missing notes.

## Filibuster And Cloture

When the player reaches **50 Senate votes**, the Filibuster Gauntlet begins. It appears at the Senate rostrum and explains that, in this simplified classroom model, a filibuster delays or blocks action until enough Senators agree to end debate. That vote is called **cloture**.

The Filibuster Gauntlet asks five back-to-back four-choice civics questions.

- Answer at least three out of five correctly to pass.
- Passing resolves the filibuster and allows the player to continue toward 60 Senate votes.
- Talking Points Memos may be useful in these multiple-choice questions.
- The gauntlet displays progress such as `QUESTION 1 OF 5` and a count of correct answers.

Once the player has **60 Senate votes** and Gridlock is not active, the game shows a Cloture transition. The bill is cleared by the Senate and can proceed to the White House.

## Senate Gridlock And Overtime

If the player fails the Filibuster Gauntlet, the bill enters **Gridlock**. The Senate does not become unwinnable. Instead, the game opens Senate Overtime with two routes forward.

Route A: Rogue Senator Nodes

- Enter the Cloakrooms and Subway Passage.
- Find and answer ten Rogue Senator Node civics challenges.
- Each successfully cleared node awards one Senate vote.
- Clear all ten nodes to break Gridlock and reach the 60-vote path.
- These are open-response civics challenges.
- If the player bought the Super PAC Injection before the Filibuster, it can clear five Rogue Senator Nodes at once.

Route B: Extreme Senate Leader

- Scout and approach either Augustus Kane or Lucia Marchetti during Gridlock.
- These are difficult boss-like encounters.
- A successful extreme-leader route breaks Gridlock and awards the 10 Senate votes needed to reach 60.
- The extreme leaders become active Overtime options only after the Filibuster has created Gridlock.

The Cloakrooms are dimmer, wood-paneled back rooms with coat racks, message boards, staffers, and scouting opportunities. The Subway Passage is a narrow, safe underground route with tiled walls, signs, and Rogue Senator Nodes. These spaces represent behind-the-scenes coalition work in the game’s simplified legislative world.

## Scouting Extreme Leaders

Extreme Senate leaders do not provide clear direct Rapport tells in their initial context. The player can optionally scout them before attempting a difficult Overtime route.

Scouting sources include Cloakroom staff, the subway route, and Press Row. Successful scouting writes a plain-language clue into the Notebook about what communication approach the Senator responds to best.

Examples:

- Sen. Kane responds to a clear, firm commitment rather than vague promises.
- Sen. Marchetti responds to the larger purpose and the importance of not accepting half-measures.

Scouting is helpful but optional. A player can still succeed through observation and civics knowledge.

## Washington, D.C. Exploration

After reaching the Rotunda, the player can enter an optional compact pixel-art D.C. overworld centered on the National Mall. D.C. exploration is not required for the basic House-Senate-White House route, but it supports studying, Notebook completion, special encounters, and preparation.

D.C. locations include:

- U.S. Capitol and Rotunda.
- White House, visible early but locked until the legislative route is complete.
- Washington Monument.
- Reflecting Pool.
- Lincoln Memorial.
- Smithsonian Museums.
- Library of Congress.
- Supreme Court.
- National Mall Cafe and Diner.
- Press Row.
- Duncan Johnson.
- Tourists and locals.

Each landmark contains a short factual civic description. For example:

- The Capitol is where the House and Senate meet in separate chambers.
- The White House is the home and workplace of the President.
- The Supreme Court is the highest court in the federal judiciary and does not write bills or cast congressional votes.
- The Library of Congress represents research, records, and evidence.
- Press Row represents the role of journalism in helping people follow public decisions.

Tourists and locals provide civic-history flavor and may grant packs of Notebook entries. Duncan Johnson is a special visitor who awards a five-entry Notebook study pack.

## Day, Night, And Alternate Meetings

The D.C. map has a day and night state:

- Day: 6:00 AM to 7:59 PM.
- Night: 8:00 PM to 5:59 AM.

The player can wait at designated D.C. rest spots to move to the next day or night period.

At night, four House lawmakers can appear in relaxed alternate locations. Starting their encounter there gives a small Rapport bonus:

- Wren Castellano: quiet cafe near the Mall.
- Naomi Cho: evening Press Row stand-up near the monuments.
- Dez Okonkwo: walking and talking with tourists.
- Fritz Callahan: late-night diner near the monuments.

These night alternates do not change vote value, question format, or core campaign rules. They simply provide a more relaxed Rapport starting point.

## Ghost Secrets And Full Notebook Completion

The game has two optional historical ghost encounters. They are school-appropriate secrets tied to civic study and exploration.

Ghost of George Washington:

- Location: Washington Monument.
- Requirement: nighttime, at least 100 Notebook entries, and prior knowledge of the 22nd Amendment or the two-term limit from another source.
- The player answers a riddle about declining a third presidential term.
- An acceptable answer includes `22nd Amendment` or `two-term limit`.
- Reward: a Ghost-exclusive Notebook entry.

Ghost of Abraham Lincoln:

- Location: Lincoln Memorial.
- Requirement: 127 out of 128 Notebook entries and readiness for the Oval Office.
- The White House staff alerts the player that they may want to make one final stop.
- Lincoln asks a narrative question: `Why'd you come back?`
- Every respectful response is accepted.
- Reward: the final Ghost-exclusive Notebook entry related to the Emancipation Proclamation, completing the Notebook.

Ghost encounters do not grant votes, INF, or a normal campaign shortcut. They reward exploration and study completion.

## White House Preparation

After clearing the Senate, the player reaches the White House. The White House is a short explorable West Wing hallway rather than an immediate final quiz. The player can leave and return before entering the Oval Office.

The White House includes:

- Oval Office door: begins the final meeting.
- Press Room: provides context about whether the President seems supportive or skeptical.
- Preparation Room: lets the player open the Notebook, view the Bill Scroll, and use the final Shop counter.
- Legislative Affairs office: flavor about congressional coordination.
- West Wing Operations office: flavor about the work supporting important meetings.
- Optional staff note directing nearly complete Notebook players to Lincoln Memorial.

The final Shop counter sells eligible question tools under the usual rules. The player should be able to study, inspect bill amendments, and prepare before committing to the Oval Office encounter.

## President Anthony J. DiSantis

The final in-game President is **President Anthony J. DiSantis**, a fictional character. He is not a real current-officeholder answer in the USCIS question bank.

President DiSantis is energetic, prepared, confident, and lightly witty. He respects civic knowledge and strong preparation even when he is skeptical of the bill. He is visually presented as a bald white man with black-framed glasses, a neat beard, tailored navy suit, bright patterned tie, and colorful socks. His daughter Sutton DiSantis appears in the final scene as an encouraging, narrative-only character.

Sutton is eight years old, bright, curious, supportive of her father, and lightly playful. She never supplies a correct answer, vote, hint, currency reward, or outcome-changing advantage.

## Oval Office Final Assessment

The Oval Office is the final live civics assessment. The game randomly determines at campaign creation whether President DiSantis is aligned as an `ally` or `opposition` figure for this fictional bill. The alignment does not change the President character, only the assessment format.

Supportive or Ally route:

- Presented as the `OVAL OFFICE POP QUIZ`.
- Uses multiple-choice questions.
- Up to 20 questions may be asked.
- The player needs 12 correct answers to succeed.
- The player can use Talking Points Memos to remove an incorrect answer.
- Succeeding early can add an Oval Office accuracy bonus to the final score.

Skeptical or Opposition route:

- Presented as `THE PRESIDENTIAL INTERVIEW`.
- Uses typed open-response questions.
- Up to 10 questions may be asked.
- Each question has a 30-second timer.
- The player needs 6 correct answers to succeed.
- The player can use Cafeteria Coffee to pause the active timed question for 15 seconds.

The final questions draw from the wider 128-question civics curriculum. Before the questions begin, the Oval Office panel can play an introductory video if available, with an option to skip it.

If the player succeeds, President DiSantis signs the fictional Connected Classrooms Act into law. The game displays a celebration with a signed bill, the President, Sutton, confetti, and the player's Representative name.

## Veto Override Route

If the player does not pass the Oval Office assessment, President DiSantis vetoes the bill. The game makes clear that this is not the end of the campaign.

The Veto Override panel explains that Congress can still make the bill law with a two-thirds majority in both chambers.

Override requirements:

- House: **290 votes**.
- Senate: **67 votes**.

During the override campaign, previously locked lawmakers are reopened for one final attempt. The player returns to the House or Senate, builds the higher support totals, then returns to the White House. Once both thresholds are met, the Oval Office route finalizes the override and the bill becomes law despite the veto.

The override is presented as a higher bar that represents Congress making a stronger case, not as a shortcut around disagreement.

## Success, Score, And Completion Record

When the bill becomes law, the game shows a cheerful `SIGNED INTO LAW!` celebration and calculates a provisional score.

The score includes:

- 2,000 base points for clearing the game.
- 25 points for each correctly answered live civics question.
- 10 points for each Notebook entry.
- Up to 800 Oval Office accuracy points on the supportive route.
- 2,000 points for all 128 Notebook entries.
- A speed bonus based on campaign completion time.
- An INF efficiency bonus based on remaining Influence, capped at 3,200 points.

The player chooses between:

- `LOCK IN SCORE`: finalizes the result and opens the completion record.
- `CONTINUE EXPLORING`: returns to D.C. after victory so the player can collect more Notebook entries before later locking the score.

The final completion record can be downloaded as a PNG. It includes:

- Representative name.
- Completion route: bill signed into law or veto override completed.
- House support total.
- Senate support total.
- Notebook entries collected.
- Remaining Influence.
- Final score.

The game retains the most recently locked completion record separately from the active campaign so it can be viewed again from the title screen.

## Educational Goals

Capitol Hill Crawler is designed to help students practice:

- Civics vocabulary.
- Content from the 2025 USCIS civics test.
- The roles of the House, Senate, committees, and President.
- How a bill becomes a law in a simplified model.
- Amendments, committee markup, debate, filibusters, cloture, vetoes, and overrides.
- Research and study habits.
- Reading feedback after a missed question.
- Coalition building and respectful communication.
- The difference between an idea, an implementation plan, and a law.

The game intentionally simplifies real government procedure for classroom use. It should not be presented as a full simulation of every real legislative rule.

## Suggested Narrative Arc For A Video

If generating a broad gameplay video, follow this progression:

1. Open on the Capitol Hill Crawler title screen and explain that the player is a new Representative with a bill to pass.
2. Show character creation, the Capitol Rotunda, and Mr. Ben Venello's House tutorial.
3. Show the player moving through the House and speaking to lawmakers.
4. Demonstrate a Rapport choice and a USCIS civics question.
5. Show votes and INF increasing after a correct answer.
6. Show the Notebook, Bill Scroll, and Rotunda Shop as preparation tools.
7. Show the 175-vote committee interruption, amendments, and the race to 218 House votes.
8. Show the Senate, Holds, the 50-vote Filibuster Gauntlet, and the 60-vote cloture goal.
9. Mention Gridlock, Rogue Senator Nodes, scouting, and the optional D.C. study/exploration layer.
10. Show White House preparation and the Oval Office final assessment.
11. Conclude with the bill being signed, or explain that a veto opens the 290 House vote and 67 Senate vote override route.
12. End on the celebration, score, and downloadable completion record.

## Important Terminology

| Term | Meaning In The Game |
| --- | --- |
| Connected Classrooms Act | The player's fictional education bill. |
| INF / Influence | Resource earned from correct live answers and spent at the Shop. |
| Living Bill Scroll | The visible bill document that tracks goals and committee amendments. |
| Notebook | Study collection of civics questions, answers, sources, and vocabulary. |
| Rapport | A leader's response to the player's communication approach; it changes help and answer tolerance. |
| House passage | Reaching 218 House votes. |
| Committee markup | The House committee review that begins at 175 votes. |
| Hold | A Senate preparation requirement that must be resolved before a normal meeting. |
| Filibuster | A simplified Senate delay challenge triggered at 50 votes. |
| Cloture | The Senate threshold of 60 votes that clears the bill toward the White House. |
| Gridlock | The state entered after failing the Filibuster Gauntlet. |
| Rogue Senator Nodes | Senate Overtime civics challenges that can break Gridlock. |
| Veto override | The alternate final route requiring 290 House votes and 67 Senate votes. |
| Completion Record | Downloadable PNG proof of a locked completed campaign. |

## Accuracy Guidance For Generated Video

- Call the bill the **Connected Classrooms Act**.
- Describe all lawmakers and President Anthony J. DiSantis as fictional game characters.
- Say the game uses a simplified classroom model of government procedure.
- State that civics questions come from the 2025 USCIS 128-question civics bank.
- Explain that correct answers earn votes and INF.
- Explain that the House needs 218 votes, the Senate needs 60 votes for cloture, and an override needs 290 House votes plus 67 Senate votes.
- Do not claim the game is a real-time political simulation, a real legislative record, or a source of current government officeholder information.
- Do not portray the player as selecting a real-world ideological outcome. The player is building support for one fictional education bill using different communication approaches.
- Use screenshots to ground visual descriptions in the actual game interface and pixel-art environments.
