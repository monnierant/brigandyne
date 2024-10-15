import { abilities } from "../../constants";
import BrigandyneActor from "../documents/BrigandyneActor";
import {
  BrigandyneActorSystem,
  CaracModBaseCarr,
} from "../schemas/BrigandyneActorSchema";

export const StatHelpers = {
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
      lineValue: Math.round(
        (Math.max(
          syst.health.current -
            StatHelpers.calculateLine(base + syst.health.modificator),
          0
        ) /
          (base + syst.health.modificator)) *
          100
      ),
    };
  },

  calculateActorInit: function (actor: BrigandyneActor) {
    const syst = actor.system as any as BrigandyneActorSystem;

    return (
      Math.ceil(
        StatHelpers.calculateAbility(syst.abilities[abilities.indexOf("COM")]) /
          10
      ) +
      Math.ceil(
        StatHelpers.calculateAbility(syst.abilities[abilities.indexOf("MOU")]) /
          10
      ) +
      Math.ceil(
        StatHelpers.calculateAbility(syst.abilities[abilities.indexOf("PER")]) /
          10
      )
    );
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
      lineValue: Math.round(
        (StatHelpers.calculateInstability(base + syst.composure.modificator) /
          (base + syst.composure.modificator)) *
          100
      ),
    };
  },
};
