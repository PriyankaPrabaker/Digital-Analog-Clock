export function setUserEnteredTime(hour, minute, seconds) {
   return new Date(new Date().setHours(hour, minute, seconds, 0))
}