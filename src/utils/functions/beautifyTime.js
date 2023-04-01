const build2DigitsTime = (time) => {
  return (new Array(2).join("0") + time).slice(-2);
};

export const beautifyTime = (floatingSecondTime) => {
  const minutes = Math.floor(floatingSecondTime / 60);
  const seconds = Math.floor(floatingSecondTime - minutes * 60);
  const milliseconds = Math.floor(
    (floatingSecondTime - (minutes * 60 + seconds)) * 100
  );
  const beautifiedTime =
    build2DigitsTime(minutes) +
    ":" +
    build2DigitsTime(seconds) +
    ":" +
    build2DigitsTime(milliseconds);
  return beautifiedTime;
};
