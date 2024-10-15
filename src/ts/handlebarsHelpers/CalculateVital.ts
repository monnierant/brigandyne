export const calculateVital = function (
  actual: number,
  base: number,
  modificator: number
) {
  let result = "";
  if (base + modificator === 0) {
    return "0";
  }
  result = "" + (actual / (base + modificator)) * 100;
  return result;
};
