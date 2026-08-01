import { civicsQuestions, type CivicsQuestion } from './civics-questions';

export type Mode = 'multiple' | 'short' | 'matrix' | 'mumbled';

/** Polarization fixes the base encounter format; Rapport never changes it. */
export function encounterModeFor(polarization: number, playerParty: 'D' | 'R'): Mode {
  const delta = Math.abs(50 - polarization);
  if (delta <= 5) return 'multiple';
  if (delta <= 15) return 'short';
  if (delta <= 39) return 'multiple';
  const npcParty = polarization < 50 ? 'D' : 'R';
  return npcParty === playerParty ? 'matrix' : 'mumbled';
}

export type Encounter = {
  id: string;
  name: string;
  title: string;
  state: string;
  affiliation: string;
  x: number;
  y: number;
  color: string;
  portrait: string;
  polarization: number;
  votes: number;
  voteRange: readonly [number, number];
  mode: Mode;
  greeting: string;
  hint?: string;
  success: string;
  note: { title: string; text: string };
};

function houseEncounter(
  id: string,
  name: string,
  title: string,
  x: number,
  polarization: number,
  votes: number,
  voteRange: readonly [number, number],
  mode: Mode,
  greeting: string,
  color: string,
  portrait: string
): Encounter {
  const mapX = 500 + Math.round((x / 8700) * 6200);
  const mapY = 690 + (Math.floor(x / 360) % 3) * 220;
  const stateCodes = ['AL', 'AZ', 'CA', 'CO', 'CT', 'FL', 'GA', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'MI', 'MN', 'MO', 'NC', 'NJ', 'NM', 'NY', 'OH', 'OR', 'PA', 'SC', 'TN', 'TX', 'VA', 'WA', 'WI'];
  const codeIndex = [...id].reduce((total, character) => total + character.charCodeAt(0), 0) % stateCodes.length;
  const party = polarization < 50 ? 'D' : polarization > 50 ? 'R' : 'I';
  return {
    id, name, title, state: 'House of Representatives', affiliation: `${party}-${stateCodes[codeIndex]}`, x: mapX, y: mapY, color, portrait, polarization, votes, voteRange, mode, greeting,
    success: `Thank you, Representative. My ${votes} votes are with the Connected Classrooms Act.`,
    note: { title: name, text: `${title}: a House supporter for the Connected Classrooms Act.` }
  };
}

export const encounters: Encounter[] = [
  houseEncounter('wren-castellano', 'Wren Castellano', 'Freshman Mentor · Chamber', 560, 48, 24, [18, 24], 'multiple', 'New members deserve a fair start. Show me you are ready to listen and build a coalition.', '#e58fc0', 'WC'),
  houseEncounter('alma-judd', 'Alma Judd', 'Near-Center Loner · North Hall', 900, 50, 10, [8, 10], 'multiple', 'I vote quickly when the facts are clear. Start with the basics.', '#65c7c4', 'AJ'),
  houseEncounter('dez-okonkwo', 'Dez Okonkwo', 'Near-Center Loner · North Hall', 1240, 52, 10, [8, 10], 'multiple', 'You are new, so let us make this a useful conversation.', '#f0b75d', 'DO'),
  houseEncounter('fritz-callahan', 'Fritz Callahan', 'Near-Center Loner · House Desk', 1580, 47, 10, [8, 10], 'multiple', 'You have my attention. Keep it clear and keep it moving.', '#8fca68', 'FC'),
  houseEncounter('sarah-sterling', 'Sarah Sterling', 'Major · Bipartisan Solvers', 2050, 62, 40, [35, 40], 'short', 'The Connected Classrooms Act has promise. Show me that its foundation is as solid as its goal.', '#e96a59', 'SS'),
  houseEncounter('selena-marsh', 'Selena Marsh', 'Mid-Tier · Coalition Builder', 2440, 52, 24, [18, 24], 'multiple', 'A good coalition makes room for more than one viewpoint. Let us see how you handle this.', '#d8895b', 'SM'),
  houseEncounter('priya-anand', 'Priya Anand', 'Mid-Tier · Policy Wonk', 2800, 45, 24, [18, 24], 'multiple', 'Bring evidence, not vague promises. The details matter.', '#5e9bd4', 'PA'),
  houseEncounter('hank-delgado', 'Hank Delgado', 'Mid-Tier · Small Business Voice', 3160, 55, 24, [18, 24], 'short', 'Would this work back home? That is the question I ask about every bill.', '#a67148', 'HD'),
  houseEncounter('naomi-cho', 'Naomi Cho', 'Mid-Tier · Public Communication', 3520, 58, 24, [18, 24], 'short', 'People need to understand what this bill does and why it matters.', '#9b7bd4', 'NC'),
  houseEncounter('otis-reinholt', 'Otis Reinholt', 'Mid-Tier · Budget Hawk', 3880, 62, 24, [18, 24], 'short', 'Every good intention needs a workable plan behind it.', '#6b8796', 'OR'),
  houseEncounter('robin-yates', 'Robin Yates', 'Mid-Distance Loner · East Hall', 4240, 35, 8, [5, 7], 'short', 'I am still deciding. Give me one good reason to trust this bill.', '#b26b8d', 'RY'),
  houseEncounter('marv-tillson', 'Marv Tillson', 'Mid-Distance Loner · East Hall', 4580, 68, 8, [5, 7], 'short', 'I have heard plenty of promises. Give me a reason to believe this one.', '#81765d', 'MT'),
  houseEncounter('gus-whitfield', 'Gus Whitfield', 'Mid-Tier · Committee Corridor', 5000, 42, 24, [18, 24], 'multiple', 'Preparation earns respect around here. Let us see yours.', '#718c5e', 'GW'),
  houseEncounter('cyrus-boone', 'Cyrus Boone', 'Mid-Tier · Committee Corridor', 5360, 72, 24, [18, 24], 'short', 'Do your homework before you ask a committee chair for support.', '#835e47', 'CB'),
  houseEncounter('marcus-vance', 'Marcus Vance', 'Mid-Tier · Far-West Gatekeeper', 5780, 5, 24, [18, 24], 'matrix', 'A broad goal is not enough. Show me that you understand the civic foundation beneath your bill.', '#66a9e8', 'MV'),
  houseEncounter('diane-okafor', 'Diane Okafor', 'Major · Loyalist West Caucus', 6280, 70, 38, [35, 40], 'short', 'I count votes and read plans. Give me a reason to put my caucus behind yours.', '#ba5a58', 'DO'),
  houseEncounter('ines-falkenrath', 'Ines Falkenrath', 'Mid-Tier · First-Term Idealist', 6680, 38, 24, [18, 24], 'short', 'A bill should give people something worth believing in.', '#b782c5', 'IF'),
  houseEncounter('earl-pruitt', 'Earl Pruitt', 'Mid-Tier · Rural District Voice', 7060, 65, 24, [18, 24], 'short', 'Tell me how this helps a school that is far from every big-city promise.', '#c6954e', 'EP'),
  houseEncounter('tom-bracewell', 'Tom Bracewell', 'Major · Loyalist East Caucus', 7520, 30, 37, [35, 40], 'short', 'I have seen bills come and go. A little preparation goes a long way.', '#5f8ca0', 'TB'),
  houseEncounter('ada-boykin', 'Ada Boykin', 'Far-Extreme Loner · East Cloakroom', 7960, 12, 4, [2, 4], 'matrix', 'If you believe in this bill, prove you can defend it.', '#b74662', 'AB'),
  houseEncounter('silas-kroft', 'Silas Kroft', 'Far-Extreme Loner · East Cloakroom', 8020, 88, 3, [2, 4], 'matrix', 'No slogans. Give me a precise answer.', '#7251a3', 'SK'),
  houseEncounter('clem-osgood', 'Clem Osgood', 'Far-Extreme Loner · East Cloakroom', 8700, 92, 3, [2, 4], 'matrix', 'Talking points are easy. Knowing the facts is harder.', '#546a8c', 'CO')
];

export const senateEncounters: Encounter[] = [
  houseEncounter('regina-alvarez', 'Regina Alvarez', 'Moderate Core · Deal Maker', 700, 45, 10, [10, 10], 'multiple', 'A workable agreement is a craft. Show me you know the foundation before we begin.', '#b96a70', 'RA'),
  houseEncounter('walt-iverson', 'Walt Iverson', 'Moderate Core · Institutionalist', 1500, 48, 10, [10, 10], 'multiple', 'The Senate runs on rules, memory, and preparation. Let us see yours.', '#688aa2', 'WI'),
  houseEncounter('bee-nakamura', 'Bee Nakamura', 'Moderate Core · New Leadership', 2350, 55, 10, [10, 10], 'multiple', 'This is a chance to show that new leaders can move good work forward.', '#d38a4f', 'BN'),
  houseEncounter('roland-fitch', 'Roland Fitch', 'Moderate Core · Candid Veteran', 3200, 62, 10, [10, 10], 'short', 'I am retiring soon, so I will be direct. Bring me a clear answer and a clear purpose.', '#77966d', 'RF'),
  houseEncounter('eleanor-vance', 'Eleanor Vance', 'Near-Flank · Hold: Impact Briefing', 4000, 35, 10, [10, 10], 'short', 'Bring me the Economic Impact Briefing from the Archive Basement, then we can discuss this bill.', '#7c9da6', 'EV'),
  houseEncounter('corinne-vasquez', 'Corinne Vasquez', 'Near-Flank · Hold: Favor Trade', 4800, 32, 10, [10, 10], 'short', 'Help me persuade a colleague first. Then I will give your bill a fair hearing.', '#bd6e61', 'CV'),
  houseEncounter('del-ashworth', 'Del Ashworth', 'Near-Flank · Hold: Notebook Study', 5600, 68, 10, [10, 10], 'short', 'Show me that you have put in the study time before asking for my vote.', '#8e7959', 'DA'),
  houseEncounter('priya-okafor-lin', 'Luciana Abbonizio', 'Near-Flank · Hold: Missing Notes', 6400, 72, 10, [10, 10], 'short', 'Find my missing notes, or arrange a Scheduling Favor at the Rotunda. Then we will talk.', '#8a6cac', 'LA'),
  houseEncounter('augustus-kane', 'Augustus "The Anchor" Kane', 'Extreme · Cloakroom Scouting', 7200, 15, 10, [10, 10], 'matrix', 'A floor speech needs conviction. After Gridlock, prove yours and I may break it.', '#a65a4d', 'AK'),
  houseEncounter('lucia-marchetti', 'Lucia Marchetti', 'Extreme · Press Scouting', 8000, 85, 10, [10, 10], 'matrix', 'Half-measures do not move history. After Gridlock, show me you can meet the moment.', '#6b5aa2', 'LM')
];

export const requiredVotes = 218;
export const worldWidth = 9200;
export const worldHeight = 1900;

export type HouseVoteLedger = { committeeVotes: number; npcVotes: Record<string, number> };

export function generateHouseVoteLedger(random = Math.random): HouseVoteLedger {
  // The 22 floor leaders account for 400 seats. A passed markup supplies the
  // remaining 35, keeping the completed House ledger at the real 435 seats.
  const committeeVotes = 35;
  const target = 400;
  const npcVotes = Object.fromEntries(encounters.map((encounter) => [encounter.id, encounter.voteRange[0]]));
  let remaining = target - Object.values(npcVotes).reduce((total, votes) => total + votes, 0);

  while (remaining > 0) {
    const eligible = encounters.filter((encounter) => npcVotes[encounter.id] < encounter.voteRange[1]);
    if (!eligible.length) throw new Error('House vote ranges cannot reach the generated total.');
    const encounter = eligible[Math.floor(random() * eligible.length)];
    npcVotes[encounter.id] += 1;
    remaining -= 1;
  }

  return { committeeVotes, npcVotes };
}

export function applyHouseVoteLedger(ledger: HouseVoteLedger) {
  return encounters.map((encounter) => {
    const votes = ledger.npcVotes[encounter.id] ?? encounter.votes;
    return { ...encounter, votes, success: `Thank you, Representative. My ${votes} votes are with the Connected Classrooms Act.` };
  });
}

export function houseQuestionIds(successfulHouseEncounters: number) {
  return successfulHouseEncounters >= 4
    ? civicsQuestions.filter((question) => question.id <= 72).map((question) => question.id)
    : civicsQuestions.filter((question) => question.id <= 16).map((question) => question.id);
}

export function senateQuestionIds(includeSymbols = false) {
  return civicsQuestions
    .filter((question) => question.id >= 73 && question.id <= (includeSymbols ? 128 : 118) && !question.dynamic)
    .map((question) => question.id);
}

export function questionChoices(question: CivicsQuestion, count: number) {
  // Rotate through official answers so students can encounter more than one valid
  // phrasing in multiple-choice questions, while still showing one correct choice.
  const choices = [question.acceptedAnswers[(question.id - 1) % question.acceptedAnswers.length]];
  const houseDistractors: Record<number, string[]> = {
    1: ['Parliamentary monarchy', 'Direct democracy', 'Military dictatorship'],
    2: ['Declaration of Independence', 'Bill of Rights', 'Articles of Confederation'],
    3: ['Elects every governor', 'Creates all state laws', 'Names every federal judge'],
    4: ['The President should rule alone', 'Only landowners can vote', 'States may ignore federal laws'],
    5: ['Executive orders', 'Supreme Court cases', 'State referendums'],
    6: ['The powers of Congress', 'The President’s duties', 'State boundaries'],
    7: ['10', '21', '50'],
    8: ['It created the Constitution', 'It ended the Civil War', 'It established Congress'],
    9: ['U.S. Constitution', 'Federalist Papers', 'Bill of Rights'],
    10: ['Hereditary monarchy', 'Unlimited government', 'Rule by military'],
    11: ['U.S. Constitution', 'Gettysburg Address', 'Federalist Papers'],
    12: ['Communism', 'Feudalism', 'Command economy'],
    13: ['Only citizens follow laws', 'Presidents are above laws', 'Courts make laws without limits'],
    14: ['Magna Carta', 'Gettysburg Address', 'Monroe Doctrine'],
    15: ['To make one branch strongest', 'To remove elections', 'To give states no power'],
    16: ['Federal, state, local', 'House, Senate, Cabinet', 'Congress, governors, mayors'],
    17: ['Legislative branch', 'Judicial branch', 'State government'],
    18: ['The President', 'Supreme Court', 'State governors'],
    19: ['House and Cabinet', 'President and courts', 'Senate and Supreme Court'],
    20: ['Appoint state governors', 'Print state driver licenses', 'Run local elections'],
    21: ['50', '435', '538'],
    22: ['2 years', '4 years', '8 years'],
    24: ['100', '50', '538'],
    25: ['6 years', '4 years', '8 years'],
    26: ['To avoid elections', 'To appoint judges', 'To lead the military'],
    27: ['One', 'Four', 'Fifty'],
    28: ['To elect the President', 'To create a national holiday', 'To give governors power'],
    31: ['Only voters in Washington, D.C.', 'All people worldwide', 'Only members of Congress'],
    32: ['Members of the House', 'The President', 'Supreme Court justices'],
    33: ['All people in the country', 'Only other representatives', 'Only their party'],
    34: ['All U.S. citizens', 'The President', 'State governors'],
    35: ['Every state gets the same number', 'The President decides', 'Senators assign them'],
    36: ['2 years', '6 years', '8 years'],
    37: ['The 10th Amendment', 'The 19th Amendment', 'The 14th Amendment'],
    40: ['The Speaker of the House', 'The Chief Justice', 'The Secretary of State'],
    41: ['Writes all laws', 'Decides every court case', 'Runs state legislatures'],
    42: ['Vice President', 'Secretary of Defense', 'Speaker of the House'],
    43: ['The Senate', 'The Chief Justice', 'The Speaker of the House'],
    44: ['The Senate', 'Supreme Court', 'House of Representatives'],
    45: ['Congress', 'The Supreme Court', 'State governors'],
    46: ['Only Congress', 'Only the Supreme Court', 'State legislatures'],
    47: ['Writes state laws', 'Elects the President', 'Commands the military'],
    48: ['State senator', 'Supreme Court justice', 'Mayor'],
    49: ['It appoints Cabinet members', 'It creates state laws', 'It chooses Supreme Court cases'],
    50: ['Congress', 'The Cabinet', 'State legislatures'],
    51: ['Makes all laws', 'Elects governors', 'Commands the military'],
    52: ['Congress', 'Cabinet', 'Court of Appeals'],
    53: ['5', '50', '100'],
    54: ['1', '9', '100'],
    55: ['4 years', '6 years', 'Until the next election'],
    56: ['To campaign for office', 'To run state elections', 'To write laws'],
    58: ['Issue driver licenses', 'Run public schools', 'Approve zoning'],
    59: ['Declare war', 'Print money', 'Make treaties'],
    60: ['All powers belong only to Congress', 'States cannot make laws', 'The President controls courts'],
    63: ['Only landowners can vote', 'Citizens must own property', 'Only men can vote'],
    64: ['All residents', 'Only taxpayers', 'Only elected officials'],
    65: ['A guaranteed job', 'Free college', 'A driver license'],
    66: ['A political party', 'The President', 'A state governor'],
    67: ['Own a business', 'Vote in every election', 'Run for President'],
    68: ['Buy property', 'Serve in Congress', 'Join the military'],
    69: ['Ignore elected officials', 'Avoid community groups', 'Skip elections'],
    70: ['Move to another state', 'Own a home', 'Join Congress'],
    71: ['Optional donation', 'Only a state rule', 'A requirement for voting'],
    72: ['To run for President', 'To get a driver license', 'To join Congress']
  };
  const topicalDistractors: Record<number, string[]> = {
    99: ['Abigail Adams', 'Dolley Madison', 'Martha Washington', 'Eleanor Roosevelt', 'Clara Barton', 'Louisa May Alcott'],
    83: ['Thomas Jefferson', 'John Adams', 'Benjamin Franklin', 'George Washington', 'Patrick Henry', 'Samuel Adams'],
    117: ['Iroquois', 'Mohawk', 'Seminole', 'Choctaw', 'Hopi', 'Creek'],
    126: ['Labor Day', 'Columbus Day', 'Thanksgiving Day', 'Christmas Day', 'Juneteenth', 'Memorial Day']
  };
  const senateDistractors: Record<number, string[]> = {
    73: ['Military conquest', 'Royal inheritance', 'Mandatory service'],
    74: ['Vikings', 'Ancient Romans', 'British soldiers'],
    75: ['European nobles', 'Factory owners', 'Colonial governors'],
    76: ['Civil War', 'War of 1812', 'World War II'],
    77: ['Low taxes', 'Free trade', 'New statehood'],
    78: ['George Washington', 'James Madison', 'Benjamin Franklin'],
    79: ['July 4, 1787', 'September 17, 1787', 'November 11, 1918'],
    80: ['Pearl Harbor', 'Gettysburg', 'Battle of the Alamo'],
    81: ['Ohio', 'California', 'Texas'],
    82: ['Declaration of Independence', 'Bill of Rights', 'Gettysburg Address'],
    84: ['They created the Supreme Court', 'They ended the Revolution', 'They wrote the Bill of Rights'],
    85: ['First President', 'Father of the Constitution', 'Author of Common Sense'],
    86: ['First Secretary of the Treasury', 'Fourth President', 'First Postmaster General'],
    87: ['First President', 'First Secretary of State', 'Father of Our Country'],
    88: ['Third President', 'First Secretary of the Treasury', 'First Postmaster General'],
    89: ['Fourth President', 'Third President', 'First President'],
    90: ['Florida Territory', 'Oregon Territory', 'Alaska Territory'],
    91: ['World War II', 'Revolutionary War', 'Korean War'],
    92: ['War of 1812', 'Revolutionary War', 'Mexican-American War'],
    93: ['Pearl Harbor', 'Valley Forge', 'Boston Tea Party'],
    94: ['First President', 'Father of the Constitution', 'First Secretary of the Treasury'],
    95: ['Created the Constitution', 'Ended the Revolutionary War', 'Gave women the vote'],
    96: ['Revolutionary War', 'War of 1812', 'World War I'],
    97: ['15th Amendment', '19th Amendment', '22nd Amendment'],
    98: ['Before the Revolutionary War', 'During World War II', 'After September 11'],
    99: ['Abigail Adams', 'Dolley Madison', 'Martha Washington', 'Eleanor Roosevelt'],
    100: ['Civil War', 'Revolutionary War', 'War of 1812'],
    101: ['To gain new western land', 'To end the Civil War', 'To create NATO'],
    102: ['1776', '1870', '1945'],
    103: ['A period of rapid growth', 'A U.S. military victory', 'A new Constitution'],
    104: ['July 4, 1776', 'December 7, 1941', 'September 11, 2001'],
    105: ['George Washington', 'Dwight Eisenhower', 'Abraham Lincoln'],
    106: ['Boston Tea Party', 'Gettysburg Address', 'Louisiana Purchase'],
    107: ['Writer of the Declaration', 'First Secretary of Treasury', 'Civil rights leader'],
    108: ['China', 'Germany', 'Japan'],
    109: ['Monarchy', 'Immigration', 'Westward expansion'],
    110: ['To gain Louisiana Territory', 'To end the Civil War', 'To win independence from Britain'],
    111: ['To gain Alaska', 'To create the Constitution', 'To end the Great Depression'],
    112: ['Created the Supreme Court', 'Fought in World War II', 'Established national parks'],
    113: ['First President', 'Father of Our Country', 'Wrote the Constitution'],
    114: ['To end the Civil War', 'To stop communism in Korea', 'To win independence from Britain'],
    115: ['The stock market crashed', 'Congress declared war', 'The Constitution was signed'],
    116: ['Revolutionary War', 'War of 1812', 'Civil War'],
    117: ['Viking', 'Roman', 'Saxon'],
    118: ['The Electoral College', 'The Bill of Rights', 'The Louisiana Purchase'],
    119: ['New York City', 'Philadelphia', 'Boston'],
    120: ['San Francisco Bay', 'Boston Harbor', 'Chesapeake Bay'],
    121: ['One for each President', 'One for each Senator', 'One for each amendment'],
    122: ['One for each Senator', 'One for each original colony', 'One for each amendment'],
    123: ['America the Beautiful', 'My Country, ’Tis of Thee', 'God Bless America'],
    124: ['Many become separate', 'Government by the people', 'Freedom for all'],
    125: ['A holiday for U.S. veterans', 'A holiday for presidents', 'A holiday for workers'],
    127: ['A holiday honoring veterans', 'A holiday celebrating independence', 'A holiday honoring civil rights leaders'],
    128: ['A holiday honoring soldiers who died', 'A holiday celebrating independence', 'A holiday for workers']
  };
  const distractors = civicsQuestions
    .filter((candidate) => candidate.id !== question.id && !candidate.dynamic)
    .flatMap((candidate) => candidate.acceptedAnswers)
    .filter((answer) => !choices.includes(answer));

  const allCorrect = new Set(question.acceptedAnswers.map((answer) => answer.toLowerCase()));
  const contextual = [...(houseDistractors[question.id] ?? []), ...(senateDistractors[question.id] ?? []), ...(topicalDistractors[question.id] ?? [])]
    .filter((answer) => !allCorrect.has(answer.toLowerCase()) && !choices.includes(answer));
  for (const distractor of contextual) {
    if (choices.length >= count) break;
    choices.push(distractor);
  }

  for (let index = 0; choices.length < count && index < distractors.length; index += 1) {
    choices.push(distractors[(question.id * 7 + index * 17) % distractors.length]);
  }

  return choices.sort((left, right) => (left.length + question.id) % 5 - (right.length + question.id) % 5);
}

const smallNumberWords: Record<number, string> = {
  0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten',
  11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen', 16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen',
  20: 'twenty', 30: 'thirty', 40: 'forty', 50: 'fifty', 60: 'sixty', 70: 'seventy', 80: 'eighty', 90: 'ninety'
};

function numberToWords(value: number): string | null {
  if (value < 0 || value > 999) return null;
  if (smallNumberWords[value]) return smallNumberWords[value];
  if (value < 100) return `${smallNumberWords[Math.floor(value / 10) * 10]}-${smallNumberWords[value % 10]}`;
  const remainder = value % 100;
  return `${smallNumberWords[Math.floor(value / 100)]} hundred${remainder ? ` ${numberToWords(remainder)}` : ''}`;
}

/** Keeps every numeric choice in a question visually consistent and removes USCIS parenthetical notation. */
export function displayChoice(question: CivicsQuestion, choice: string) {
  const numericQuestion = /how many|how long|how old|for how many|how many years/i.test(question.prompt);
  const parentheticalNumber = choice.match(/\((\d+)\)/)?.[1];
  const parentheticalWord = choice.match(/\(([A-Za-z-]+)\)/)?.[1];
  const plainNumber = choice.trim().match(/^\d+$/)?.[0];

  if (numericQuestion && (parentheticalNumber || plainNumber || parentheticalWord)) {
    const words = parentheticalWord
      ? parentheticalWord.toLowerCase()
      : numberToWords(Number(parentheticalNumber ?? plainNumber));
    if (words) return `${words[0].toUpperCase()}${words.slice(1)}`;
  }

  // Parenthetical USCIS notation is useful in the source PDF, but it makes one
  // multiple-choice option stand out. Strip it from every displayed choice.
  const parentheticalName = choice.match(/^\(([^)]+)\)\s+(.+)$/);
  if (parentheticalName) {
    const first = parentheticalName[1].trim();
    const last = parentheticalName[2].trim();
    // Historical person answers should display a full recognisable name in choices.
    if (/^[A-Za-z]+$/.test(first) && /^[A-Za-z.'’\-]+$/.test(last)) return `${first} ${last}`;
  }
  const cleaned = choice.replace(/\s*\([^)]*\)/g, '').replace(/\s+/g, ' ').trim();
  return cleaned ? `${cleaned[0].toUpperCase()}${cleaned.slice(1)}` : cleaned;
}
