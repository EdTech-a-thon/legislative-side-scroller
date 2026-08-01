<script lang="ts">
  import { onMount } from 'svelte';
  import EncounterPanel from './EncounterPanel.svelte';
  import CommitteeDungeon from './CommitteeDungeon.svelte';
  import CommitteeAmbush from './CommitteeAmbush.svelte';
  import ScoutTraining from './ScoutTraining.svelte';
  import BillScroll from './BillScroll.svelte';
  import HousePassage from './HousePassage.svelte';
   import BenTutorial from './BenTutorial.svelte';
   import FilibusterIntro from './FilibusterIntro.svelte';
   import FilibusterGauntlet from './FilibusterGauntlet.svelte';
  import SenateHold from './SenateHold.svelte';
  import ClotureTransition from './ClotureTransition.svelte';
  import WhiteHouse from './WhiteHouse.svelte';
  import OvalOffice from './OvalOffice.svelte';
  import BillCelebration from './BillCelebration.svelte';
  import VetoOverride from './VetoOverride.svelte';
  import OverrideFinale from './OverrideFinale.svelte';
  import DcMap from './DcMap.svelte';
  import CompletionCertificate from './CompletionCertificate.svelte';
  import CharacterCreation from './CharacterCreation.svelte';
  import RepresentativeLookup from './RepresentativeLookup.svelte';
  import ScoutLeader from './ScoutLeader.svelte';
  import AssetCredits from './AssetCredits.svelte';
  import TouristEncounters from './TouristEncounters.svelte';
  import DcNightAlternates from './DcNightAlternates.svelte';
  import WashingtonGhost from './WashingtonGhost.svelte';
  import LincolnGhost from './LincolnGhost.svelte';
  import StudentProfile from './StudentProfile.svelte';
  import RotundaHub from './RotundaHub.svelte';
  import RotundaMap from './RotundaMap.svelte';
  import SenateMap from './SenateMap.svelte';
  import MapRoom from './MapRoom.svelte';
  import ArchiveBasement from './ArchiveBasement.svelte';
  import LeadershipOffice from './LeadershipOffice.svelte';
  import SubwayOvertimeMap from './SubwayOvertimeMap.svelte';
   import DcOverworld from './DcOverworld.svelte';
   import LandmarkCard from './LandmarkCard.svelte';
  import RotundaShop, { type Inventory, type PowerUpId } from './RotundaShop.svelte';
  import Notebook from './Notebook.svelte';
  import TitleScreen from './TitleScreen.svelte';
  import World from './World.svelte';
  import { civicsQuestionById, civicsStudyNotes, type CivicsCategory } from './civics-questions';
  import { isSupportedDynamicQuestion } from './jurisdictions';
  import { validateSupportedDynamicAnswer } from './civics-validation';
import { applyHouseVoteLedger, encounterModeFor, encounters, generateHouseVoteLedger, houseQuestionIds, requiredVotes, senateEncounters, senateQuestionIds, type Encounter, type HouseVoteLedger } from './game';
  import { oppositeTrait, traitPairs, type Trait } from './npc-dialogue';

  type Save = {
    version: 28; playerX: number; playerY: number; votes: number; influence: number; completed: string[]; locked: string[];
      committeeStatus: string; committeeAmendments: string[]; encounteredQuestionIds: number[]; correctQuestionIds: number[]; notebookQuestionIds: number[]; notebookSources: Record<number, string>; touristClaims: string[]; delNotebookCountAtContact: number | null; committeeQuestionIds: number[]; filibusterQuestionIds: number[]; filibusterIntroSeen?: boolean; overtimeQuestionIds: number[]; ovalOfficeQuestionIds: number[]; attempts: Record<string, number>; rapportScores: Record<string, number>; leaderTraits: Record<string, Trait>; stanceTags: Trait[]; scoutedLeaders: string[]; archiveBriefingRecovered: boolean; priyaBriefcaseRecovered: boolean; abbonizioOfficeClosed?: boolean; houseLedger: HouseVoteLedger; inventory: Inventory; housePassageSeen: boolean; benTutorialComplete: boolean; senateVotes: number; senateCompleted: string[]; senateLocked: string[]; senateAttempts: Record<string, number>; filibusterResolved: boolean; resolvedHolds: string[]; gridlock: boolean; rogueNodes: number[]; bossAttempts: string[]; whiteHouseUnlocked: boolean; presidentAlignment: 'ally' | 'opposition'; billBecameLaw: boolean; scoreLocked: boolean; overrideActive: boolean; jurisdictionCode: string; city: string; minutes: number; completionMinutes: number | null; ovalOfficeAccuracyBonus: number; washingtonGhostComplete: boolean; lincolnGhostComplete: boolean; ghostWhispers: string[]; seenVocabulary: string[]; vocabularyEasterEggSeen: boolean; playerName: string; playerFirstName: string; playerLastName: string; playerPresentation: 'female' | 'male'; playerSkinTone: string; playerParty: 'D' | 'R'; completionRoute: 'signed' | 'override'; duncanFound: boolean;
  };
   const SAVE_KEY = 'capitol-hill-crawler-save-v28';
  const CERTIFICATE_KEY = 'capitol-hill-crawler-last-completion-v1';
  type CompletionRecord = { playerName: string; route: 'signed' | 'override'; houseVotes: number; senateVotes: number; notebookEntries: number; influence: number; score: number };

  let screen = $state<'title' | 'game' | 'rotunda' | 'senate' | 'archive' | 'office' | 'subway' | 'whiteHouse' | 'dc'>('title');
  let playerX = $state(3000);
  let playerY = $state(900);
  let votes = $state(0);
  let influence = $state(0);
  let completed = $state<string[]>([]);
  let locked = $state<string[]>([]);
  let committeeStatus = $state('Not started');
  let committeeAmendments = $state<string[]>([]);
  let committeeOpen = $state(false);
  let committeeAmbushOpen = $state(false);
  let committeeAmbushQuestionId = $state<number | null>(null);
  let committeeEased = $state(false);
  let billScrollOpen = $state(false);
  let housePassageSeen = $state(false);
  let housePassageOpen = $state(false);
  let benTutorialComplete = $state(false);
  let benTutorialOpen = $state(false);
  let senateVotes = $state(0);
  let senatePlayerX = $state(3100);
  let senatePlayerY = $state(920);
  let senateCompleted = $state<string[]>([]);
  let senateLocked = $state<string[]>([]);
  let senateAttempts = $state<Record<string, number>>({});
   let filibusterOpen = $state(false);
   let filibusterIntroSeen = $state(false);
  let filibusterResolved = $state(false);
  let gridlock = $state(false);
  let rogueNodes = $state<number[]>([]);
  let bossAttempts = $state<string[]>([]);
  let clotureOpen = $state(false);
  let whiteHouseUnlocked = $state(false);
  let ovalOfficeOpen = $state(false);
  let presidentAlignment = $state<'ally' | 'opposition'>(Math.random() < .5 ? 'ally' : 'opposition');
  let billBecameLaw = $state(false);
  let scoreLocked = $state(false);
  let overrideActive = $state(false);
  let celebrationOpen = $state(false);
  let overrideOpen = $state(false);
  let overrideFinaleOpen = $state(false);
  let jurisdictionCode = $state('');
  let city = $state('');
  let profileOpen = $state(false);
  let nightAlternatesOpen = $state(false);
  let activeRapportBonus = $state(0);
  let washingtonGhostOpen = $state(false);
  let lincolnGhostOpen = $state(false);
  let washingtonGhostComplete = $state(false);
  let lincolnGhostComplete = $state(false);
  let ghostWhispers = $state<string[]>([]);
  let seenVocabulary = $state<string[]>([]);
  let vocabularyEasterEggSeen = $state(false);
  let playerName = $state('Representative');
  let playerFirstName = $state('');
  let playerLastName = $state('');
  let playerPresentation = $state<'female' | 'male'>('female');
  let playerSkinTone = $state('#d8a57c');
  let playerParty = $state<'D' | 'R'>('D');
  let characterCreationOpen = $state(false);
  let representativeLookupOpen = $state(false);
  let assetCreditsOpen = $state(false);
  let mapRoom = $state<{ roomId: 'west-cloakroom' | 'east-cloakroom' | 'west-caucus' | 'east-caucus'; title: string; description: string; source: string } | null>(null);
  let houseInteractionBlocked = $state(false);
  let rapportScores = $state<Record<string, number>>({});
  let leaderTraits = $state<Record<string, Trait>>({});
  let stanceTags = $state<Trait[]>([]);
  let scoutedLeaders = $state<string[]>([]);
  let scoutLeaderId = $state<'augustus-kane' | 'lucia-marchetti' | null>(null);
  let scoutTrainingOpen = $state(false);
  let scoutTrainingSeen = $state(false);
  let scoutTargetId = $state<string | null>(null);
  let houseScoutTargets = $state<string[]>([]);
  let wrenWasFirstMeeting = $state(false);
  let touristClaims = $state<string[]>([]);
   let touristPanelOpen = $state(false);
   let landmarkCard = $state<string | null>(null);
  let houseContactOpen = $state(false);
  let archiveBriefingRecovered = $state(false);
  let priyaBriefcaseRecovered = $state(false);
  let abbonizioOfficeClosed = $state(false);
  let delNotebookCountAtContact = $state<number | null>(null);
  let completionRoute = $state<'signed' | 'override'>('signed');
  let certificateOpen = $state(false);
  let duncanFound = $state(false);
  let completionMinutes = $state<number | null>(null);
  let ovalOfficeAccuracyBonus = $state(0);
  let lastCompletion = $state<CompletionRecord | null>(null);
  let resolvedHolds = $state<string[]>([]);
  let activeHoldId = $state<string | null>(null);
  let activeLevel = $state<'house' | 'senate'>('house');
  let shopOpen = $state(false);
  let notebookTab = $state<'entries' | 'vocabulary'>('entries');
  let inventory = $state<Inventory>({ coffee: 0, memo: 0, hearingAid: 0, superPac: 0 });
   let active = $state<Encounter | null>(null);
   let activeQuestionId = $state<number | null>(null);
   let activeQuestionData = $state<import('./civics-questions').CivicsQuestion | null>(null);
  let attempts = $state<Record<string, number>>({});
  let encounteredQuestionIds = $state<number[]>([]);
  let correctQuestionIds = $state<number[]>([]);
  let notebookQuestionIds = $state<number[]>([]);
  let notebookSources = $state<Record<number, string>>({});
  let committeeQuestionIds = $state<number[]>([]);
  let filibusterQuestionIds = $state<number[]>([]);
  let overtimeQuestionIds = $state<number[]>([]);
  let ovalOfficeQuestionIds = $state<number[]>([]);
  let minutes = $state(8 * 60);
  let houseLedger = $state<HouseVoteLedger>(generateHouseVoteLedger());
  let notebookOpen = $state(false);
  let announcement = $state('');
  let hasSave = $state(false);
  let showBrief = $state(true);

  let notes = $derived(civicsQuestionIds(notebookQuestionIds).map((id) => {
    const question = civicsQuestionById.get(id)!;
    return { id, category: question.category as CivicsCategory, title: question.prompt, source: notebookSources[id] ?? 'Study find', text: `Accepted answers: ${question.acceptedAnswers.join('; ')}${civicsStudyNotes[id] ? ` Study note: ${civicsStudyNotes[id]}` : ''}` };
  }));
  let progress = $derived(Math.min(100, Math.round(votes / requiredVotes * 100)));
   let activeQuestion = $derived(activeQuestionData ?? (activeQuestionId === null ? null : civicsQuestionById.get(activeQuestionId) ?? null));
  let houseEncounters = $derived(applyHouseVoteLedger(houseLedger));
  function partyAdjustedEncounter(encounter: Encounter) {
    const party = encounter.polarization < 50 ? 'D' : encounter.polarization > 50 ? 'R' : 'I';
    const mode = encounterModeFor(encounter.polarization, playerParty);
    return { ...encounter, affiliation: `${party}-${encounter.affiliation.split('-')[1]}`, mode };
  }
  let alignedHouseEncounters = $derived(houseEncounters.map(partyAdjustedEncounter));
  let alignedSenateEncounters = $derived(senateEncounters.map(partyAdjustedEncounter));
  let committeeRapport = $derived(
    completed.length
      ? Math.round(completed.reduce((total, id) => total + (rapportScores[id] ?? 50), 0) / completed.length)
      : 50
  );
  let speedBonus = $derived(completionMinutes === null ? 0 : completionMinutes <= 4320 ? 2000 : completionMinutes <= 5760 ? 1000 : 0);
  let correctAnswerPoints = $derived(correctQuestionIds.length * 25);
  let notebookEntryPoints = $derived(notes.length * 10);
  let finalScore = $derived(2000 + correctAnswerPoints + notebookEntryPoints + ovalOfficeAccuracyBonus + (notes.length === 128 ? 2000 : 0) + speedBonus + Math.min(3200, influence * 3));

  onMount(() => {
    hasSave = Boolean(localStorage.getItem(SAVE_KEY));
    try { lastCompletion = JSON.parse(localStorage.getItem(CERTIFICATE_KEY) ?? 'null') as CompletionRecord | null; } catch { lastCompletion = null; }
  });

  function save() {
    const data: Save = { version: 28, playerX, playerY, votes, influence, completed, locked, committeeStatus, committeeAmendments, encounteredQuestionIds, correctQuestionIds, notebookQuestionIds, notebookSources, touristClaims, delNotebookCountAtContact, committeeQuestionIds, filibusterQuestionIds, filibusterIntroSeen, overtimeQuestionIds, ovalOfficeQuestionIds, attempts, rapportScores, leaderTraits, stanceTags, scoutedLeaders, archiveBriefingRecovered, priyaBriefcaseRecovered, abbonizioOfficeClosed, houseLedger, inventory, housePassageSeen, benTutorialComplete, senateVotes, senateCompleted, senateLocked, senateAttempts, filibusterResolved, resolvedHolds, gridlock, rogueNodes, bossAttempts, whiteHouseUnlocked, presidentAlignment, billBecameLaw, scoreLocked, overrideActive, jurisdictionCode, city, minutes, completionMinutes, ovalOfficeAccuracyBonus, washingtonGhostComplete, lincolnGhostComplete, ghostWhispers, seenVocabulary, vocabularyEasterEggSeen, playerName, playerFirstName, playerLastName, playerPresentation, playerSkinTone, playerParty, completionRoute, duncanFound };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    hasSave = true;
  }

  function newGame() {
    playerX = 3000; playerY = 900; votes = 0; influence = 0; completed = []; locked = []; committeeStatus = 'Not started'; committeeAmendments = []; committeeOpen = false; committeeAmbushOpen = false; committeeAmbushQuestionId = null; committeeEased = false; inventory = { coffee: 0, memo: 0, hearingAid: 0, superPac: 0 }; houseLedger = generateHouseVoteLedger(); housePassageSeen = false; housePassageOpen = false; benTutorialComplete = false; benTutorialOpen = false; senateVotes = 0; senateCompleted = []; senateLocked = []; senateAttempts = {}; filibusterIntroSeen = false; filibusterResolved = false; resolvedHolds = []; gridlock = false; rogueNodes = []; bossAttempts = []; whiteHouseUnlocked = false; presidentAlignment = Math.random() < .5 ? 'ally' : 'opposition'; billBecameLaw = false; scoreLocked = false; overrideActive = false; jurisdictionCode = ''; city = ''; profileOpen = true;
    attempts = {}; rapportScores = {}; leaderTraits = {}; stanceTags = []; scoutedLeaders = []; touristClaims = []; archiveBriefingRecovered = false; priyaBriefcaseRecovered = false; abbonizioOfficeClosed = false; encounteredQuestionIds = []; correctQuestionIds = []; notebookQuestionIds = []; notebookSources = {}; committeeQuestionIds = []; filibusterQuestionIds = []; overtimeQuestionIds = []; ovalOfficeQuestionIds = []; activeQuestionId = null; minutes = 8 * 60; completionMinutes = null; ovalOfficeAccuracyBonus = 0; washingtonGhostComplete = false; lincolnGhostComplete = false; ghostWhispers = []; seenVocabulary = []; vocabularyEasterEggSeen = false; playerName = 'Representative'; playerFirstName = ''; playerLastName = ''; playerParty = 'D'; completionRoute = 'signed'; duncanFound = false;
    screen = 'rotunda'; showBrief = false; characterCreationOpen = true; save();
  }

  function continueGame() {
    try {
      const data = JSON.parse(localStorage.getItem(SAVE_KEY) ?? '') as Save;
      if (data.version !== 28) return newGame();
      ({ playerX, playerY, votes, influence, completed, locked, committeeStatus, committeeAmendments, encounteredQuestionIds, correctQuestionIds, notebookQuestionIds, notebookSources, touristClaims, delNotebookCountAtContact, committeeQuestionIds, filibusterQuestionIds, overtimeQuestionIds, ovalOfficeQuestionIds, attempts, rapportScores, leaderTraits, stanceTags, scoutedLeaders, archiveBriefingRecovered, priyaBriefcaseRecovered, houseLedger, inventory, housePassageSeen, benTutorialComplete, senateVotes, senateCompleted, senateLocked, senateAttempts, filibusterResolved, resolvedHolds, gridlock, rogueNodes, bossAttempts, whiteHouseUnlocked, presidentAlignment, billBecameLaw, scoreLocked, overrideActive, jurisdictionCode, city, minutes, completionMinutes, ovalOfficeAccuracyBonus, washingtonGhostComplete, lincolnGhostComplete, ghostWhispers, seenVocabulary, vocabularyEasterEggSeen, playerName, playerFirstName, playerLastName, playerPresentation, playerSkinTone, playerParty, completionRoute, duncanFound } = data);
      abbonizioOfficeClosed = data.abbonizioOfficeClosed ?? false;
      filibusterIntroSeen = data.filibusterIntroSeen ?? false;
      committeeOpen = false;
      committeeAmbushOpen = committeeStatus === 'Markup interrupted' && committeeQuestionIds[0] !== undefined;
      committeeAmbushQuestionId = committeeAmbushOpen ? committeeQuestionIds[0] : null;
      committeeEased = false;
      screen = 'rotunda';
      showBrief = false;
    } catch { newGame(); }
  }

  function civicsQuestionIds(ids: number[]) {
    return ids.filter((id) => civicsQuestionById.has(id));
  }

  function selectQuestion(encounter: Encounter) {
    const pool = activeLevel === 'house' ? houseQuestionIds(completed.length) : senateQuestionIds(senateVotes >= 50);
    const choices = pool.filter((id) => !encounteredQuestionIds.includes(id) && isEligibleLiveQuestion(id));
    if (!choices.length) return null;
    const offset = [...encounter.id].reduce((total, character) => total + character.charCodeAt(0), 0) + encounteredQuestionIds.length;
    return choices[offset % choices.length];
  }

  function isEligibleLiveQuestion(id: number) {
    const question = civicsQuestionById.get(id);
    return Boolean(question && (!question.dynamic || isSupportedDynamicQuestion(id, jurisdictionCode)));
  }

  function reserveQuestions(pool: number[], count: number) {
    const available = pool.filter((id) => !encounteredQuestionIds.includes(id) && isEligibleLiveQuestion(id));
    const reserved = available.slice(0, count);
    encounteredQuestionIds = [...encounteredQuestionIds, ...reserved];
    return reserved;
  }

  function beginEncounter(encounter: Encounter) {
    if (screen === 'game') activeLevel = 'house';
    if (encounter.id === 'del-ashworth' && delNotebookCountAtContact === null) delNotebookCountAtContact = notebookQuestionIds.length;
    if (activeLevel === 'senate' && isHoldLeader(encounter.id) && !resolvedHolds.includes(encounter.id)) {
      activeHoldId = encounter.id;
      return;
    }
    const questionId = selectQuestion(encounter);
    if (questionId === null) {
      announcement = 'No eligible question remains in this test save. Start a new campaign to refresh the study pool.';
      return;
    }
    if (questionId === 29) { active = encounter; activeQuestionId = questionId; activeQuestionData = civicsQuestionById.get(questionId) ?? null; representativeLookupOpen = true; return; }
    encounteredQuestionIds = [...encounteredQuestionIds, questionId];
    ensureLeaderTrait(encounter.id);
    activeQuestionId = questionId;
    activeQuestionData = civicsQuestionById.get(questionId) ?? null;
    active = partyAdjustedEncounter(encounter);
  }
  function startHouseEncounter(encounter: Encounter) {
    // Keep the House path independent from Senate Holds, Overtime, and any stale
    // active-level state saved during a previous map transition.
    activeLevel = 'house';
    if (encounter.id === 'wren-castellano' && completed.length === 0 && !scoutTrainingSeen) wrenWasFirstMeeting = true;
    active = null;
    activeQuestionId = null;
    activeQuestionData = null;
    const pool = houseQuestionIds(completed.length);
    const starterChoices = pool.filter((id) => !encounteredQuestionIds.includes(id) && isEligibleLiveQuestion(id));
    // Never block a House leader because a prior playtest reserved every starter question.
    // A clean new campaign still begins with 1-16; this is only an exhausted-pool safety path.
    const expandedChoices = houseQuestionIds(4).filter((id) => !encounteredQuestionIds.includes(id) && isEligibleLiveQuestion(id));
    const choices = starterChoices.length ? starterChoices : expandedChoices;
    if (!choices.length) {
      announcement = 'The current House study pool is empty. Start a new campaign to reset this playtest save.';
      return;
    }
    const offset = [...encounter.id].reduce((total, character) => total + character.charCodeAt(0), 0) + encounteredQuestionIds.length;
    const selectedQuestionId = choices[offset % choices.length];
    // Reserve when the encounter opens. This prevents repeats even if the player leaves
    // the dialog without answering or returns to the same leader immediately.
    encounteredQuestionIds = [...encounteredQuestionIds, selectedQuestionId];
    ensureLeaderTrait(encounter.id);
    activeQuestionId = selectedQuestionId;
    activeQuestionData = civicsQuestionById.get(selectedQuestionId) ?? null;
    active = partyAdjustedEncounter(encounter);
    houseContactOpen = false;
    announcement = `Opening ${encounter.name}'s encounter with Question ${selectedQuestionId}.`;
  }
  function updateRapport(choice: Trait | 'neutral') {
    if (!active) return { rapport: 50, message: 'Rapport unchanged.' };
    const preferred = activeTraitFor(active.id);
    const current = rapportScores[active.id] ?? 50;
    if (choice === 'neutral') return { rapport: current, message: 'Rapport unchanged: you chose a respectful, neutral response.' };
    const change = choice === preferred ? 15 : -15;
    const contradiction = stanceTags.includes(oppositeTrait(choice));
    const nextRapport = Math.max(0, Math.min(100, current + change + (contradiction ? -5 : 0)));
    rapportScores = { ...rapportScores, [active.id]: nextRapport };
    stanceTags = [...stanceTags, choice];
    save();
    const outcome = `Rapport ${change > 0 ? '+' : ''}${change}: ${change > 0 ? 'they appreciated that approach.' : 'that approach did not land well.'}`;
    return { rapport: nextRapport, message: `${outcome}${contradiction ? ' This leader noticed that your earlier approach was different. Rapport gained was reduced by 5.' : ''}` };
  }
  function activeTraitFor(id: string): Trait {
    if (id === 'wren-castellano') return 'compromiser';
    if (leaderTraits[id]) return leaderTraits[id];
    const pair = traitPairs[(id.length + playerName.length) % traitPairs.length];
    return pair[(id.charCodeAt(0) + playerName.length) % 2];
  }
  function alternativeTraitFor(id: string): Trait {
    const activeTrait = activeTraitFor(id);
    const pair = traitPairs.find((candidate) => candidate.includes(activeTrait));
    return pair ? (pair[0] === activeTrait ? pair[1] : pair[0]) : 'idealistic';
  }
  function ensureLeaderTrait(id: string) {
    if (id === 'wren-castellano' || leaderTraits[id]) return;
    leaderTraits = { ...leaderTraits, [id]: activeTraitFor(id) };
  }
  function hasRapportPhase(encounter: Encounter) {
    return !encounter.title.includes('Loner');
  }

  function beginNightAlternate(id: string) {
    const encounter = houseEncounters.find((item) => item.id === id);
    nightAlternatesOpen = false;
    if (!encounter || completed.includes(id)) return;
    activeLevel = 'house';
    activeRapportBonus = 10;
    beginEncounter(encounter);
  }

  function resolveEncounter(correct: boolean) {
    if (!active) return;
    const questionId = activeQuestionId;
    const completedIds = activeLevel === 'house' ? completed : senateCompleted;
    const attemptMap = activeLevel === 'house' ? attempts : senateAttempts;
    if (correct && !completedIds.includes(active.id)) {
      if (activeLevel === 'house') {
        const newVotes = votes + active.votes;
        completed = [...completed, active.id];
        votes = newVotes;
        if (active.id === 'wren-castellano' && wrenWasFirstMeeting && !scoutTrainingSeen) scoutTrainingOpen = true;
        minutes = (minutes + active.votes * 10) % 1440;
        if (newVotes >= 175 && committeeStatus === 'Not started') {
          committeeStatus = 'Markup interrupted';
          // One question is used by Ada's floor interruption; seven distinct
          // questions remain for the self-contained Committee sequence.
          committeeQuestionIds = reserveQuestions(houseQuestionIds(completed.length + 1), 8);
          committeeAmbushQuestionId = committeeQuestionIds[0] ?? null;
          committeeAmbushOpen = true;
          announcement = 'An extreme House member stops you as your bill is pulled toward Committee markup.';
        }
      }
      else { senateCompleted = [...senateCompleted, active.id]; senateVotes += active.votes; minutes = (minutes + active.votes * 10) % 1440; }
      influence += active.mode === 'multiple' ? 15 : active.mode === 'short' ? 25 : 40;
      if (questionId !== null && !correctQuestionIds.includes(questionId)) correctQuestionIds = [...correctQuestionIds, questionId];
      announcement = `${active.name} joined your coalition. ${active.votes} votes secured.`;
      if (activeLevel === 'house') {
      }
    } else if (!correct) {
      const nextAttempt = (attemptMap[active.id] ?? 0) + 1;
      if (activeLevel === 'house') { attempts = { ...attempts, [active.id]: nextAttempt }; if (nextAttempt >= 2 && !overrideActive) locked = [...locked, active.id]; }
      else { senateAttempts = { ...senateAttempts, [active.id]: nextAttempt }; if (nextAttempt >= 2 && !overrideActive) senateLocked = [...senateLocked, active.id]; }
    }
    active = null; activeQuestionId = null; activeQuestionData = null; activeRapportBonus = 0;
    save();
    if (votes >= requiredVotes && !housePassageSeen) housePassageOpen = true;
    if (activeLevel === 'senate' && senateVotes >= 50 && !filibusterResolved) { filibusterQuestionIds = reserveQuestions(senateQuestionIds(true), 5); filibusterIntroSeen = false; filibusterOpen = true; save(); }
    if (activeLevel === 'senate' && senateVotes >= 60 && !whiteHouseUnlocked && !gridlock) clotureOpen = true;
  }

  function skipRepresentativeQuestion() {
    representativeLookupOpen = false;
    if (!activeQuestionId || !active) return;
    const pool = activeLevel === 'house' ? houseQuestionIds(completed.length) : senateQuestionIds(senateVotes >= 50);
    const replacement = pool.find((id) => id !== 29 && !encounteredQuestionIds.includes(id) && isEligibleLiveQuestion(id));
    if (replacement === undefined) { active = null; activeQuestionId = null; activeQuestionData = null; return; }
    encounteredQuestionIds = [...encounteredQuestionIds, replacement];
    activeQuestionId = replacement;
    activeQuestionData = civicsQuestionById.get(replacement) ?? null;
    announcement = 'The U.S. Representative question was swapped without penalty.';
    save();
  }

  function reset() {
    if (!confirm('Erase your saved campaign and return to the title screen?')) return;
    localStorage.removeItem(SAVE_KEY); hasSave = false; screen = 'title';
  }

  function finishCommittee(result: { approvals: number; amendments: string[] }) {
    const passed = result.approvals >= 4;
    const award = passed ? houseLedger.committeeVotes : 15;
    votes += award;
    committeeAmendments = result.amendments;
    committeeStatus = passed ? `Markup passed · +${award} votes` : `Markup incomplete · +15 votes`;
    committeeOpen = false;
    // Markup returns the player to the known-safe center of the House chamber.
    playerX = 3000;
    playerY = 900;
    announcement = passed ? `Committee markup passed. ${award} House votes secured.` : 'Committee markup is incomplete. 15 House votes secured.';
    save();
    if (votes >= requiredVotes && !housePassageSeen) housePassageOpen = true;
  }

  function openCommittee() {
    if (committeeStatus !== 'Markup unlocked') return;
    committeeAmbushOpen = false;
    committeeOpen = true;
    announcement = 'The Committee is handling the bill now. Complete its markup before returning to the House floor.';
    save();
  }

  function finishCommitteeAmbush(prepared: boolean) {
    committeeEased = prepared;
    committeeStatus = 'Markup unlocked';
    committeeAmbushOpen = false;
    openCommittee();
  }
  function useHouseZone(zone: string) {
    if (zone === 'rotunda') { screen = 'rotunda'; save(); return; }
    if (zone === 'dc') { screen = 'dc'; save(); return; }
    if (zone === 'committee') {
      if (committeeStatus === 'Not started') { announcement = 'The Committee door is locked. Reach 175 House votes first.'; return; }
      openCommittee();
      return;
    }
    const rooms = {
      'west-cloakroom': { roomId: 'west-cloakroom', title: 'West Cloakroom', description: 'Coats, message hooks, and quiet side conversations fill this crowded back room.', source: 'West Cloakroom message board' },
      'east-cloakroom': { roomId: 'east-cloakroom', title: 'East Cloakroom', description: 'Staffers leave briefing papers and carefully folded notes between the coat racks.', source: 'East Cloakroom staff memo' },
      'west-caucus': { roomId: 'west-caucus', title: 'Loyalist West Caucus', description: 'Vote charts, district maps, and briefing folders cover the caucus tables.', source: 'West Caucus briefing papers' },
      'east-caucus': { roomId: 'east-caucus', title: 'Loyalist East Caucus', description: 'Members compare notes around a long table before returning to the chamber floor.', source: 'East Caucus study card' }
    } as const;
    mapRoom = rooms[zone as keyof typeof rooms] ?? null;
  }
  function returnFromHouseRoom(roomId: NonNullable<typeof mapRoom>['roomId']) {
    // Each position is outside its door and inside the main House walkable area.
    const exits = {
      'west-cloakroom': { x: 1050, y: 685 },
      'east-cloakroom': { x: 6500, y: 685 },
      'west-caucus': { x: 1675, y: 520 },
      'east-caucus': { x: 5350, y: 520 }
    } as const;
    const exit = exits[roomId];
    playerX = exit.x;
    playerY = exit.y;
    houseInteractionBlocked = true;
    mapRoom = null;
    requestAnimationFrame(() => (document.activeElement as HTMLElement | null)?.blur());
  }

  function buyPowerUp(item: PowerUpId, cost: number) {
    if (influence < cost || inventory[item] >= 3) return;
    influence -= cost;
    inventory = { ...inventory, [item]: inventory[item] + 1 };
    save();
  }
  function buyNotebookQuestion(questionId: number) {
    if (influence < 25 || notebookQuestionIds.includes(questionId)) return;
    influence -= 25;
    notebookQuestionIds = [...notebookQuestionIds, questionId];
    notebookSources = { ...notebookSources, [questionId]: 'Rotunda Shop' };
    announcement = `Notebook entry added: Question ${questionId}.`;
    save();
  }

  function usePowerUp(item: PowerUpId) {
    if (inventory[item] < 1) return false;
    inventory = { ...inventory, [item]: inventory[item] - 1 };
    save();
    return true;
  }

  function continueToRotunda() {
    housePassageSeen = true;
    housePassageOpen = false;
    screen = 'rotunda';
    announcement = votes >= 290 ? 'The House has secured veto-proof support.' : 'The Senate door is now unlocked in the Rotunda.';
    save();
  }

  function enterSenate() {
    screen = 'senate';
    activeLevel = 'senate';
    // Senate currently shares the top-down chamber engine; spawn inside its open aisle.
    if (senatePlayerX < 280 || senatePlayerX > 6200 || senatePlayerY < 260 || senatePlayerY > 1550) { senatePlayerX = 3100; senatePlayerY = 920; }
  }

  function enterHouse() {
    screen = 'game';
    activeLevel = 'house';
    // Always enter the House at an open aisle in the main chamber, never inside a room boundary.
    if (playerX < 350 || playerX > 7000 || playerY < 420 || playerY > 1300) { playerX = 3000; playerY = 900; }
    showBrief = false;
    if (!benTutorialComplete) benTutorialOpen = true;
  }

  function finishBenTutorial() {
    benTutorialComplete = true;
    benTutorialOpen = false;
    save();
  }

  function finishFilibuster(passed: boolean) {
    filibusterOpen = false;
    filibusterResolved = true;
    gridlock = !passed;
    if (!passed) { overtimeQuestionIds = reserveQuestions(senateQuestionIds(true), 10); screen = 'subway'; activeLevel = 'senate'; }
    if (passed) clotureOpen = true;
    announcement = passed ? 'Cloture achieved. Your bill is headed to the White House.' : 'The filibuster held. Find a route through the Cloakroom and Subway.';
    save();
  }

  function isHoldLeader(id: string) {
    return ['eleanor-vance', 'corinne-vasquez', 'del-ashworth', 'priya-okafor-lin'].includes(id);
  }

  function resolveHold(result: { resolved: boolean; spent?: number }) {
    if (!activeHoldId || !result.resolved) return;
    if (result.spent) influence -= result.spent;
    resolvedHolds = [...resolvedHolds, activeHoldId];
    announcement = 'Hold released. This Senator is now available to meet.';
    activeHoldId = null;
    save();
  }
  function recoverLucianaBriefcase() {
    priyaBriefcaseRecovered = true;
    if (!resolvedHolds.includes('priya-okafor-lin')) resolvedHolds = [...resolvedHolds, 'priya-okafor-lin'];
    if (!notebookQuestionIds.includes(46)) notebookQuestionIds = [...notebookQuestionIds, 46];
    notebookSources = { ...notebookSources, 46: 'Luciana Abbonizio missing briefcase' };
    announcement = 'You recovered Luciana Abbonizio’s missing briefcase and notes. Her Hold is released.';
    save();
  }
  function returnFromOffice() { if (priyaBriefcaseRecovered) abbonizioOfficeClosed = true; screen = 'senate'; activeLevel = 'senate'; save(); }
  function recoverArchiveBriefing() {
    archiveBriefingRecovered = true;
    if (!resolvedHolds.includes('eleanor-vance')) resolvedHolds = [...resolvedHolds, 'eleanor-vance'];
    notebookQuestionIds = notebookQuestionIds.includes(24) ? notebookQuestionIds : [...notebookQuestionIds, 24];
    notebookSources = { ...notebookSources, 24: 'Economic Impact Briefing' };
    announcement = 'You found the Economic Impact Briefing. Sen. Eleanor Vance’s Hold is released.';
    save();
  }
  function returnFromArchive() { screen = 'senate'; activeLevel = 'senate'; }

  function resolveRogueNode(id: number, correct: boolean) {
    if (!correct || rogueNodes.includes(id)) return;
    rogueNodes = [...rogueNodes, id];
    senateVotes += 1;
    if (rogueNodes.length >= 10) { gridlock = false; announcement = 'All Rogue Senator Nodes are secured. Gridlock is broken.'; }
    if (!gridlock && senateVotes >= 60 && !whiteHouseUnlocked) clotureOpen = true;
    save();
  }

  function resolveBoss(id: string, passed: boolean) {
    if (bossAttempts.includes(id)) return;
    bossAttempts = [...bossAttempts, id];
    if (passed) { senateVotes += 10; gridlock = false; announcement = 'The Extreme leader breaks Gridlock. +10 Senate votes.'; }
    if (!gridlock && senateVotes >= 60 && !whiteHouseUnlocked) clotureOpen = true;
    save();
  }
  function useSuperPac() {
    if (inventory.superPac < 1) return;
    const additions = Array.from({ length: 10 }, (_, index) => index + 1).filter((id) => !rogueNodes.includes(id)).slice(0, 5);
    inventory = { ...inventory, superPac: 0 };
    rogueNodes = [...rogueNodes, ...additions];
    senateVotes += additions.length;
    if (rogueNodes.length >= 10) { gridlock = false; announcement = 'The Super PAC Injection cleared the remaining Rogue Nodes and broke Gridlock.'; }
    else announcement = 'Super PAC Injection cleared five Rogue Senator Nodes.';
    save();
  }
  function openRogueNode(nodeId: number) {
    const questionId = overtimeQuestionIds[nodeId - 1];
    if (questionId === undefined) return;
    const question = civicsQuestionById.get(questionId);
    if (!question) return;
    const answer = window.prompt(`Rogue Senator Node ${nodeId}\n\n${question.prompt}\n\nType your answer:`);
    if (!answer) return;
    resolveRogueNode(nodeId, resolveDynamicAnswer(question, answer) ?? false);
  }
  function returnFromSubway() { screen = 'senate'; activeLevel = 'senate'; }

  function openWhiteHouse() {
    clotureOpen = false;
    whiteHouseUnlocked = true;
    screen = 'whiteHouse';
    save();
  }

  function enterOvalOffice() {
    if (overrideActive && votes >= 290 && senateVotes >= 67) { overrideFinaleOpen = true; return; }
    // The Oval Office is a separate final assessment. It draws from the full curriculum
    // without consuming or being limited by the campaign's no-duplicate encounter pool.
    ovalOfficeQuestionIds = [...civicsQuestionById.keys()]
      .filter(isEligibleLiveQuestion)
      .slice(0, presidentAlignment === 'ally' ? 20 : 10);
    ovalOfficeOpen = true;
  }

  function finishOvalOffice(passed: boolean, correct: number, asked: number) {
    ovalOfficeOpen = false;
    if (passed) {
      billBecameLaw = true;
      completionMinutes = minutes;
      ovalOfficeAccuracyBonus = presidentAlignment === 'ally' ? Math.min(800, Math.max(0, 20 - asked) * 100) : 0;
      celebrationOpen = true;
      announcement = `The bill is signed. You answered ${correct} questions correctly.`;
    }
    else { overrideActive = true; overrideOpen = true; announcement = 'President DiSantis vetoed the bill. Congress can attempt an override.'; }
    save();
  }

  function lockScore() {
    scoreLocked = true; celebrationOpen = false;
    lastCompletion = { playerName, route: completionRoute, houseVotes: votes, senateVotes, notebookEntries: notes.length, influence, score: finalScore };
    localStorage.setItem(CERTIFICATE_KEY, JSON.stringify(lastCompletion));
    certificateOpen = true; announcement = `Final score locked: ${finalScore}.`; save();
  }
  function continueExploring() { celebrationOpen = false; screen = 'dc'; save(); }
  function returnToCongress() {
    overrideOpen = false;
    if (votes < 290) { locked = []; attempts = {}; screen = 'game'; activeLevel = 'house'; }
    else { senateLocked = []; senateAttempts = {}; screen = 'senate'; activeLevel = 'senate'; }
  }

  function finishOverride() { overrideFinaleOpen = false; billBecameLaw = true; overrideActive = false; completionRoute = 'override'; completionMinutes = completionMinutes ?? minutes; ovalOfficeAccuracyBonus = 0; celebrationOpen = true; announcement = 'Congress overrode the veto. The bill is now law.'; save(); }
  function saveProfile(code: string, selectedCity: string) { jurisdictionCode = code; city = selectedCity; profileOpen = false; save(); }
  function resolveDynamicAnswer(question: import('./civics-questions').CivicsQuestion, answer: string) { return validateSupportedDynamicAnswer(question, answer, jurisdictionCode); }
  function openProfile() { profileOpen = true; }
  function finishCharacterCreation(profile: { firstName: string; lastName: string; presentation: 'female' | 'male'; skinTone: string; party: 'D' | 'R' }) {
    playerFirstName = profile.firstName;
    playerLastName = profile.lastName;
    playerName = `${profile.firstName} ${profile.lastName}`;
    playerPresentation = profile.presentation;
    playerSkinTone = profile.skinTone;
    playerParty = profile.party;
    characterCreationOpen = false;
    profileOpen = true;
    save();
  }
  function discoverNotebookEntry(source = 'Hidden D.C. map find') {
    const available = [...civicsQuestionById.keys()].filter((id) => !notebookQuestionIds.includes(id));
    if (!available.length) { announcement = 'You have already collected every Notebook study entry.'; return; }
    const id = available[(notebookQuestionIds.length * 17 + encounteredQuestionIds.length) % available.length];
    notebookQuestionIds = [...notebookQuestionIds, id];
    notebookSources = { ...notebookSources, [id]: source };
    const question = civicsQuestionById.get(id)!;
    announcement = `Oh look! You found Question ${id}: ${question.prompt}`;
    save();
  }
  function waitForNextPeriod() { const hour = Math.floor(minutes / 60) % 24; const target = hour >= 20 || hour < 6 ? 6 * 60 : 20 * 60; minutes = (target > minutes ? target : target + 1440) % 1440; save(); }
  function addSpecificNotebookEntry(id: number, source: string) { if (!notebookQuestionIds.includes(id)) { notebookQuestionIds = [...notebookQuestionIds, id]; notebookSources = { ...notebookSources, [id]: source }; } save(); }
  function finishWashingtonGhost() { washingtonGhostOpen = false; washingtonGhostComplete = true; addSpecificNotebookEntry(37, 'Ghost of George Washington'); announcement = 'You earned the Ghost of Washington Notebook entry.'; }
  function finishLincolnGhost() { lincolnGhostOpen = false; lincolnGhostComplete = true; addSpecificNotebookEntry(95, 'Ghost of Abraham Lincoln'); announcement = 'You earned the final Ghost of Lincoln Notebook entry.'; }
  function hearGhostWhisper(ghost: 'washington' | 'lincoln') {
    const key = `whisper-${ghost}`;
    if (!ghostWhispers.includes(key)) ghostWhispers = [...ghostWhispers, key];
    announcement = ghost === 'washington' ? 'A researcher lowers their voice: “Some say Washington still walks the Monument grounds after dark.”' : 'A visitor pauses near a portrait: “People say Lincoln still listens at the Memorial after nightfall.”';
    discoverNotebookEntry(ghost === 'washington' ? 'Library of Congress researcher' : 'Supreme Court visitor');
  }
  function viewVocabulary(term: string) {
    const nextVocabulary = seenVocabulary.includes(term) ? seenVocabulary : [...seenVocabulary, term];
    seenVocabulary = nextVocabulary;
    if (nextVocabulary.length >= 31 && !vocabularyEasterEggSeen) {
      vocabularyEasterEggSeen = true;
      announcement = 'The last vocabulary page turns cold. A faint message appears: “At night, seek Washington at the Monument. When your Notebook is nearly full, Lincoln waits for one final answer.”';
    }
    save();
  }
  function meetDuncan() {
    if (duncanFound) return;
    duncanFound = true;
    const available = [...civicsQuestionById.keys()].filter((id) => !notebookQuestionIds.includes(id));
    const pack = available.slice(0, 5);
    notebookQuestionIds = [...notebookQuestionIds, ...pack];
    notebookSources = { ...notebookSources, ...Object.fromEntries(pack.map((id) => [id, 'Duncan Johnson 5-pack'])) };
    announcement = `Duncan Johnson shares a 5-pack of Notebook study entries as a special thank you: Questions ${pack.join(', ')}.`;
    save();
  }
  function claimTouristPack(id: string, count: number, source: string) {
    if (touristClaims.includes(id)) return;
    const available = [...civicsQuestionById.keys()].filter((questionId) => !notebookQuestionIds.includes(questionId));
    const pack = available.slice(0, count);
    touristClaims = [...touristClaims, id];
    notebookQuestionIds = [...notebookQuestionIds, ...pack];
    notebookSources = { ...notebookSources, ...Object.fromEntries(pack.map((questionId) => [questionId, `${source} ${count}-pack`])) };
    announcement = `${source} shared ${pack.length} new Notebook study ${pack.length === 1 ? 'entry' : 'entries'}.`;
    save();
  }
  function finishScouting() {
    if (!scoutLeaderId) return;
    scoutedLeaders = [...scoutedLeaders, scoutLeaderId];
    const intelQuestionId = scoutLeaderId === 'augustus-kane' ? 83 : 113;
    notebookQuestionIds = notebookQuestionIds.includes(intelQuestionId) ? notebookQuestionIds : [...notebookQuestionIds, intelQuestionId];
    notebookSources = { ...notebookSources, [intelQuestionId]: scoutLeaderId === 'augustus-kane' ? 'Cloakroom scouting intel' : 'Press Row scouting intel' };
    scoutLeaderId = null;
    announcement = 'Scouting intel logged. You now have a reliable Rapport clue for that Senator.';
    save();
  }
</script>

{#if screen === 'title'}
  <TitleScreen canContinue={hasSave} hasCertificate={Boolean(lastCompletion)} onstart={newGame} oncontinue={continueGame} oncertificate={() => { if (lastCompletion) certificateOpen = true; }} oncredits={() => assetCreditsOpen = true} />
{:else if screen === 'rotunda'}
  <RotundaMap housePassed={votes >= requiredVotes} onhouse={enterHouse} onshop={() => shopOpen = true} onbill={() => billScrollOpen = true} onnotebook={() => { notebookTab = 'entries'; notebookOpen = true; }} onguide={() => { notebookTab = 'vocabulary'; notebookOpen = true; }} onprofile={openProfile} ondc={() => screen = 'dc'} onsenate={enterSenate} ondiscover={() => discoverNotebookEntry('Rotunda Civics Exhibit')} />
  {:else if screen === 'dc'}
    <DcOverworld {minutes} whiteHouseOpen={whiteHouseUnlocked} notebookEntries={notes.length} onrotunda={() => screen='rotunda'} onwait={waitForNextPeriod} onspot={(spot) => landmarkCard = spot} />
{:else if screen === 'whiteHouse'}
  <WhiteHouse overrideReady={overrideActive && votes >= 290 && senateVotes >= 67} lincolnReady={notes.length >= 127 && !lincolnGhostComplete} onshop={() => shopOpen = true} onbill={() => billScrollOpen = true} onnotebook={() => notebookOpen = true} onreturn={() => screen = 'dc'} onovaloffice={enterOvalOffice} onlincoln={() => { announcement = 'Lincoln Memorial is now available as an optional stop on the D.C. map before you enter the Oval Office.'; screen = 'dc'; }} />
{:else if screen === 'archive'}
  <ArchiveBasement recovered={archiveBriefingRecovered} onrecover={recoverArchiveBriefing} onreturn={returnFromArchive} />
{:else if screen === 'office'}
  <LeadershipOffice recovered={priyaBriefcaseRecovered} onrecover={recoverLucianaBriefcase} onreturn={returnFromOffice} />
   {:else if screen === 'subway'}
   <SubwayOvertimeMap {gridlock} completedNodes={rogueNodes} superPacAvailable={inventory.superPac > 0} onnode={openRogueNode} onusesuperpac={useSuperPac} onscout={(id) => { scoutLeaderId = id; }} onreturn={returnFromSubway} />
{:else if screen === 'senate'}
  <main class="game-shell senate-shell">
    <header class="hud"><div class="brand"><span>CHC</span><div>CAPITOL HILL<strong>CRAWLER</strong></div></div><div class="bill-name"><span>SENATE FLOOR</span><strong>CONNECTED CLASSROOMS ACT</strong></div><div class="hud-actions"><button onclick={() => screen = 'rotunda'}>← ROTUNDA</button><button onclick={() => screen = 'subway'}>♢ CLOAKROOM</button><button onclick={() => { notebookTab = 'vocabulary'; notebookOpen = true; }}>? GUIDE</button><button onclick={() => { notebookTab = 'entries'; notebookOpen = true; }}>▤ NOTEBOOK <b>{notes.length}</b></button></div></header>
    <section class="vote-board"><div><span>{overrideActive ? 'SENATE OVERRIDE' : 'SENATE SUPPORT'}</span><strong>{senateVotes} <small>/ {overrideActive ? 67 : 60}</small></strong></div><div class="meter"><i style:width={`${Math.min(100, Math.round(senateVotes / (overrideActive ? 67 : 60) * 100))}%`}></i><span class="threshold">{overrideActive ? 67 : 60}</span></div><div class="inf"><span>INFLUENCE</span><strong>{influence} INF</strong></div></section>
    <SenateMap encounters={alignedSenateEncounters} completed={senateCompleted} locked={senateLocked} held={['eleanor-vance', 'corinne-vasquez', 'del-ashworth', 'priya-okafor-lin'].filter((id) => !resolvedHolds.includes(id))} playerSkinTone={playerSkinTone} playerPresentation={playerPresentation} playerX={senatePlayerX} playerY={senatePlayerY} leadershipOfficeClosed={abbonizioOfficeClosed} onmove={(x, y) => { senatePlayerX = x; senatePlayerY = y; }} oninteract={(encounter) => { if(gridlock && !['augustus-kane','lucia-marchetti'].includes(encounter.id)){announcement='Gridlock has stalled regular Senate meetings. Use the Cloakroom and Subway route to break the deadlock.';return;} if(['augustus-kane','lucia-marchetti'].includes(encounter.id)){if(!gridlock){announcement='These extreme leaders become an Overtime option if the Filibuster creates Gridlock. You can still scout them in the Cloakroom and Subway.';return;} screen='subway';return;} if(encounter.id==='eleanor-vance'&&!archiveBriefingRecovered){activeHoldId='eleanor-vance';return;} beginEncounter(encounter); }} onrotunda={() => screen='rotunda'} onarchive={() => { activeHoldId='eleanor-vance'; }} onovertime={() => screen='subway'} onprop={(prop) => { if (prop === 'leadership-office') { screen = 'office'; } else if (prop === 'leadership-office-locked') announcement = 'Sen. Abbonizio’s office is locked. The briefcase delivery is complete.'; else if (prop === 'senate-clerk') discoverNotebookEntry("Senate clerk's table"); else if (prop === 'senate-papers') discoverNotebookEntry('Senate floor papers'); else if (prop === 'senate-ledger') discoverNotebookEntry('Senate vote ledger'); else if (prop === 'senate-staff') announcement = 'A floor staffer points you toward the Senate rules board and reminds you to prepare before a hard conversation.'; else announcement = 'A Senate page shares the day’s schedule and suggests checking the Cloakrooms for staff contacts.'; }} />
    <footer class="statusbar"><div><span>FILIBUSTER</span><strong class:ready={senateVotes >= 50}>{gridlock ? 'Gridlock · Subway route open' : filibusterResolved ? 'Resolved' : senateVotes >= 50 ? 'Gauntlet ready' : 'Build support to 50'}</strong></div><p>{gridlock ? 'Use the Cloakroom and Subway route to break Gridlock.' : `${senateEncounters.length - senateCompleted.length} Senate leaders remain in this chamber.`}</p><button class="overtime-button" disabled={!gridlock} onclick={() => screen = 'subway'}>SUBWAY</button></footer>
  </main>
{:else}
  <main class="game-shell">
    <header class="hud">
      <div class="brand"><span>CHC</span><div>CAPITOL HILL<strong>CRAWLER</strong></div></div>
      <div class="bill-name"><span>H.R. 218</span><strong>CONNECTED SCHOOLS ACT</strong></div>
        <div class="hud-actions"><button onclick={() => houseContactOpen = true}>☏ LEADERS</button><button onclick={() => billScrollOpen = true}>▧ BILL</button><button onclick={() => { notebookTab = 'vocabulary'; notebookOpen = true; }}>? GUIDE</button><button onclick={() => { notebookTab = 'entries'; notebookOpen = true; }}>▤ NOTEBOOK <b>{notes.length}</b></button><button onclick={() => shopOpen = true}>◈ SHOP</button><button aria-label="Reset game" onclick={reset}>⚙</button></div>
    </header>
    <section class="vote-board">
      <div><span>{overrideActive ? 'HOUSE OVERRIDE' : 'HOUSE SUPPORT'}</span><strong>{votes} <small>/ {overrideActive ? 290 : requiredVotes}</small></strong>{#if votes >= 290}<em>VETO-PROOF</em>{:else if votes >= requiredVotes}<em>SENATE UNLOCKED</em>{/if}</div>
      <div class="meter"><i style:width={`${overrideActive ? Math.min(100, Math.round(votes / 290 * 100)) : progress}%`}></i><span class="threshold">{overrideActive ? 290 : 218}</span></div>
      <div class="inf"><span>INFLUENCE</span><strong>{influence} INF</strong></div>
    </section>

    <World encounters={alignedHouseEncounters} {playerX} {playerY} playerSkinTone={playerSkinTone} playerPresentation={playerPresentation} {completed} {locked} paused={Boolean(active) || notebookOpen || showBrief || committeeAmbushOpen || committeeOpen || committeeStatus === 'Markup interrupted' || committeeStatus === 'Markup unlocked' || benTutorialOpen || Boolean(mapRoom)} interactionBlocked={houseInteractionBlocked} onmove={(x, y) => { playerX = x; playerY = y; houseInteractionBlocked = false; }} oninteract={startHouseEncounter} onzone={(zone) => { if (zone === 'house-papers') discoverNotebookEntry('House floor papers'); else if (zone === 'house-ledger') discoverNotebookEntry('House vote ledger'); else if (zone === 'house-briefing') discoverNotebookEntry('House briefing table'); else if (zone === 'rules-office') announcement = 'The Rules Counsel office is locked. A staffer is working behind the frosted glass.'; else if (zone === 'whip-office') announcement = 'The Whip Office is locked. A vote count is underway inside.'; else if (zone === 'budget-office') announcement = 'The Budget Staff office is locked. The papers inside may matter later.'; else useHouseZone(zone); }} />

    <footer class="statusbar">
      <div><span>COMMITTEE</span><button class:ready={committeeStatus !== 'Not started'} disabled={committeeStatus === 'Not started'} onclick={openCommittee}>{committeeStatus}</button></div>
      <p>{completed.length === 0 ? 'Find representatives with a gold marker and build your coalition.' : `${encounters.length - completed.length - locked.length} conversations remain on this floor.`}</p>
      <span>AUTOSAVE ON</span>
    </footer>
  </main>
{/if}

{#if showBrief && screen === 'game'}
  <div class="modal-backdrop">
    <dialog class="bill-brief" open aria-labelledby="brief-title">
      <p class="eyebrow">YOUR FIRST BILL</p><h2 id="brief-title">THE CONNECTED<br />SCHOOLS ACT</h2>
      <p>Improve reliable internet access, learning tools, and teacher support for public-school students.</p>
      <div><span>STARTING COALITION</span><strong>0 VOTES</strong></div>
      <div><span>NEEDED TO PASS</span><strong>218 VOTES</strong></div>
      <p class="brief-note">Walk through the House chamber. Talk with coalition leaders and answer official U.S. civics questions to earn their support.</p>
      <button class="primary" onclick={() => showBrief = false}>STEP ONTO THE FLOOR →</button>
    </dialog>
  </div>
{/if}

{#if active && activeQuestion}<EncounterPanel encounter={active} question={activeQuestion} attempt={((activeLevel === 'senate' ? senateAttempts : attempts)[active.id] ?? 0) + 1} {inventory} playerName={playerName} rapport={rapportScores[active.id] ?? 50} activeTrait={activeTraitFor(active.id)} alternativeTrait={alternativeTraitFor(active.id)} hasRapport={hasRapportPhase(active)} isExtreme={['augustus-kane', 'lucia-marchetti'].includes(active.id)} onrapport={updateRapport} rapportBonus={activeRapportBonus} {resolveDynamicAnswer} onskipdynamic={() => { if (activeQuestionId === 29) representativeLookupOpen = true; }} onuseitem={usePowerUp} oncomplete={resolveEncounter} onclose={() => { active = null; activeQuestionId = null; activeQuestionData = null; activeRapportBonus = 0; requestAnimationFrame(() => (document.activeElement as HTMLElement | null)?.blur()); }} />{/if}
{#if scoutTrainingOpen}<ScoutTraining leaderName="Rep. Priya Anand" oncomplete={() => { scoutTrainingSeen = true; scoutTargetId = 'priya-anand'; scoutTrainingOpen = false; announcement = 'Your scout has prepared you for Rep. Anand. Find more scouts around the Capitol for optional help.'; save(); }} />{/if}
{#if committeeAmbushOpen && committeeAmbushQuestionId !== null}<CommitteeAmbush question={civicsQuestionById.get(committeeAmbushQuestionId)!} oncomplete={finishCommitteeAmbush} />{/if}
{#if committeeOpen}<CommitteeDungeon questions={committeeQuestionIds.slice(1).map((id) => civicsQuestionById.get(id)!).filter(Boolean)} committeeVotes={houseLedger.committeeVotes} hasPowerUp={Object.values(inventory).some((count) => count > 0)} adaPrepared={committeeEased} rapport={committeeRapport} onstudy={() => discoverNotebookEntry('Committee reference shelf')} oncomplete={finishCommittee} />{/if}
{#if shopOpen}<RotundaShop {influence} {inventory} filibusterTriggered={senateVotes >= 50 || filibusterResolved} ownedQuestionIds={notebookQuestionIds} onbuyquestion={buyNotebookQuestion} onbuy={buyPowerUp} onclose={() => shopOpen = false} />{/if}
{#if billScrollOpen}<BillScroll {committeeStatus} approvedAmendments={committeeAmendments} onclose={() => billScrollOpen = false} />{/if}
{#if housePassageOpen}<HousePassage {votes} oncontinue={continueToRotunda} />{/if}
{#if benTutorialOpen}<BenTutorial playerName={playerName} oncomplete={finishBenTutorial} />{/if}
{#if filibusterOpen && !filibusterIntroSeen}<FilibusterIntro oncontinue={() => { filibusterIntroSeen = true; save(); }} />{/if}
{#if filibusterOpen && filibusterIntroSeen}<FilibusterGauntlet questions={filibusterQuestionIds.map((id) => civicsQuestionById.get(id)!).filter(Boolean)} oncomplete={finishFilibuster} />{/if}
{#if activeHoldId}<SenateHold leaderId={activeHoldId} notebookEntries={notes.length} newEntriesSinceContact={activeHoldId === 'del-ashworth' && delNotebookCountAtContact !== null ? Math.max(0, notebookQuestionIds.length - delNotebookCountAtContact) : 0} {influence} question={civicsQuestionById.get(senateQuestionIds().find((id) => !encounteredQuestionIds.includes(id)) ?? 73)!} onresolve={resolveHold} onoffice={() => { activeHoldId = null; screen = 'office'; }} onclose={() => activeHoldId = null} />{/if}
{#if clotureOpen}<ClotureTransition oncontinue={openWhiteHouse} />{/if}
{#if ovalOfficeOpen}<OvalOffice questions={ovalOfficeQuestionIds.map((id) => civicsQuestionById.get(id)!).filter(Boolean)} alignment={presidentAlignment} {inventory} onuseitem={usePowerUp} oncomplete={finishOvalOffice} />{/if}
{#if celebrationOpen}<BillCelebration playerScore={finalScore} notebookEntries={notes.length} correctAnswerPoints={correctAnswerPoints} {notebookEntryPoints} ovalBonus={ovalOfficeAccuracyBonus} {speedBonus} infBonus={Math.min(3200, influence * 3)} onlock={lockScore} onexplore={continueExploring} />{/if}
{#if overrideOpen}<VetoOverride houseVotes={votes} {senateVotes} onreturn={returnToCongress} />{/if}
{#if overrideFinaleOpen}<OverrideFinale oncomplete={finishOverride} />{/if}
{#if profileOpen}<StudentProfile initialCode={jurisdictionCode} initialCity={city} oncomplete={saveProfile} />{/if}
{#if certificateOpen && lastCompletion}<CompletionCertificate playerName={lastCompletion.playerName} route={lastCompletion.route} houseVotes={lastCompletion.houseVotes} senateVotes={lastCompletion.senateVotes} notebookEntries={lastCompletion.notebookEntries} influence={lastCompletion.influence} score={lastCompletion.score} oncontinue={() => { certificateOpen = false; screen = 'title'; }} />{/if}
{#if characterCreationOpen}<CharacterCreation oncomplete={finishCharacterCreation} />{/if}
{#if representativeLookupOpen}<RepresentativeLookup onskip={skipRepresentativeQuestion} onlookup={() => skipRepresentativeQuestion()} />{/if}
{#if assetCreditsOpen}<AssetCredits onclose={() => assetCreditsOpen = false} />{/if}
{#if houseContactOpen}<div class="modal-backdrop"><dialog class="leader-contact-panel" open aria-labelledby="leader-contact-title"><button class="close" aria-label="Close leader directory" onclick={() => houseContactOpen = false}>×</button><p class="eyebrow">HOUSE CONTACT LIST</p><h2 id="leader-contact-title">AVAILABLE LEADERS</h2><p>Select a leader to begin an encounter directly. This is a reliable alternative while the map interaction layer is being refined.</p><div class="leader-contact-list">{#each houseEncounters.filter((encounter) => !completed.includes(encounter.id) && !locked.includes(encounter.id)) as encounter}<button onclick={() => startHouseEncounter(encounter)}><b>{encounter.name}</b><span>{encounter.affiliation} · {encounter.votes} votes</span></button>{/each}</div></dialog></div>{/if}
{#if mapRoom}{@const roomScoutTargets = { 'west-caucus': 'priya-anand', 'east-caucus': 'selena-marsh', 'west-cloakroom': 'hank-delgado', 'east-cloakroom': 'naomi-cho' } as const}{@const targetId = roomScoutTargets[mapRoom.roomId]}<MapRoom {...mapRoom} discovered={Object.values(notebookSources).includes(mapRoom.source)} scoutAvailable={houseScoutTargets.includes(targetId)} ondiscover={discoverNotebookEntry} onscout={() => { if (!houseScoutTargets.includes(targetId)) { houseScoutTargets = [...houseScoutTargets, targetId]; announcement = `Scout intel logged for ${houseEncounters.find((encounter) => encounter.id === targetId)?.name}. Watch for what they value in the Rapport conversation.`; save(); } }} onreturn={() => returnFromHouseRoom(mapRoom!.roomId)} />{/if}
{#if scoutLeaderId}<ScoutLeader leaderId={scoutLeaderId} oncomplete={finishScouting} onclose={() => scoutLeaderId = null} />{/if}
{#if landmarkCard}<LandmarkCard landmark={landmarkCard} onclose={() => landmarkCard = null} oncontinue={() => { const spot = landmarkCard; landmarkCard = null; if(spot==='capitol'){screen='rotunda';} else if(spot==='white-house'){if(whiteHouseUnlocked)screen='whiteHouse';else announcement='The White House opens after Congress passes the bill.';} else if(spot==='monument'){if((Math.floor(minutes/60)%24>=20||Math.floor(minutes/60)%24<6)&&notes.length>=100&&(encounteredQuestionIds.includes(37)||notebookQuestionIds.includes(37)))washingtonGhostOpen=true;else discoverNotebookEntry('Washington Monument tourist board');} else if(spot==='reflecting'){discoverNotebookEntry('Reflecting Pool visitor guide');} else if(spot==='lincoln'){discoverNotebookEntry('Lincoln Memorial visitor guide');} else if(spot==='smithsonian'){discoverNotebookEntry('Smithsonian museum guide');} else if(spot==='library'){hearGhostWhisper('washington');} else if(spot==='court'){hearGhostWhisper('lincoln');} else if(spot==='duncan'){meetDuncan();} else if(spot==='tourists'){touristPanelOpen=true;} else if(spot==='cafe'||spot==='press'){if(Math.floor(minutes/60)%24>=20||Math.floor(minutes/60)%24<6)nightAlternatesOpen=true;else touristPanelOpen=true;} }} />{/if}
{#if touristPanelOpen}<TouristEncounters claimed={touristClaims} onclaim={claimTouristPack} onclose={() => touristPanelOpen = false} />{/if}
{#if nightAlternatesOpen}<DcNightAlternates {completed} onselect={beginNightAlternate} onclose={() => nightAlternatesOpen = false} />{/if}
{#if washingtonGhostOpen}<WashingtonGhost hasPriorKnowledge={encounteredQuestionIds.includes(37) || notebookQuestionIds.includes(37)} oncomplete={finishWashingtonGhost} onclose={() => washingtonGhostOpen = false} />{/if}
{#if lincolnGhostOpen}<LincolnGhost oncomplete={finishLincolnGhost} />{/if}
{#if notebookOpen}<Notebook entries={notes} initialTab={notebookTab} {seenVocabulary} {vocabularyEasterEggSeen} onviewvocabulary={viewVocabulary} onclose={() => notebookOpen = false} />{/if}
<div class="sr-only" aria-live="polite">{announcement}</div>
