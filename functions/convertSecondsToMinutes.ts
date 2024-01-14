export default function convertSecondsToMinSec(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  let remainingSeconds: string | number = seconds % 60;

  remainingSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

  return minutes + ":" + remainingSeconds;
}
