export type Jurisdiction = { code: string; name: string; capital: string; hasGovernor: boolean; hasSenators: boolean };

const states: [string, string, string][] = [
  ['AL','Alabama','Montgomery'],['AK','Alaska','Juneau'],['AZ','Arizona','Phoenix'],['AR','Arkansas','Little Rock'],['CA','California','Sacramento'],['CO','Colorado','Denver'],['CT','Connecticut','Hartford'],['DE','Delaware','Dover'],['FL','Florida','Tallahassee'],['GA','Georgia','Atlanta'],['HI','Hawaii','Honolulu'],['ID','Idaho','Boise'],['IL','Illinois','Springfield'],['IN','Indiana','Indianapolis'],['IA','Iowa','Des Moines'],['KS','Kansas','Topeka'],['KY','Kentucky','Frankfort'],['LA','Louisiana','Baton Rouge'],['ME','Maine','Augusta'],['MD','Maryland','Annapolis'],['MA','Massachusetts','Boston'],['MI','Michigan','Lansing'],['MN','Minnesota','Saint Paul'],['MS','Mississippi','Jackson'],['MO','Missouri','Jefferson City'],['MT','Montana','Helena'],['NE','Nebraska','Lincoln'],['NV','Nevada','Carson City'],['NH','New Hampshire','Concord'],['NJ','New Jersey','Trenton'],['NM','New Mexico','Santa Fe'],['NY','New York','Albany'],['NC','North Carolina','Raleigh'],['ND','North Dakota','Bismarck'],['OH','Ohio','Columbus'],['OK','Oklahoma','Oklahoma City'],['OR','Oregon','Salem'],['PA','Pennsylvania','Harrisburg'],['RI','Rhode Island','Providence'],['SC','South Carolina','Columbia'],['SD','South Dakota','Pierre'],['TN','Tennessee','Nashville'],['TX','Texas','Austin'],['UT','Utah','Salt Lake City'],['VT','Vermont','Montpelier'],['VA','Virginia','Richmond'],['WA','Washington','Olympia'],['WV','West Virginia','Charleston'],['WI','Wisconsin','Madison'],['WY','Wyoming','Cheyenne']
];

export const jurisdictions: Jurisdiction[] = [
  ...states.map(([code, name, capital]) => ({ code, name, capital, hasGovernor: true, hasSenators: true })),
  { code: 'DC', name: 'District of Columbia', capital: '', hasGovernor: false, hasSenators: false },
  { code: 'PR', name: 'Puerto Rico', capital: 'San Juan', hasGovernor: true, hasSenators: false },
  { code: 'GU', name: 'Guam', capital: 'Hagåtña', hasGovernor: true, hasSenators: false },
  { code: 'VI', name: 'U.S. Virgin Islands', capital: 'Charlotte Amalie', hasGovernor: true, hasSenators: false },
  { code: 'MP', name: 'Northern Mariana Islands', capital: 'Saipan', hasGovernor: true, hasSenators: false },
  { code: 'AS', name: 'American Samoa', capital: 'Pago Pago', hasGovernor: true, hasSenators: false }
];

export function jurisdictionByCode(code: string) { return jurisdictions.find((item) => item.code === code); }
import { governorsByStateName, nationalOfficeholders, officeholderDataIsCurrent, senatorsByState } from './officeholders';

export function isSupportedDynamicQuestion(questionId: number, jurisdictionCode: string) {
  // A representative requires a verified district lookup. State alone is ambiguous.
  if (questionId === 29) return false;
  // Current names are never shown when the locally maintained data is overdue.
  if (questionId !== 62 && !officeholderDataIsCurrent()) return false;
  if (questionId === 62) return Boolean(jurisdictionByCode(jurisdictionCode));
  if (questionId === 23) return Boolean(senatorsByState[jurisdictionCode]?.length) || ['DC', 'PR', 'GU', 'VI', 'MP', 'AS'].includes(jurisdictionCode);
  if (questionId === 61) return Boolean(governorsByStateName[jurisdictionByCode(jurisdictionCode)?.name ?? '']) || jurisdictionCode === 'DC';
  return Boolean(nationalOfficeholders[questionId]);
}
