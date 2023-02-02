export const formatMinDigits = (number: Number, minDigit = 2) => {
  return number.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
};
