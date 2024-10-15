import { StatHelpers } from "../../apps/helpers/StatHelpers";

export const calculateVitality = function (
  com: number,
  mou: number,
  per: number
) {
  let result = "";
  result = "" + StatHelpers.calculateVitality(com, mou, per);
  return result;
};
