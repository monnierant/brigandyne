import { id } from "../system.json";
// import { Mouvement, Colors } from "./types";

export const defaultLenght = {
  speciality: 6,
  talent: 5,
  weapons: 4,
  kits: 4,
  properties: 4,
  bags: 3,
};

// export const tabs = {
//   character: ["abilities", "inventory", "histo", "spells"],
//   extra: ["abilities"],
//   secondrole: ["abilities"],
//   firstrole: ["abilities", "spells"],
// };
export const tabs = ["abilities", "inventory", "histo", "spells"];

export const spellTypes = ["spell", "ritual", "trick"];

export const spellDifficulties = [+20, +10, 0, -10, -20, -30];

export const armorTypes = ["head", "shield", "body"];

export const moduleId: string = id;

export const abilities: string[] = [
  "COM",
  "CNS",
  "DIS",
  "END",
  "FOR",
  "HAB",
  "MAG",
  "MOU",
  "PER",
  "SOC",
  "SUR",
  "TIR",
  "VOL",
];
