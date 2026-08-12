// Dynamic questions keep the literal USCIS text as their accepted answer — "Answers will vary."
// or "Visit uscis.gov/citizenship/testupdates...". That text is a pointer for a human proctor, not
// an answer, so anywhere the game shows a student the correct answer it has to resolve the real one
// from the maintained data instead.

import type { CivicsQuestion } from './civics-questions';
import { isSupportedDynamicQuestion, jurisdictionByCode } from './jurisdictions';
import { governorsByStateName, nationalOfficeholders, senatorsByState } from './officeholders';
import { representativesByState } from './representatives';

function joinWithOr(values: string[]) {
  if (values.length <= 1) return values[0] ?? '';
  if (values.length === 2) return `${values[0]} or ${values[1]}`;
  return `${values.slice(0, -1).join(', ')}, or ${values[values.length - 1]}`;
}

function representativeSummary(jurisdictionCode: string, districts?: number[]) {
  const jurisdiction = jurisdictionByCode(jurisdictionCode);
  const delegation = representativesByState[jurisdictionCode] ?? [];
  if (!jurisdiction || !delegation.length) return '';

  if (!jurisdiction.hasVotingRepresentative) {
    return `${joinWithOr(delegation.map((member) => member.name))} — or that ${jurisdiction.name} has no voting representative`;
  }

  const inDistrict = districts?.length ? delegation.filter((member) => districts.includes(member.district)) : [];
  if (inDistrict.length) return joinWithOr(inDistrict.map((member) => member.name));
  if (delegation.length === 1) return delegation[0].name;

  // Listing an entire large delegation is noise, so name one and say what the rule is.
  return `any current U.S. Representative from ${jurisdiction.name}, such as ${delegation[0].name}`;
}

/**
 * The current correct answer for a dynamic question, phrased for a student. Returns null when the
 * question is not answerable for this jurisdiction, in which case the caller should fall back to
 * the question's own text.
 */
export function dynamicAnswerSummary(question: CivicsQuestion, jurisdictionCode: string, districts?: number[]) {
  if (!question.dynamic || !isSupportedDynamicQuestion(question.id, jurisdictionCode)) return null;
  const jurisdiction = jurisdictionByCode(jurisdictionCode);
  if (!jurisdiction) return null;

  if (question.id === 62) return jurisdiction.capital || `${jurisdiction.name} is not a state, so it has no state capital`;
  if (question.id === 29) return representativeSummary(jurisdictionCode, districts) || null;

  if (question.id === 23) {
    if (!jurisdiction.hasSenators) return `${jurisdiction.name} has no U.S. Senators`;
    return joinWithOr(senatorsByState[jurisdictionCode] ?? []) || null;
  }

  if (question.id === 61) {
    if (!jurisdiction.hasGovernor) return `${jurisdiction.name} does not have a Governor`;
    return governorsByStateName[jurisdiction.name] ?? null;
  }

  // 30, 38, 39 and 57 list alternate spellings of one person; the first is the display form.
  return nationalOfficeholders[question.id]?.[0] ?? null;
}
