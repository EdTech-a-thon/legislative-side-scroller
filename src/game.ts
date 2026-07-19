export type Mode = 'multiple' | 'short' | 'matrix';

export type Encounter = {
  id: string;
  name: string;
  title: string;
  state: string;
  x: number;
  color: string;
  portrait: string;
  polarization: number;
  votes: number;
  mode: Mode;
  greeting: string;
  questionId: number;
  question: string;
  answers: string[];
  choices?: string[];
  hint?: string;
  success: string;
  note: { title: string; text: string };
};

export const encounters: Encounter[] = [
  {
    id: 'chen', name: 'Eleanor Chen', title: 'The Archivist', state: 'South Dakota', x: 560,
    color: '#65c7c4', portrait: 'EC', polarization: 55, votes: 28, mode: 'multiple', questionId: 24,
    greeting: 'Your bill needs a solid count before leadership will take notice. Show me you understand the chamber you are trying to persuade.',
    question: 'How many voting members are in the House of Representatives?', answers: ['435', 'four hundred thirty-five', 'four hundred thirty five'],
    choices: ['100', '435', '538'], success: 'Correct. I will release my hold and bring 28 members to your coalition.',
    note: { title: 'The House', text: 'The House has 435 voting members. A bill usually needs a simple majority, 218 votes, to pass.' }
  },
  {
    id: 'tanaka', name: 'Hiroshi Tanaka', title: 'Constitutionalist', state: 'New York', x: 960,
    color: '#f0b75d', portrait: 'HT', polarization: 48, votes: 35, mode: 'multiple', questionId: 2,
    greeting: 'School repairs matter, but every public program needs a legal foundation. Start at the top.',
    question: 'What is the supreme law of the land?', answers: ['constitution', 'the constitution', 'u.s. constitution', 'us constitution'],
    choices: ['The Declaration of Independence', 'The U.S. Constitution', 'The Federalist Papers'], success: 'That foundation is sound. You have our 35 votes.',
    note: { title: 'Constitution', text: 'The U.S. Constitution is the supreme law of the land. It establishes the federal government and its powers.' }
  },
  {
    id: 'sterling', name: 'Sarah Sterling', title: 'Bipartisan Catalyst', state: 'Virginia', x: 1390,
    color: '#e96a59', portrait: 'SS', polarization: 62, votes: 40, mode: 'short', questionId: 17,
    greeting: 'The Connected Schools Act repairs aging buildings and expands internet access. My coalition likes practical work. Give me a clean answer and we will sign on.',
    question: 'The President is in charge of which branch of government?', answers: ['executive', 'executive branch', 'the executive branch'], hint: 'Hint: This branch enforces laws and includes the Cabinet.',
    success: 'Clean answer. Solid execution. All 40 members of my coalition are with you.',
    note: { title: 'Coalition', text: 'A coalition is a group that works together toward a shared goal, even when its members disagree on other issues.' }
  },
  {
    id: 'garcia', name: 'Elena Garcia', title: 'Local Control Caucus', state: 'Texas', x: 1830,
    color: '#9b7bd4', portrait: 'EG', polarization: 95, votes: 42, mode: 'matrix', questionId: 1,
    greeting: 'Federal money for schools deserves scrutiny. If you know what kind of government you serve, my caucus will consider your compromise.',
    question: 'What is the form of government of the United States?',
    answers: ['republic', 'constitution-based federal republic', 'constitution based federal republic', 'representative democracy'],
    choices: ['Direct monarchy', 'Confederation', 'Republic', 'Parliamentary monarchy', 'Military government', 'Unitary state', 'Absolute democracy', 'Constitution-based federal republic', 'Theocracy', 'Representative democracy', 'Oligarchy', 'Colonial government'],
    success: 'You found the precise answer in a crowded field. My 42 members will support the bill.',
    note: { title: 'Representative Democracy', text: 'In a representative democracy, citizens elect people to make laws and govern on their behalf.' }
  },
  {
    id: 'okafor', name: 'Marcus Okafor', title: 'Progressive Coalition', state: 'California', x: 2270,
    color: '#66a9e8', portrait: 'MO', polarization: 5, votes: 15, mode: 'matrix', questionId: 83,
    greeting: 'Your compromise cannot leave students behind. Prove you know how difficult ideas won support for the Constitution, and my coalition will improve this bill in committee.',
    question: 'Name one writer of the Federalist Papers.',
    answers: ['james madison', 'madison', 'alexander hamilton', 'hamilton', 'john jay', 'jay', 'publius'],
    choices: ['Thomas Jefferson', 'John Adams', 'Benjamin Franklin', 'George Washington', 'James Madison', 'Alexander Hamilton', 'John Jay', 'Publius', 'Patrick Henry', 'John Hancock', 'Samuel Adams', 'James Monroe'],
    success: 'Accurate. We will strengthen the protections and add our 15 votes. Friendly markup secured.',
    note: { title: 'Committee Markup', text: 'During markup, a committee debates, changes, and votes on a bill before sending it to the full chamber.' }
  },
  {
    id: 'banks', name: 'Malik Banks', title: 'Rules Whip', state: 'Georgia', x: 2700,
    color: '#8fca68', portrait: 'MB', polarization: 59, votes: 30, mode: 'short', questionId: 7,
    greeting: 'You are close. The Rules Committee can bring your bill to the floor, but details count in this building.',
    question: 'How many amendments does the U.S. Constitution have?', answers: ['27', 'twenty-seven', 'twenty seven'], hint: 'Hint: It is more than 25 and fewer than 30.',
    success: 'Twenty-seven. The rule is granted, and 30 more members commit to your bill.',
    note: { title: 'Floor Vote', text: 'After committee work, House leaders schedule a bill for debate and a vote by the full chamber.' }
  },
  {
    id: 'patel', name: 'Anika Patel', title: 'Freshman Delegation', state: 'Indiana', x: 3100,
    color: '#e58fc0', portrait: 'AP', polarization: 48, votes: 28, mode: 'multiple', questionId: 16,
    greeting: 'The freshman delegation wants proof that the bill respects every part of government. One final answer can put you over the line.',
    question: 'What are the three branches of government?',
    answers: ['legislative executive and judicial', 'legislative, executive, and judicial', 'congress president and the courts'],
    choices: ['Federal, state, and local', 'House, Senate, and Cabinet', 'Legislative, executive, and judicial'],
    success: 'Exactly right. Our delegation votes yes. Take the Connected Schools Act to the floor!',
    note: { title: 'Checks and Balances', text: 'The legislative, executive, and judicial branches share power so that no one part becomes too powerful.' }
  }
];

export const requiredVotes = 218;
export const worldWidth = 3500;

export function normalizeAnswer(value: string) {
  return value.toLowerCase().replace(/u\.s\./g, 'us').replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
}

export function isCorrect(value: string, answers: string[]) {
  const normalized = normalizeAnswer(value);
  return answers.some((answer) => normalizeAnswer(answer) === normalized);
}
