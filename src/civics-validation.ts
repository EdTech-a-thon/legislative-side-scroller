import { civicsAnswerVariants, historicalPersonVariants, type CivicsQuestion } from './civics-questions';
import { isSupportedDynamicQuestion, jurisdictionByCode } from './jurisdictions';
import { governorsByStateName, nationalOfficeholders, senatorsByState } from './officeholders';

export type DynamicAnswerResolver = (question: CivicsQuestion, answer: string) => boolean | undefined;

export function normalizeCivicsAnswer(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\bu\.?\s*s\.?\b/g, 'us')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const numberWords: Record<string, string> = {
  zero: '0', one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9', ten: '10',
  eleven: '11', twelve: '12', thirteen: '13', fourteen: '14', fifteen: '15', sixteen: '16', seventeen: '17', eighteen: '18', nineteen: '19',
  twenty: '20', thirty: '30', forty: '40', fifty: '50', sixty: '60', seventy: '70', eighty: '80', ninety: '90', hundred: '100', thousand: '1000'
};

const fillerWords = new Set(['a', 'an', 'the', 'of', 'to', 'for', 'in', 'on', 'and', 'or', 'is', 'are', 'it', 'that', 'this', 'their', 'they', 'be', 'with', 'by']);
const knownGivenNames = new Set(['abigail', 'abraham', 'alexander', 'benjamin', 'clara', 'dolley', 'dwight', 'elizabeth', 'eleanor', 'franklin', 'george', 'harriet', 'james', 'john', 'lucretia', 'lucy', 'martin', 'martha', 'patrick', 'samuel', 'sojourner', 'susan', 'thomas']);
// Controlled classroom synonyms make equivalent wording acceptable without opening
// validation to unrelated answers. This is intentionally a small local thesaurus.
const civicSynonyms: Record<string, string[]> = {
  citizens: ['people'],
  people: ['citizens'],
  representatives: ['members'],
  members: ['representatives'],
  laws: ['law'],
  law: ['laws'],
  rights: ['freedoms'],
  freedoms: ['rights'],
  president: ['president'],
  state: ['states']
};

function hasEquivalentCivicWording(submission: string, accepted: string) {
  const submittedWords = normalizeCivicsAnswer(submission).split(' ').filter(Boolean);
  const acceptedWords = normalizeCivicsAnswer(accepted).split(' ').filter(Boolean);
  if (submittedWords.length !== acceptedWords.length) return false;

  return submittedWords.every((word, index) => word === acceptedWords[index]
    || civicSynonyms[acceptedWords[index]]?.includes(word));
}

function isMeaningfulShortForm(submission: string, accepted: string) {
  const acceptedWords = normalizeCivicsAnswer(accepted).split(' ').filter((word) => !fillerWords.has(word));
  const submittedWords = normalizeCivicsAnswer(submission).split(' ').filter((word) => !fillerWords.has(word));

  // Long USCIS answer choices often include explanatory wording. A concise response is
  // valid when it contains at least two meaningful words from that same official answer.
  return acceptedWords.length >= 2
    && submittedWords.length >= 2
    && submittedWords.length <= acceptedWords.length
    && submittedWords.every((word) => acceptedWords.includes(word));
}

function numberVariant(value: string) {
  const words = normalizeCivicsAnswer(value).split(' ');
  if (!words.length || !words.every((word) => numberWords[word] || word === 'and')) return null;

  let total = 0;
  let current = 0;
  for (const word of words) {
    if (word === 'and') continue;
    const number = Number(numberWords[word]);
    if (number === 100) current = Math.max(1, current) * number;
    else if (number === 1000) { total += Math.max(1, current) * number; current = 0; }
    else current += number;
  }
  return String(total + current);
}

function acceptedVariants(acceptedAnswer: string) {
  const variants = new Set<string>();
  const normalized = normalizeCivicsAnswer(acceptedAnswer);
  variants.add(normalized);

  // Articles are not civics knowledge. Accept “President” and “the President,”
  // “Constitution” and “the Constitution,” and similar natural responses.
  if (normalized.startsWith('the ')) variants.add(normalized.slice(4));
  else variants.add(`the ${normalized}`);

  // Official answers use parentheses for optional words and numbers. Accept both the full
  // official phrase and useful stripped forms without treating unrelated fragments as correct.
  const withoutParentheses = normalizeCivicsAnswer(acceptedAnswer.replace(/\([^)]*\)/g, ' '));
  if (withoutParentheses) variants.add(withoutParentheses);

  // USCIS uses both “in their district” and “of their district” across equivalent
  // representative-answer phrasing. Accept either classroom-natural preposition.
  if (withoutParentheses.includes(' in their ')) variants.add(withoutParentheses.replace(' in their ', ' of their '));
  if (withoutParentheses.includes(' of their ')) variants.add(withoutParentheses.replace(' of their ', ' in their '));

  for (const match of acceptedAnswer.matchAll(/\(([^)]+)\)/g)) {
    const option = normalizeCivicsAnswer(match[1]);
    // Parentheses often contain a first name, such as “(Thomas) Jefferson.”
    // Do not accept that first name alone; accept the surname and full name below.
    if (option && !knownGivenNames.has(option)) variants.add(option);
  }

  const nameWithoutParentheses = acceptedAnswer.replace(/[()]/g, '').trim();
  const nameParts = normalizeCivicsAnswer(nameWithoutParentheses).split(' ');
  if (nameParts.length >= 2 && knownGivenNames.has(nameParts[0])) {
    const surname = nameParts[nameParts.length - 1];
    variants.add(surname);
    variants.add(nameParts.join(' '));
  }

  const numeric = numberVariant(withoutParentheses);
  if (numeric) variants.add(numeric);

  // Some official answers use a numeral inside parentheses after a short explanation,
  // for example “(Because there were) 13 original colonies.”
  for (const match of acceptedAnswer.matchAll(/\b(\d+)\b/g)) variants.add(match[1]);

  // Common, unambiguous classroom abbreviations for official titles and institutions.
  if (normalized === 'the president of the united states' || normalized === 'president of the united states') variants.add('president');
  if (normalized.includes('united states congress')) variants.add('congress');
  if (normalized.includes('united states constitution')) variants.add('constitution');
  if (normalized.includes('vice president of the united states')) variants.add('vice president');

  return variants;
}

function editDistance(left: string, right: string) {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);

  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    let diagonal = previous[0];
    previous[0] = leftIndex;

    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const saved = previous[rightIndex];
      previous[rightIndex] = Math.min(
        previous[rightIndex] + 1,
        previous[rightIndex - 1] + 1,
        diagonal + Number(left[leftIndex - 1] !== right[rightIndex - 1])
      );
      diagonal = saved;
    }
  }

  return previous[right.length];
}

export function isCorrectCivicsAnswer(
  question: CivicsQuestion,
  submittedAnswer: string,
  tolerance = 0,
  resolveDynamicAnswer?: DynamicAnswerResolver
) {
  if (question.dynamic) {
    const dynamicResult = resolveDynamicAnswer?.(question, submittedAnswer);
    return dynamicResult ?? false;
  }

  const normalizedSubmission = normalizeCivicsAnswer(submittedAnswer);
  if (!normalizedSubmission) return false;

  if ((historicalPersonVariants[question.id] ?? []).some((variant) => normalizeCivicsAnswer(variant) === normalizedSubmission)) return true;
  if (knownGivenNames.has(normalizedSubmission)) return false;

  const acceptedAnswers = [...question.acceptedAnswers, ...(civicsAnswerVariants[question.id] ?? [])];
  const requiresExactMatch = /^(who|what is the name|name your)\b/i.test(question.prompt);

  return acceptedAnswers.some((acceptedAnswer) => {
    const variants = acceptedVariants(acceptedAnswer);
    if (variants.has(normalizedSubmission)) return true;
    if (hasEquivalentCivicWording(normalizedSubmission, acceptedAnswer)) return true;

    if (!requiresExactMatch && isMeaningfulShortForm(normalizedSubmission, acceptedAnswer)) return true;

    const isNumericAnswer = /\d/.test(acceptedAnswer) || Boolean(numberVariant(acceptedAnswer.replace(/\([^)]*\)/g, ' ')));
    return !requiresExactMatch && !isNumericAnswer && [...variants].some((variant) => {
      const minimumLength = tolerance <= 1 ? 4 : 6;
      return variant.length >= minimumLength
        && normalizedSubmission.length >= minimumLength
        && editDistance(normalizedSubmission, variant) <= tolerance;
    });
  });
}

export function validateStableJurisdictionAnswer(question: CivicsQuestion, submittedAnswer: string, jurisdictionCode: string) {
  const jurisdiction = jurisdictionByCode(jurisdictionCode);
  if (!jurisdiction) return false;
  const answer = normalizeCivicsAnswer(submittedAnswer);
  if (question.id === 62) {
    if (jurisdiction.code === 'DC') return answer === 'dc is not a state' || answer === 'district of columbia is not a state' || answer === 'no state capital' || answer === 'dc has no state capital';
    return answer === normalizeCivicsAnswer(jurisdiction.capital);
  }
  if (question.id === 23 && !jurisdiction.hasSenators) return answer === 'no us senators' || answer === 'no senators' || answer === 'there are no us senators';
  if (question.id === 61 && !jurisdiction.hasGovernor) return answer === 'no governor' || answer === 'dc has no governor' || answer === 'district of columbia has no governor';
  return false;
}

export function validateSupportedDynamicAnswer(question: CivicsQuestion, submittedAnswer: string, jurisdictionCode: string) {
  if (!isSupportedDynamicQuestion(question.id, jurisdictionCode)) return undefined;
  if (question.id === 62) return validateStableJurisdictionAnswer(question, submittedAnswer, jurisdictionCode);
  if (question.id === 23) {
    const jurisdiction = jurisdictionByCode(jurisdictionCode);
    if (!jurisdiction?.hasSenators) return validateStableJurisdictionAnswer(question, submittedAnswer, jurisdictionCode);
    return matchesOfficeholderName(submittedAnswer, senatorsByState[jurisdictionCode] ?? []);
  }
  if (question.id === 61) {
    const jurisdiction = jurisdictionByCode(jurisdictionCode);
    if (!jurisdiction?.hasGovernor) return validateStableJurisdictionAnswer(question, submittedAnswer, jurisdictionCode);
    const governor = governorsByStateName[jurisdiction.name];
    return governor ? matchesOfficeholderName(submittedAnswer, [governor]) : undefined;
  }
  const officeholders = nationalOfficeholders[question.id];
  return officeholders ? matchesOfficeholderName(submittedAnswer, officeholders) : undefined;
}

/**
 * For officeholder questions, a last name is normally enough. First names matter only
 * when the maintained lookup has more than one relevant official with that last name.
 */
export function matchesOfficeholderName(submittedAnswer: string, officeholders: string[]) {
  const submitted = normalizeCivicsAnswer(submittedAnswer);
  if (!submitted) return false;

  const matchingFullNames = officeholders.filter((name) => normalizeCivicsAnswer(name) === submitted);
  if (matchingFullNames.length) return true;

  const matchingLastNames = officeholders.filter((name) => {
    const parts = normalizeCivicsAnswer(name).split(' ');
    return parts[parts.length - 1] === submitted;
  });

  // A last name is accepted only if it identifies one officeholder in this question's lookup.
  return matchingLastNames.length === 1;
}
