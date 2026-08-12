// Kept out of officeholders.ts and representatives.ts on purpose: those files are overwritten
// wholesale by their updater scripts, so any logic living there is lost on the next run.

import { officeholderDataLastVerified } from './officeholders';
import { representativeDataLastVerified } from './representatives';

/** How stale the data may get before current-officeholder questions are withheld. */
const maximumDataAgeInDays = 45;

function isWithinMaximumAge(lastVerifiedText: string, today: Date) {
  const lastVerified = new Date(lastVerifiedText);
  if (Number.isNaN(lastVerified.valueOf())) return false;
  const ageInDays = (today.valueOf() - lastVerified.valueOf()) / 86_400_000;
  return ageInDays <= maximumDataAgeInDays;
}

/** The updater runs monthly, so this allows one missed run before the data is treated as overdue. */
export function officeholderDataIsCurrent(today = new Date()) {
  return isWithinMaximumAge(officeholderDataLastVerified, today);
}

/**
 * The House roster changes with every vacancy and special election, so it has its own freshness
 * gate. District boundaries only move at redistricting, so the ZIP table is not age-checked.
 */
export function representativeDataIsCurrent(today = new Date()) {
  return isWithinMaximumAge(representativeDataLastVerified, today);
}
