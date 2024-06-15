import { DateTime } from "luxon";

export function formatNotificationDate(dateStr: string) {
  const now = DateTime.now();
  const date = DateTime.fromISO(dateStr);
  const diffInMinutes = now.diff(date, "minutes").toObject().minutes ?? 0;
  const diffInHours = now.diff(date, "hours").toObject().hours ?? 0;
  const diffInDays = now.diff(date, "days").toObject().days ?? 0;
  if (diffInMinutes < 1) {
    return "à l'instant";
  } else if (diffInMinutes < 60) {
    return `${Math.round(diffInMinutes)}m`;
  } else if (diffInHours < 24) {
    return `${Math.round(diffInHours)}h`;
  } else if (diffInDays < 7) {
    return `${Math.round(diffInDays)}j`;
  } else {
    return date.toFormat("dd LLL");
  }
}
