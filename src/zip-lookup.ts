// The district table is large and only a student who opts into ZIP precision ever needs it, so it
// is imported dynamically. Nothing here makes a network request: the table ships with the app and
// the ZIP is resolved on the device.

let districtTable: Map<string, number[]> | null = null;
let pendingLoad: Promise<Map<string, number[]>> | null = null;

async function loadDistrictTable() {
  if (districtTable) return districtTable;
  pendingLoad ??= import('./zip-districts').then(({ zipDistrictTable }) => {
    const parsed = new Map<string, number[]>();
    for (const line of zipDistrictTable.split('\n')) {
      const [zip, state, districts] = line.split(':');
      if (!zip || !state || !districts) continue;
      parsed.set(`${state}:${zip}`, districts.split('.').map(Number));
    }
    districtTable = parsed;
    return parsed;
  });
  return pendingLoad;
}

export function isWellFormedZip(zip: string) {
  return /^\d{5}$/.test(zip.trim());
}

/**
 * Resolves a ZIP code to the congressional districts it covers within the student's own
 * jurisdiction. Returns null when the ZIP is unknown or belongs to a different state, which
 * leaves the caller on the less precise but never-wrong state-wide tier. A mistyped ZIP must
 * not be able to narrow acceptance to the wrong district and mark a correct answer wrong.
 */
export async function districtsForZip(zip: string, jurisdictionCode: string) {
  if (!isWellFormedZip(zip) || !jurisdictionCode) return null;
  const table = await loadDistrictTable();
  return table.get(`${jurisdictionCode}:${zip.trim()}`) ?? null;
}
