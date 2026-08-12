export type Jurisdiction = { code: string; name: string; capital: string; hasGovernor: boolean; hasSenators: boolean; hasVotingRepresentative: boolean };

const states: [string, string, string][] = [
  ['AL','Alabama','Montgomery'],['AK','Alaska','Juneau'],['AZ','Arizona','Phoenix'],['AR','Arkansas','Little Rock'],['CA','California','Sacramento'],['CO','Colorado','Denver'],['CT','Connecticut','Hartford'],['DE','Delaware','Dover'],['FL','Florida','Tallahassee'],['GA','Georgia','Atlanta'],['HI','Hawaii','Honolulu'],['ID','Idaho','Boise'],['IL','Illinois','Springfield'],['IN','Indiana','Indianapolis'],['IA','Iowa','Des Moines'],['KS','Kansas','Topeka'],['KY','Kentucky','Frankfort'],['LA','Louisiana','Baton Rouge'],['ME','Maine','Augusta'],['MD','Maryland','Annapolis'],['MA','Massachusetts','Boston'],['MI','Michigan','Lansing'],['MN','Minnesota','Saint Paul'],['MS','Mississippi','Jackson'],['MO','Missouri','Jefferson City'],['MT','Montana','Helena'],['NE','Nebraska','Lincoln'],['NV','Nevada','Carson City'],['NH','New Hampshire','Concord'],['NJ','New Jersey','Trenton'],['NM','New Mexico','Santa Fe'],['NY','New York','Albany'],['NC','North Carolina','Raleigh'],['ND','North Dakota','Bismarck'],['OH','Ohio','Columbus'],['OK','Oklahoma','Oklahoma City'],['OR','Oregon','Salem'],['PA','Pennsylvania','Harrisburg'],['RI','Rhode Island','Providence'],['SC','South Carolina','Columbia'],['SD','South Dakota','Pierre'],['TN','Tennessee','Nashville'],['TX','Texas','Austin'],['UT','Utah','Salt Lake City'],['VT','Vermont','Montpelier'],['VA','Virginia','Richmond'],['WA','Washington','Olympia'],['WV','West Virginia','Charleston'],['WI','Wisconsin','Madison'],['WY','Wyoming','Cheyenne']
];

export const jurisdictions: Jurisdiction[] = [
  ...states.map(([code, name, capital]) => ({ code, name, capital, hasGovernor: true, hasSenators: true, hasVotingRepresentative: true })),
  // DC and the territories send a Delegate or Resident Commissioner who cannot vote on final passage.
  { code: 'DC', name: 'District of Columbia', capital: '', hasGovernor: false, hasSenators: false, hasVotingRepresentative: false },
  { code: 'PR', name: 'Puerto Rico', capital: 'San Juan', hasGovernor: true, hasSenators: false, hasVotingRepresentative: false },
  { code: 'GU', name: 'Guam', capital: 'Hagåtña', hasGovernor: true, hasSenators: false, hasVotingRepresentative: false },
  { code: 'VI', name: 'U.S. Virgin Islands', capital: 'Charlotte Amalie', hasGovernor: true, hasSenators: false, hasVotingRepresentative: false },
  { code: 'MP', name: 'Northern Mariana Islands', capital: 'Saipan', hasGovernor: true, hasSenators: false, hasVotingRepresentative: false },
  { code: 'AS', name: 'American Samoa', capital: 'Pago Pago', hasGovernor: true, hasSenators: false, hasVotingRepresentative: false }
];

export function jurisdictionByCode(code: string) { return jurisdictions.find((item) => item.code === code); }
import { governorsByStateName, nationalOfficeholders, senatorsByState } from './officeholders';
import { representativesByState } from './representatives';
import { officeholderDataIsCurrent, representativeDataIsCurrent } from './officeholderFreshness';

export function isSupportedDynamicQuestion(questionId: number, jurisdictionCode: string) {
  // A state alone cannot identify one representative, so this question accepts any member of the
  // student's delegation unless they opt into a ZIP lookup that narrows it to their district.
  if (questionId === 29) return representativeDataIsCurrent() && Boolean(representativesByState[jurisdictionCode]?.length);
  // Current names are never shown when the locally maintained data is overdue.
  if (questionId !== 62 && !officeholderDataIsCurrent()) return false;
  if (questionId === 62) return Boolean(jurisdictionByCode(jurisdictionCode));
  if (questionId === 23) return Boolean(senatorsByState[jurisdictionCode]?.length) || ['DC', 'PR', 'GU', 'VI', 'MP', 'AS'].includes(jurisdictionCode);
  if (questionId === 61) return Boolean(governorsByStateName[jurisdictionByCode(jurisdictionCode)?.name ?? '']) || jurisdictionCode === 'DC';
  return Boolean(nationalOfficeholders[questionId]);
}
