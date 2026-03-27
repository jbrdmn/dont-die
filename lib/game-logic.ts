/** Returns ms since midnight UTC */
export function msSinceMidnightUTC(): number {
  const now = new Date();
  return (
    now.getUTCHours() * 3600000 +
    now.getUTCMinutes() * 60000 +
    now.getUTCSeconds() * 1000 +
    now.getUTCMilliseconds()
  );
}

const MS_IN_DAY = 86400000;

/** Progress from 0.0 (safe, midnight) to 1.0 (cliff edge, next midnight) */
export function lemmingProgress(): number {
  return msSinceMidnightUTC() / MS_IN_DAY;
}

/** Today's date as YYYY-MM-DD in UTC */
export function todayUTC(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Whether the lemming was saved today */
export function isSavedToday(lastSavedDate: string | null): boolean {
  if (!lastSavedDate) return false;
  return lastSavedDate === todayUTC();
}

/** Whether the lemming should be dead (last saved before yesterday) */
export function shouldBeDead(lastSavedDate: string | null): boolean {
  if (!lastSavedDate) return true;
  const yesterday = new Date();
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);
  return lastSavedDate < yesterdayStr;
}

/** Format ms remaining as HH:MM:SS */
export function formatCountdown(msRemaining: number): string {
  if (msRemaining <= 0) return "00:00:00";
  const h = Math.floor(msRemaining / 3600000);
  const m = Math.floor((msRemaining % 3600000) / 60000);
  const s = Math.floor((msRemaining % 60000) / 1000);
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

/** Ms remaining until next midnight UTC */
export function msUntilMidnightUTC(): number {
  return MS_IN_DAY - msSinceMidnightUTC();
}
