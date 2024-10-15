import { StatHelpers } from "../../apps/helpers/StatHelpers";

export const calculateComposure = function (
  vol: number,
  cns: number,
  com: number
) {
  let result = "";
  result = "" + StatHelpers.calculateComposure(vol, cns, com);
  return result;
};
