export type NpcDialogue = {
  rapport: boolean;
  background: string;
  prompt: string;
  tell: string;
  practical: string;
  idealistic: string;
  neutral: string;
  success: string;
  firstMiss: string;
  locked: string;
  override: string;
};

const defaultDialogue: NpcDialogue = {
  rapport: true,
  background: 'They have spent enough time listening to schools and families to know that a good idea still needs a workable plan.',
  prompt: 'Before the civics question, how will you explain the Connected Classrooms Act?',
  tell: 'I listen closely for a plan that respects both people and the work ahead.',
  practical: 'The bill has a clear plan for equipment, maintenance, and teacher support.',
  idealistic: 'Every student deserves a fair chance to learn with the tools they need.',
  neutral: 'I want to hear what families and educators in your district need most.',
  success: 'That is a clear answer. I can support this effort.',
  firstMiss: 'That one did not land. Review the fact, then take a fresh question. Good preparation is part of public service.',
  locked: 'We have used both meetings for now. Keep building your coalition; a different colleague may see a path forward.',
  override: 'Congress has raised the stakes. This is one final meeting, so bring a clear case and your best civics.'
};

export const npcDialogue: Record<string, Partial<NpcDialogue>> = {
  'wren-castellano': {
    background: 'Wren was a public-school counselor before running for office. She still keeps a folded list of student questions in her desk drawer.',
    prompt: 'The bill has a good goal, but good goals do not pass bills by themselves. What will you tell members who are not sure yet?',
    tell: 'A bill lasts longer when people can see their concerns in it.',
    practical: 'I will listen to concerns and find a version schools across the country can support.',
    idealistic: 'I will protect every student’s chance to learn, wherever they live.',
    neutral: 'I will start by asking what students and teachers in your district need most.',
    success: 'You came prepared and listened. That is how a new Representative earns trust.',
    firstMiss: 'Close, but do not rush it. Take a breath, use the new question, and show me what you learned.',
    locked: 'That is two attempts for today. It is all right to regroup; the House has more than one conversation happening.',
    override: 'An override asks everyone to look again. I can offer one fresh question, and then I need your clearest answer.'
  },
  'sarah-sterling': { background: 'Sarah grew up helping in her family’s hardware store, where she learned that a project only works when every person has a job they can actually do.', prompt: 'What would you say to a colleague who worries that this bill asks too many different groups to work together?', tell: 'I am looking for bridges sturdy enough to carry real work.', success: 'Clean answer. The Bipartisan Solvers are with you.', firstMiss: 'A bridge needs a sound footing. Try the fresh question and show your work.', locked: 'Two attempts is enough for this meeting. Keep the bridge-building going elsewhere.', override: 'The override is a test of whether a coalition can return with stronger answers. You have one question.' },
  'diane-okafor': { background: 'Diane began as a city budget analyst and still marks up every proposal with a green pen, a calculator, and a list of questions from local principals.', prompt: 'My caucus wants to know what happens after the cameras leave and the work begins. How do you make the case?', tell: 'I keep a headcount in one hand and an implementation plan in the other.', success: 'The vote math works. My caucus can move with you.', firstMiss: 'Mark that fact for review. The second question is a new line item, not a penalty.', locked: 'We have reached the end of this review. Continue gathering support and information.', override: 'The House has reopened the file. One answer remains before I decide whether to join the override count.' },
  'tom-bracewell': { background: 'Tom taught American history for nearly two decades. Former students still send him postcards when they visit Washington.', prompt: 'I have seen popular ideas fade because nobody explained their next step. What is your answer to that?', tell: 'A long story is useful only if it ends with a lesson people can use.', success: 'You have done the homework. My caucus will give this bill a fair push.', firstMiss: 'Not every lesson arrives on the first try. Use the next question to show what you retained.', locked: 'Class is not over, Representative. This particular conversation is; take the lesson to the next office.', override: 'History includes second looks. Congress has asked for one more answer from you.' },
  'marcus-vance': { background: 'Marcus ran a youth sports program before Congress. He believes clear rules make it easier for everyone to contribute.', tell: 'A promise without a standard behind it is only a slogan.', success: 'You defended the foundation. I will bring the coalition in.' },
  'priya-anand': { background: 'Priya spent years evaluating school technology programs. She has seen strong pilots fail when nobody plans for repairs or training.', prompt: 'I am not signing a slogan. What do you say when I ask how this bill will actually work?', tell: 'Show me the evidence, the timeline, and the part that actually works.', success: 'Specific, accurate, and useful. That earns my support.' },
  'hank-delgado': { background: 'Hank’s family runs a small print shop. He knows that the best plan in the world still has to fit into a busy workday.', prompt: 'A school leader in my district asks whether this plan will still make sense on a busy Monday. What do you tell them?', tell: 'The test is simple: would this make sense back home on Monday morning?', success: 'That would work back home. You have my bloc.' },
  'gus-whitfield': { background: 'Gus worked in facilities management for a community college, where one delayed shipment could change an entire semester.', prompt: 'Committee rooms are full of good intentions. How will you show this one is ready for the real work?', tell: 'Preparation is the quickest way to make a committee veteran pay attention.', success: 'You came ready. I respect that.' },
  'naomi-cho': { background: 'Naomi was a local radio host before public office. She learned that people ask better questions when someone explains the basics plainly.', prompt: 'A parent sees only the headline. How would you explain why this bill matters?', tell: 'If people cannot understand a bill, they cannot tell whether it helps them.', success: 'You made the case clearly. I can stand beside that message.' },
  'earl-pruitt': { background: 'Earl represents towns where a school bus ride can take an hour. He measures access by whether a service reaches the last road on the map.', prompt: 'My rural districts need more than a promise made in a city. How do you answer that concern?', tell: 'A map looks different when the nearest help is a long drive away.', success: 'You remembered communities outside the big cities. That matters.' },
  'selena-marsh': { background: 'Selena organized neighborhood cleanups before running for office. She is used to finding one useful task for every person at the table.', prompt: 'Different leaders want different things from this bill. How will you keep them in the same coalition?', tell: 'The strongest coalitions have room for people who arrived by different roads.', success: 'You know how to bring people in. I will help build the count.' },
  'otis-reinholt': { background: 'Otis served on his town’s finance committee and keeps a worn notebook of questions taxpayers asked at open meetings.', prompt: 'Before I support this, tell me why it will be worth the public resources it uses.', tell: 'Every good intention needs a number attached to it eventually.', success: 'The details are sound enough for my vote.' },
  'ines-falkenrath': { background: 'Ines was the first in her family to attend college. A teacher who stayed late to help her study still shapes how she talks about opportunity.', prompt: 'What do you want a student to feel is different because this bill passed?', tell: 'A first-term Representative should never be embarrassed to care about the purpose.', success: 'You did not lose sight of why this matters. I am with you.' },
  'cyrus-boone': { background: 'Cyrus grew up around a county courthouse and learned early that procedures can protect people when everyone understands them.', prompt: 'A committee chair has heard every confident speech. What makes your proposal more than a speech?', tell: 'A committee chair can hear the difference between confidence and preparation.', success: 'You came with substance. That is enough for me.' },
  'alma-judd': { background: 'Alma coached debate after school for years. She values a claim that can be stated clearly and supported quickly.', tell: 'I do not need a long speech. I need a clear reason.', success: 'Clear answer. Clear vote.' },
  'dez-okonkwo': { background: 'Dez started a weekend youth arts program and still knows how quickly a room changes when someone feels included.', tell: 'People will talk if you give them a reason to feel heard.', success: 'That is the kind of conversation I can support.' },
  'fritz-callahan': { background: 'Fritz spent his early career as a paramedic. He has little patience for fuss, but plenty of patience for people who come prepared.', tell: 'Keep it short, keep it useful, and do not waste the good coffee.', success: 'You made the point. I am in.' },
  'robin-yates': { background: 'Robin manages a family orchard and has learned not to bet a season on a promise without checking the weather and the soil first.', tell: 'I am not opposed. I just need a reason to be sure.', success: 'You gave me one. I will vote yes.' },
  'marv-tillson': { background: 'Marv was a science teacher before Congress. He still carries a mechanical pencil and asks students, staff, and colleagues to show their work.', tell: 'I have heard plenty of promises. Facts are harder to come by.', success: 'That answer earned my trust.' },
  'ada-boykin': { background: 'Ada helped rebuild a neighborhood library after a flood. She remembers which promises turned into action and which disappeared.', tell: 'If a commitment matters, it should survive a hard question.', success: 'You held the line. I will support it.' },
  'silas-kroft': { background: 'Silas trained as an engineer and still treats a vague answer as an unfinished blueprint, not an insult.', tell: 'Precision is not a trick. It is respect for the people affected.', success: 'Accurate. You have my vote.' },
  'clem-osgood': { background: 'Clem worked in a public records office. He trusts facts that can be checked and gets suspicious when a claim cannot be traced.', tell: 'Talking points drift away. Facts stay put.', success: 'You knew the fact. That is enough.' },
  'regina-alvarez': { background: 'Regina learned negotiation in her grandparents’ restaurant, where keeping a table talking mattered as much as getting an order right.', prompt: 'A good deal lets people say yes without pretending they agree on everything. How do you make that possible?', tell: 'A deal is not a shortcut. It is a craft.', success: 'You understand the terms. I can make this work.' },
  'walt-iverson': { background: 'Walt began as a Senate page and has a memory for the stories behind the chamber’s old rules and traditions.', prompt: 'The Senate remembers every promise someone made too quickly. What kind of case are you bringing today?', tell: 'Precedent is simply the Senate remembering what it has learned.', success: 'Well grounded. You have my vote.' },
  'bee-nakamura': { background: 'Bee founded a neighborhood tutoring network while still in college. She brings a clipboard, quick energy, and a list of the next five steps.', tell: 'New leaders have to prove they can carry both energy and responsibility.', success: 'That is how we move a bill forward.' },
  'roland-fitch': { background: 'Roland is finishing his final term after a long career in public service. He no longer sees much value in polite answers that dodge the point.', tell: 'Retirement makes honesty much easier to afford.', success: 'Straight answer. Straight vote.' },
  'eleanor-vance': { background: 'Eleanor spent years preserving local history. She believes every policy should leave behind a record strong enough for the next generation to understand.', tell: 'A bill should survive the archive as well as the floor.', success: 'The briefing and the answer hold together. My Hold is released.' },
  'corinne-vasquez': { background: 'Corinne first learned politics by helping neighbors navigate city services. She respects a favor that is direct, useful, and returned.', tell: 'Every vote has a story. The useful question is whether you know how to finish it.', success: 'Favor returned. My vote is yours.' },
  'del-ashworth': { background: 'Del keeps the civics textbook from his first teaching job in his office. He thinks preparation is a form of respect for the public.', tell: 'Civics is not a trivia trick if you have taken time to study it.', success: 'You did the preparation. I will end my Hold.' },
  'priya-okafor-lin': { background: 'Luciana coordinated emergency schedules before entering public office. Her color-coded calendar is famous, and she notices when people arrive prepared.', tell: 'Prepared people respect other people’s time.', success: 'You came ready. I can support this.' },
  'augustus-kane': { background: 'Augustus built his reputation as a radio commentator before the Senate. He treats every disagreement like a speech that needs a clear ending.', tell: 'The Cloakroom staffer was right: I respect a firm commitment, not a foggy promise.', success: 'That is a commitment I can hear from the back row.' },
  'lucia-marchetti': { background: 'Lucia organized coastal restoration projects before public office. She has little patience for plans that forget why people are doing the work.', tell: 'The Press Row intern was right: I want to know what larger purpose this serves.', success: 'You did not lose the larger purpose. I will listen.' }
};

export function dialogueFor(id: string): NpcDialogue {
  return { ...defaultDialogue, ...npcDialogue[id] };
}

export type Trait = 'pragmatic' | 'idealistic' | 'compromiser' | 'firm' | 'detailOriented' | 'bigPicture';
export const traitPairs: readonly (readonly [Trait, Trait])[] = [['pragmatic', 'idealistic'], ['compromiser', 'firm'], ['detailOriented', 'bigPicture']];

export const traitCopy: Record<Trait, { tell: string; response: string }> = {
  pragmatic: { tell: 'They keep returning to what will work, who will maintain it, and how the plan reaches people.', response: 'The bill includes practical steps, maintenance support, and a clear plan for implementation.' },
  idealistic: { tell: 'They keep returning to fairness, purpose, and the students the bill is meant to serve.', response: 'Every student deserves a fair chance to learn with the tools they need.' },
  compromiser: { tell: 'They mention listening, common ground, and building a coalition that can last.', response: 'I will listen to concerns and build a version that communities across the country can support.' },
  firm: { tell: 'They listen for clear commitments and want to know which promises will not be traded away.', response: 'I will protect the bill’s core promise and make clear commitments to students and schools.' },
  detailOriented: { tell: 'They ask about timelines, costs, evidence, and how every part of the plan will work.', response: 'I can explain the evidence, the timeline, and the details that make this plan work.' },
  bigPicture: { tell: 'They talk about the future, community impact, and the larger purpose behind the bill.', response: 'This is about the larger future we want for students, schools, and communities.' }
};

export function oppositeTrait(trait: Trait): Trait {
  return ({ pragmatic: 'idealistic', idealistic: 'pragmatic', compromiser: 'firm', firm: 'compromiser', detailOriented: 'bigPicture', bigPicture: 'detailOriented' } as const)[trait];
}
