import BrigandyneActor from "../../apps/documents/BrigandyneActor";
import { BrigandyneActorSystem } from "../../apps/schemas/BrigandyneActorSchema";
import { StatHelpers } from "../../apps/helpers/StatHelpers";
import { abilities } from "../../constants";

export const calculateActorHealth = function (actor: BrigandyneActor) {
  const syst = actor.system as any as BrigandyneActorSystem;

  const base = StatHelpers.calculateVitality(
    StatHelpers.calculateAbility(syst.abilities[abilities.indexOf("FOR")]),
    StatHelpers.calculateAbility(syst.abilities[abilities.indexOf("END")]),
    StatHelpers.calculateAbility(syst.abilities[abilities.indexOf("VOL")])
  );

  return {
    current: syst.health.current,
    max: base + syst.health.modificator,
    percent: Math.round(
      (syst.health.current / (base + syst.health.modificator)) * 100
    ),
    line: StatHelpers.calculateLine(base + syst.health.modificator),
    lineValue: Math.max(
      syst.health.current -
        StatHelpers.calculateLine(base + syst.health.modificator),
      0
    ),
  };
};
