import { StatHelpers } from "../../apps/helpers/StatHelpers";

export const calculateInit = function (com: number, mou: number, per: number) {
  let result = "";
  result = "" + StatHelpers.calculateInit(com, mou, per);
  return result;
};
