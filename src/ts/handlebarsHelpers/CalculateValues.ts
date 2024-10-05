export const calculateAbility = function (
  base: number,
  modificator: number,
  carrier: number
) {
  let result = "";
  result = "" + (base + modificator + carrier * 5);
  return result;
};
