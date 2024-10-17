// The import = is important so that `CaracModBaseCarr` works.
import fields = foundry.data.fields;

export interface CaracModBaseCarr {
  name: string;
  base: number;
  modificator: number;
  carrier: number;
}

export const caracModeBaseCarrSchema = () => ({
  name: new fields.StringField({ required: true }),
  base: new fields.NumberField({ initial: 0 }),
  modificator: new fields.NumberField({ initial: 0 }),
  carrier: new fields.NumberField({ initial: 0 }),
  carrierMax: new fields.NumberField({ initial: 0 }),
});

export interface Speciality {
  name: string;
  modificator: number;
}

export const specialitySchema = () => ({
  name: new fields.StringField({ initial: "" }),
  modificator: new fields.NumberField({ initial: 0 }),
});

export interface Talent {
  name: string;
  description: string;
}

export const talentSchema = () => ({
  name: new fields.StringField({ initial: "" }),
  description: new fields.StringField({ initial: "" }),
});

export interface Money {
  gold: number;
  silver: number;
  copper: number;
}

export const moneySchema = () => ({
  gold: new fields.NumberField({ initial: 0 }),
  silver: new fields.NumberField({ initial: 0 }),
  copper: new fields.NumberField({ initial: 0 }),
});

export interface VitalStat {
  current: number;
  modificator: number;
}

export const vitalStatSchema = () => ({
  current: new fields.NumberField({ initial: 0 }),
  base: new fields.NumberField({ initial: 0 }),
  modificator: new fields.NumberField({ initial: 0 }),
  line: new fields.NumberField({ initial: 0 }),
});

export interface Bag {
  type: string;
  content: string;
}

export const bagSchema = () => ({
  type: new fields.StringField({ initial: "" }),
  content: new fields.StringField({ initial: "" }),
});

export interface Weapon {
  name: string;
  damage: number;
  properties: string;
}

export const weaponSchema = () => ({
  name: new fields.StringField({ initial: "" }),
  damage: new fields.NumberField({ initial: 0 }),
  properties: new fields.StringField({ initial: "" }),
});

export interface Experience {
  current: number;
  total: number;
  spent: number;
}

export const experienceSchema = () => ({
  current: new fields.NumberField({ initial: 0 }),
  total: new fields.NumberField({ initial: 0 }),
  spent: new fields.NumberField({ initial: 0 }),
});

export interface Armor {
  name: string;
  type: string;
  protection: number;
  coverage: number;
  properties: string;
}

export const armorSchema = () => ({
  name: new fields.StringField({ initial: "" }),
  type: new fields.StringField({ initial: "" }),
  protection: new fields.NumberField({ initial: 0 }),
  coverage: new fields.NumberField({ initial: 0 }),
  properties: new fields.StringField({ initial: "" }),
});

export interface Spell {
  name: string;
  difficulty: number;
  type: string;
  duration: number;
  range: number;
  resistance: string;
  formula: string;
  description: string;
}

export const spellSchema = () => ({
  name: new fields.StringField({ initial: "" }),
  difficulty: new fields.NumberField({ initial: 0 }),
  type: new fields.StringField({ initial: "" }),
  duration: new fields.NumberField({ initial: 0 }),
  range: new fields.NumberField({ initial: 0 }),
  resistance: new fields.StringField({ initial: "-" }),
  formula: new fields.StringField({ initial: "" }),
  description: new fields.StringField({ initial: "" }),
});
