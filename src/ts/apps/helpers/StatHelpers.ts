import { abilities } from "../../constants";
import BrigandyneActor from "../documents/BrigandyneActor";
import {
  BrigandyneActorSystem,
  CaracModBaseCarr,
} from "../schemas/BrigandyneActorSchema";

export const StatHelpers = {
  calculateInit: function (com: number, mou: number, per: number) {
    return Math.ceil(com / 10) + Math.ceil(mou / 10) + Math.ceil(per / 10);
  },

  calculateVitality: function (forc: number, end: number, vol: number) {
    return Math.ceil(forc / 5) + Math.ceil(end / 5) + Math.ceil(vol / 10);
  },

  calculateLine: function (vitality: number) {
    return Math.ceil(vitality / 2);
  },

  calculateComposure: function (vol: number, cns: number, com: number) {
    return Math.ceil(vol / 5) + Math.ceil(cns / 10) + Math.ceil(com / 10);
  },

  calculateInstability: function (composure: number) {
    return Math.ceil(composure / 4);
  },

  calculateAbility: function (ability: CaracModBaseCarr) {
    return ability.base + ability.modificator + ability.carrier * 5;
  },

  calculateActorHealth: function (actor: BrigandyneActor) {
    const syst = actor.system as any as BrigandyneActorSystem;

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
        syst.composure.base -
          StatHelpers.calculateInstability(base + syst.composure.modificator),
        0
      ),
    };
  },

  calculateActorComposure: function (actor: BrigandyneActor) {
    const syst = actor.system as any as BrigandyneActorSystem;

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
        syst.composure.base -
          StatHelpers.calculateInstability(base + syst.composure.modificator),
        0
      ),
    };
  },
};
