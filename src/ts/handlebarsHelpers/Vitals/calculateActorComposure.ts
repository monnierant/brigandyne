import BrigandyneActor from "../../apps/documents/BrigandyneActor";
import { BrigandyneActorSystem } from "../../apps/schemas/BrigandyneActorSchema";
import { StatHelpers } from "../../apps/helpers/StatHelpers";
import { abilities } from "../../constants";

export const calculateActorComposure = function (actor: BrigandyneActor) {
  const syst = (actor as any).system as any as BrigandyneActorSystem;

  const base = StatHelpers.calculateComposure(
    StatHelpers.calculateAbility(syst.abilities[abilities.indexOf("VOL")]),
    StatHelpers.calculateAbility(syst.abilities[abilities.indexOf("CNS")]),
    StatHelpers.calculateAbility(syst.abilities[abilities.indexOf("COM")])
  );

  return {
    current: syst.composure.current,
    max: base + syst.composure.modificator,
    percent: Math.round(
      (syst.composure.current / (base + syst.composure.modificator)) * 100
    ),
    line: StatHelpers.calculateInstability(base + syst.composure.modificator),
    lineValue: Math.max(
      syst.composure.current -
        StatHelpers.calculateInstability(base + syst.composure.modificator),
      0
    ),
  };
};
