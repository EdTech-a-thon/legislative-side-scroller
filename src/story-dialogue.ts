/**
 * Ready-to-integrate narrative copy. These exports intentionally contain no
 * game logic, vote changes, question answers, or encounter rules.
 */
export type StoryBeat = { speaker: string; text: string };

export const benVenelloDialogue = {
  opening: [
    { speaker: 'Mr. Ben Venello', text: 'Representative {name}. First day on the floor, first bill in hand. That is a lot of firsts. Good thing you came prepared to learn.' },
    { speaker: 'Mr. Ben Venello', text: 'Your constituents sent you here to get things done. The Connected Classrooms Act is a chance to prove that listening, preparation, and persistence can turn a good idea into public service.' },
    { speaker: 'Mr. Ben Venello', text: 'The draft starts with three goals: reliable school internet, modern and accessible learning tools, and support for teachers who use them. Strong goals are a beginning, not a finished law.' },
    { speaker: 'Mr. Ben Venello', text: 'Talk with colleagues. Listen for what they need to know. Then answer their civics questions carefully. Support is earned; it is never handed out at the door.' },
    { speaker: 'Mr. Ben Venello', text: 'Representative Wren Castellano is nearby. She remembers being new, and she will give you a fair hearing. Start there if you want a steady first conversation.' }
  ] satisfies StoryBeat[],
  returns: {
    beforeFirstVote: 'One clear conversation can open a door. It cannot open every door, so keep moving.',
    afterFirstVote: 'Well done. Notice what changed: you listened, made a case, and knew the civic ground under your feet.',
    afterMiss: 'A no is information, not a locked door. Review the fact, then decide where your next effort can do the most good.',
    committee: 'Committee work is where a broad promise gets its working parts. Read the amendment names closely; later colleagues may ask about them.',
    housePassed: 'The House has spoken. Now the Senate will ask a different set of questions, often more slowly and sometimes more sharply.',
    senate: 'Do not mistake a Hold for a refusal. A Hold tells you what preparation a colleague needs before the real meeting can begin.',
    whiteHouse: 'You earned the walk to the White House. Take a moment in the preparation rooms. The final meeting rewards calm knowledge, not rushing.',
    override: 'An override is not a shortcut around disagreement. It is Congress making a stronger case with a higher level of support.',
    victory: 'You did not carry this bill alone. You learned the facts, heard concerns, and kept working. That is the part worth remembering.'
  }
} as const;

export type LeaderStory = {
  greeting: string;
  prompt: string;
  traitTell: string;
  success: string;
  firstMiss: string;
  locked: string;
  override: string;
};

const leader = (greeting: string, prompt: string, traitTell: string, success: string, firstMiss: string, locked: string, override: string): LeaderStory => ({ greeting, prompt, traitTell, success, firstMiss, locked, override });

export const houseLeaderStories: Record<string, LeaderStory> = {
  'marcus-vance': leader('Representative Vance closes a folder of district letters.', 'Students need dependable tools, but families also need to know what the bill promises. What is your case?', 'A promise without a standard behind it is only a slogan.', 'You defended the foundation. I will bring the coalition in.', 'That answer needs another look. Here is a fresh question; make it count.', 'We have used today\'s two questions. Continue the work with another part of the House.', 'An override requires a clear record. You have one final question from me.'),
  'priya-anand': leader('Representative Anand has color-coded notes beside the bill scroll.', 'I am not signing a slogan. How will this plan work after equipment arrives?', 'Show me the evidence, the timeline, and the part that actually works.', 'Specific, accurate, and useful. That earns my support.', 'That fact does not support the conclusion. Try a new question.', 'This review is complete. Use what you learned before your next meeting.', 'Congress is reviewing the bill again. Bring one accurate answer.'),
  'hank-delgado': leader('Representative Delgado sets down a stack of shop invoices.', 'A principal in my district asks whether this still makes sense on a busy Monday. What do I tell them?', 'The test is simple: would this make sense back home on Monday morning?', 'That would work back home. You have my bloc.', 'Take another pass. A practical answer starts with an accurate fact.', 'We are out of attempts in this office. The House remains open to your work.', 'One more meeting for the override. Keep it plain and prepared.'),
  'gus-whitfield': leader('Representative Whitfield checks a maintenance schedule before looking up.', 'Good intentions are common. What shows this bill is ready for real classrooms?', 'Preparation is the quickest way to make a committee veteran pay attention.', 'You came ready. I respect that.', 'That detail needs checking. A fresh question is waiting.', 'This meeting is concluded. Strengthen the plan in your next conversations.', 'The override gets one final inspection. Answer carefully.'),
  'naomi-cho': leader('Representative Cho turns off a small recorder.', 'A parent sees only the headline. How would you explain why this bill matters?', 'If people cannot understand a bill, they cannot tell whether it helps them.', 'You made the case clearly. I can stand beside that message.', 'Clear communication begins with getting the fact right. Try again.', 'We have finished our two attempts. Keep listening to the public and your colleagues.', 'The message needs one final fact check before an override vote.'),
  'earl-pruitt': leader('Representative Pruitt points to the farthest towns on a district map.', 'My rural districts need more than a city promise. How do you answer that concern?', 'A map looks different when the nearest help is a long drive away.', 'You remembered communities outside the big cities. That matters.', 'That is not the fact I needed. Use the new question to regroup.', 'Our meeting is over for now. Keep reaching the communities that are easy to overlook.', 'One last question for an override. Make the distance between promise and delivery smaller.'),
  'selena-marsh': leader('Representative Marsh rearranges chairs into a wider circle.', 'Different members want different things from this bill. How do you keep them in the same coalition?', 'The strongest coalitions have room for people who arrived by different roads.', 'You know how to bring people in. I will help build the count.', 'Try again with the next question. A coalition needs a shared foundation of facts.', 'We have had our meeting. Keep making room for the next voice.', 'The House is taking another look. Show me one strong answer.'),
  'otis-reinholt': leader('Representative Reinholt opens a worn notebook of taxpayer questions.', 'Why will this bill be worth the public resources it uses?', 'Every good intention needs a number attached to it eventually.', 'The details are sound enough for my vote.', 'The public deserves accuracy. Review that point and try the new question.', 'Our two questions are complete. Take your preparation to the next office.', 'There is one final question before I consider override support.'),
  'ines-falkenrath': leader('Representative Falkenrath keeps a thank-you note from a former teacher on her desk.', 'What do you want a student to feel is different because this bill passed?', 'A first-term Representative should never be embarrassed to care about the purpose.', 'You did not lose sight of why this matters. I am with you.', 'Purpose still needs facts beneath it. Take the fresh question.', 'This conversation has reached its limit. Keep the purpose in view as you continue.', 'One more answer for the override. Show both care and preparation.'),
  'cyrus-boone': leader('Representative Boone taps the House rules binder once.', 'A chair has heard every confident speech. What makes this proposal more than a speech?', 'A committee chair can hear the difference between confidence and preparation.', 'You came with substance. That is enough for me.', 'Confidence is not the same as accuracy. Try the next question.', 'The chair has closed this meeting. Continue building a record elsewhere.', 'The override opens one last procedural window. Use it well.'),
  'alma-judd': leader('Representative Judd folds her debate timer shut.', 'State the strongest reason a colleague should keep listening.', 'I do not need a long speech. I need a clear reason.', 'Clear answer. Clear vote.', 'Not quite. Make the next answer clear and supported.', 'Our two questions are finished. Keep your next case concise.', 'One final question. State the fact, then let it stand.'),
  'dez-okonkwo': leader('Representative Okonkwo pauses to greet a student tour group.', 'How will people know their concerns were part of this bill?', 'People will talk if you give them a reason to feel heard.', 'That is the kind of conversation I can support.', 'That fact needs a second look. Try the fresh question.', 'This meeting is done. Keep inviting people into the conversation.', 'Congress has made room for one final answer.'),
  'fritz-callahan': leader('Representative Callahan moves his coffee away from the bill.', 'Give me the useful version. Why should this move now?', 'Keep it short, keep it useful, and do not waste the good coffee.', 'You made the point. I am in.', 'No fuss: that one was wrong. Take the new question.', 'We are done here. Bring your preparation to someone else.', 'One more question. Short, useful, accurate.'),
  'robin-yates': leader('Representative Yates studies the weather notes beside an orchard calendar.', 'What makes this promise dependable enough to plan around?', 'I am not opposed. I just need a reason to be sure.', 'You gave me one. I will vote yes.', 'That does not give me enough certainty. Try a fresh question.', 'We have used both attempts. Keep checking the ground before you promise a harvest.', 'The override gives one more chance to show this can hold up.'),
  'marv-tillson': leader('Representative Tillson offers a mechanical pencil and a blank margin.', 'Show me the reasoning behind your confidence in this bill.', 'I have heard plenty of promises. Facts are harder to come by.', 'That answer earned my trust.', 'Show your work on the next question.', 'The lesson ends here for now. Keep gathering evidence.', 'One final question. Show your work.'),
  'ada-boykin': leader('Representative Boykin checks the corners of the bill for water damage.', 'Which commitments will still matter when the work gets difficult?', 'If a commitment matters, it should survive a hard question.', 'You held the line. I will support it.', 'That answer did not survive the question. Try the next one.', 'Two attempts are complete. Keep making commitments you can explain.', 'An override tests durable commitments. One question remains.'),
  'silas-kroft': leader('Representative Kroft aligns two pencils exactly with the desk edge.', 'What makes this plan precise enough to trust?', 'Precision is not a trick. It is respect for the people affected.', 'Accurate. You have my vote.', 'The answer is not precise enough. Use the fresh question.', 'This review is closed. Take greater precision into the next meeting.', 'One final measure: answer the override question exactly.'),
  'clem-osgood': leader('Representative Osgood files a public record in a labeled folder.', 'What fact can this House verify before it makes a promise?', 'Talking points drift away. Facts stay put.', 'You knew the fact. That is enough.', 'That claim cannot stand yet. Try the new question.', 'The record shows two attempts. Keep building the case elsewhere.', 'Congress has reopened the record for one final answer.')
};

export const senateHoldDialogue = {
  'eleanor-vance': {
    greeting: 'Senator Vance runs a finger along the archive label on her folder. “I need the fictional Economic Impact Briefing before I begin. A bill should be readable to people today and understandable to people who study its effects later.”',
    clue: '“The archive basement is organized, not mysterious. Look for the records desk and the shelf marked Economic Impact.”',
    resolved: '“You brought the briefing. Good. It does not decide my vote, but it shows you understand that public choices have practical effects. Now we can talk.”'
  },
  'corinne-vasquez': {
    greeting: 'Senator Vasquez closes her phone. “I need help persuading one colleague before I spend my own political capital. Answer one civic question for the conversation, and I will release my Hold.”',
    firstMiss: '“That is not enough to take to another office. You have one fresh question. Make it useful.”',
    resolved: '“That is a fact I can use. Favor returned; the Hold is released.”'
  },
  'del-ashworth': {
    greeting: 'Senator Ashworth nods toward your Notebook. “I do not ask anyone to memorize everything. I do expect them to build a study habit. Come back with 64 entries, or collect five more after this conversation.”',
    progress: '“Your Notebook is growing. Each entry is one more sign that you are preparing rather than guessing.”',
    resolved: '“You did the preparation. Civic knowledge is not a trick, and neither is my Hold. Let us begin.”'
  },
  'priya-okafor-lin': {
    greeting: 'Senator Abbonizio checks three clocks. “My briefcase is missing, and so are the notes I need for this meeting. Find it, or use a Scheduling Favor from the Rotunda. Either way, respect the time it takes to prepare.”',
    clue: '“It was last seen near the leadership corridor and the offices. Please do not turn this into a scavenger hunt for its own sake.”',
    resolved: '“Notes recovered. Schedule protected. Thank you. Now I can give the bill my full attention.”'
  }
} as const;

export const senateStoryBeats = {
  filibusterIntro: [
    { speaker: 'Sen. Walt Iverson', text: 'The Senate has entered a delay. In this simplified classroom model, a filibuster can hold up a bill until enough Senators agree to end debate.' },
    { speaker: 'Sen. Walt Iverson', text: 'That vote is called cloture. Answer at least three of five questions correctly, and your bill can move forward.' }
  ] satisfies StoryBeat[],
  clotureSuccess: [
    { speaker: 'Sen. Bee Nakamura', text: 'Cloture achieved. The Senate has cleared the bill. Next stop: the Oval Office.' },
    { speaker: 'Mr. Ben Venello', text: 'You met a hard procedural moment with preparation. Take that same discipline to the White House.' }
  ] satisfies StoryBeat[],
  gridlock: [
    { speaker: 'Sen. Roland Fitch', text: 'The filibuster held. That is disappointing, not permanent. In this game, you can work through the Rogue Senator Nodes or persuade a difficult leader to break the deadlock.' },
    { speaker: 'Sen. Roland Fitch', text: 'Neither route is magic. Both ask you to keep learning and make a stronger case.' }
  ] satisfies StoryBeat[]
} as const;

export const abnerMendozaPressRoomDialogue = {
  introduction: 'Abner Mendoza, Press Room Correspondent: “I cover the explanation after the announcement. Before I write a headline, tell me what a family should understand about the Connected Classrooms Act.”',
  amendmentAvailable: '“You can point to a committee detail that is actually on your Living Bill Scroll. A clear explanation is stronger than a long one.”',
  noAmendmentYet: '“The bill has a broad purpose, but the committee has not added its working details yet. Say what is true now, and do not pretend the draft promises more than it does.”',
  kaneScout: '“The Anchor likes a statement with edges. He does not need you to agree with him; he needs to hear what you will stand for. Notebook note: Sen. Kane responds best to {trait} communication.”',
  luciaScout: '“Senator Marchetti listens for the purpose beneath the paperwork. She will challenge anything that sounds half-finished. Notebook note: Sen. Marchetti responds best to {trait} communication.”',
  followUp: '“Good reporting asks a second question: How will it work, who will it reach, and what will the public be able to check? Those are fair questions, not traps.”',
  farewell: '“Thanks, Representative. I will tell readers what the bill says, what it still needs, and what you did to answer the questions.”'
} as const;

export const touristDialogue = [
  { id: 'capitol-family', place: 'U.S. Capitol', speaker: 'Mara, visiting with her family', text: '“I thought the Capitol was one room. Our guide explained that the House and Senate are different chambers. That makes the building feel like a civics textbook you can walk through.”' },
  { id: 'monument-sketcher', place: 'Washington Monument', speaker: 'Eli, student sketcher', text: '“I am drawing the Monument from three sides. It looks different from each one, but it is still the same landmark. Maybe public problems are a little like that.”' },
  { id: 'library-reader', place: 'Library of Congress', speaker: 'Nora, young reader', text: '“The Library has so many books that I made a rule: learn one new thing, then ask one better question.”' },
  { id: 'court-visitor', place: 'Supreme Court', speaker: 'Mr. Bell, retired teacher', text: '“Courts and Congress have different jobs. I remind my class that government works best when we learn what each branch is meant to do.”' },
  { id: 'mall-cafe', place: 'National Mall Cafe', speaker: 'Benno, vendor', text: '“People from everywhere stop here. The best conversations start when someone says, ‘Tell me more about that.’”' },
  { id: 'lincoln-visitor', place: 'Lincoln Memorial', speaker: 'Ilse, visitor practicing English', text: '“History is easier to remember when I connect a person, a place, and a question. Today I have all three.”' }
] as const;

export const landmarkText: Record<string, { title: string; body: string; reflection: string }> = {
  capitol: { title: 'U.S. Capitol', body: 'The U.S. Capitol is where Congress meets. The House of Representatives and the Senate both work here, in separate chambers, to debate and pass laws.', reflection: 'Look for how a bill must gain support in both chambers before it can go to the President.' },
  'white-house': { title: 'The White House', body: 'The White House is the home and workplace of the President. In the game, the final meeting happens here after Congress has passed the fictional Connected Classrooms Act.', reflection: 'The President can sign a bill or veto it. Congress may respond to a veto by seeking an override.' },
  monument: { title: 'Washington Monument', body: 'The Washington Monument honors George Washington, the first President of the United States. Its place on the National Mall connects visitors to early U.S. history.', reflection: 'At night, visitors may discover an optional history encounter here. It never changes the main campaign route.' },
  reflecting: { title: 'Reflecting Pool', body: 'The Reflecting Pool stretches between the Washington Monument and Lincoln Memorial. It creates space to pause and consider the civic ideals represented by both landmarks.', reflection: 'Reflection is part of civic learning: notice the connection between a place, its history, and the people who visit it.' },
  lincoln: { title: 'Lincoln Memorial', body: 'The Lincoln Memorial honors Abraham Lincoln, the 16th President. It is a place for reflection on leadership, equality, and the unfinished work of civic ideals.', reflection: 'Read the memorial as a history landmark, not as a shortcut to an answer or a vote.' },
  smithsonian: { title: 'Smithsonian Museums', body: 'Smithsonian museums share American history, science, art, and culture through public learning spaces on and around the National Mall.', reflection: 'Public museums make it possible for people to learn from evidence, objects, and many different stories.' },
  library: { title: 'Library of Congress', body: 'The Library of Congress preserves books, maps, recordings, and other materials for research. It reminds us that public decisions benefit from evidence and careful study.', reflection: 'Research can help a Representative ask better questions before making a claim.' },
  court: { title: 'Supreme Court', body: 'The Supreme Court is the highest court in the federal judiciary. Courts interpret laws and decide legal cases; they do not write bills or cast congressional votes.', reflection: 'Notice the different responsibilities of the legislative and judicial branches.' },
  cafe: { title: 'Mall Cafe & Diner', body: 'A cafe near the Mall brings together visitors, staffers, and neighbors for everyday conversations about the city and its public life.', reflection: 'Respectful conversation is one way people can listen to perspectives beyond their own.' },
  press: { title: 'Press Row', body: 'Journalists report on public decisions so people can follow what their government is doing and ask informed questions.', reflection: 'A free press helps connect public information with the people affected by it.' },
  duncan: { title: 'Duncan Johnson', body: 'Duncan Johnson is a special visitor who believes civic games can help students learn by doing, discussing, and trying again.', reflection: 'Learning through play can still be serious preparation for public life.' },
  tourists: { title: 'Tourists & Locals', body: 'Visitors and Washington residents bring many perspectives to the National Mall, a shared space for history, learning, and public life.', reflection: 'Civic places belong to everyone, and each person arrives with something to learn and share.' },
  mall: { title: 'National Mall', body: 'The National Mall is a public space with museums, memorials, and paths between major civic landmarks. People visit to learn, reflect, and take part in public life.', reflection: 'Civic learning can happen in formal institutions and in respectful everyday conversations.' }
};

export const committeeDialogue = {
  arrival: 'Committee Clerk Hiroshi Tanaka: “Welcome to markup. This is a simplified classroom version of committee work: members study the bill, ask questions, and decide whether its details are ready to move forward.”',
  priyaApproval: 'Rep. Anand: “The Reliable Connections Standard gives the bill a concrete expectation: dependable classroom internet and a basic backup plan. That is a useful detail, not an empty promise.”',
  gusApproval: 'Rep. Whitfield: “The Classroom Tools Refresh Fund recognizes that equipment does not stay modern forever. A review cycle is how a school plans instead of panics.”',
  wrenApproval: 'Rep. Castellano: “The Teacher Ready Grant makes room for time and training. A new tool helps most when educators can use it with confidence.”',
  naomiApproval: 'Rep. Cho: “The Local Learning and Privacy Plan explains both local flexibility and student information protection in plain language. Families deserve to know both.”',
  hinaApproval: 'Rep. Hina Khan: “Access for Every Learner makes accessibility visible in the bill. Students who need compatible tools should not be an afterthought.”',
  rejection: 'Committee member: “I cannot approve this detail today. Keep going; the committee has other members and the bill can still leave this room with useful feedback.”',
  otisReady: 'Rep. Reinholt: “Show me any Rotunda tool you brought. I am not taking it. I want to know whether you prepared before you asked the public to trust a plan.”',
  otisReadySuccess: 'Rep. Reinholt: “Prepared, not flashy. That is enough to approve the readiness check.”',
  otisReadyFailure: 'Rep. Reinholt: “No preparation tool today. That is not a judgment on you, but I cannot approve this check.”',
  booneHold: 'Rep. Boone: “Before I move this amendment, I need the Clerk to confirm one procedural point. Help Clerk Tanaka with the civic question, then return.”',
  clerkSuccess: 'Clerk Tanaka: “Confirmed. The record is complete. Representative Boone can now act on the amendment.”',
  pass: 'Committee Clerk Hiroshi Tanaka: “Four approvals. In this classroom model, the markup passes and the bill returns to the House with stronger details.”',
  incomplete: 'Committee Clerk Hiroshi Tanaka: “The committee did not reach four approvals. The bill returns to the House with the details it did secure and more coalition work ahead.”'
} as const;

export const ovalOfficeDialogue = {
  hallway: 'White House staffer: “The Oval Office door is ahead. You may review your Notebook, Living Bill Scroll, and eligible items here. Once you enter, the live questions begin.”',
  briefingSupportive: 'Presidential briefer: “The President has read the bill twice and put a star beside the committee details. He seems open to the meeting, but he will still expect you to know your civics.”',
  briefingSkeptical: 'Presidential briefer: “The President has been tapping his colorful tie against the briefing folder. That means he has questions. It also means he is listening.”',
  prep: 'Preparation aide: “The final format is clear: a supportive meeting uses multiple-choice questions, while a skeptical meeting uses timed written answers. The meeting\'s tone is not a judgment of you.”',
  suttonArrival: 'Sutton DiSantis: “Dad says the Oval Office is serious, but he wears rainbow socks to serious meetings. So it cannot be that serious.”',
  presidentArrival: 'President Anthony J. DiSantis: “Representative! I read your bill, circled three parts, and somehow found coffee on page seven. Let us see whether the civics are as sturdy as the stapling.”',
  allyStart: 'President DiSantis: “Good news: I like where this is headed. Better news: you need twelve strong answers. Welcome to the Oval Office pop quiz.”',
  oppositionStart: 'President DiSantis: “I am not sold on this bill yet. But a Representative who can think clearly under pressure deserves a fair hearing. Six answers. Thirty seconds each. Ready?”',
  allySuccess: 'President DiSantis: “Twelve correct. That is the kind of preparation that makes a signing pen feel useful. Consider this bill signed.”',
  oppositionSuccess: 'President DiSantis: “You made the case. The veto pen can stay capped today. Let us get this signed.”',
  veto: 'President DiSantis: “Not enough to earn my signature today. That is not the end of the argument. If you can build the votes, bring this bill back with an override.”',
  overrideSuccess: 'President DiSantis: “Congress met the higher threshold. The Connected Classrooms Act becomes law through the override process. That is a serious civic step, and you earned it through persistence.”',
  notebookRoute: 'President DiSantis: “A complete study record tells me you did more than chase a result. You learned the material. Let us sign this fictional bill into law.”',
  signing: 'Sutton DiSantis: “I knew you could do it! Dad only uses the big pen when he is really impressed.”',
  ending: 'Mr. Ben Venello: “Representative {name}, the Connected Classrooms Act is now law in this game\'s fictional Washington. Remember how it got here: facts, listening, revision, and people willing to keep working.”',
  continueExploring: 'Mr. Ben Venello: “The bill is law, but learning does not have to stop. Explore Washington, complete your Notebook, or return when you are ready to lock in your final score.”'
} as const;
