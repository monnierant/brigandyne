// The import = is important so that `CaracModBaseCarr` works.
import { abilities, armorTypes, defaultLenght } from "../../constants";
import fields = foundry.data.fields;

export interface CaracModBaseCarr {
  name: string;
  base: number;
  modificator: number;
  carrier: number;
}

const caracModeBaseCarrSchema = () => ({
  name: new fields.StringField({ required: true }),
  base: new fields.NumberField({ initial: 0 }),
  modificator: new fields.NumberField({ initial: 0 }),
  carrier: new fields.NumberField({ initial: 0 }),
  carrierMax: new fields.NumberField({ initial: 0 }),
});

export interface SimpleModeBase {
  base: number;
  modificator: number;
}

const simpleModeBaseSchema = () => ({
  base: new fields.NumberField({ initial: 0 }),
  modificator: new fields.NumberField({ initial: 0 }),
});

export interface Speciality {
  name: string;
  modificator: number;
}

const specialitySchema = () => ({
  name: new fields.StringField({ initial: "" }),
  modificator: new fields.NumberField({ initial: 0 }),
});

export interface Talent {
  name: string;
  description: string;
}

const talentSchema = () => ({
  name: new fields.StringField({ initial: "" }),
  description: new fields.StringField({ initial: "" }),
});

export interface Money {
  gold: number;
  silver: number;
  copper: number;
}

const moneySchema = () => ({
  gold: new fields.NumberField({ initial: 0 }),
  silver: new fields.NumberField({ initial: 0 }),
  copper: new fields.NumberField({ initial: 0 }),
});

export interface VitalStat {
  current: number;
  base: number;
  modificator: number;
  line: number;
}

const vitalStatSchema = () => ({
  current: new fields.NumberField({ initial: 0 }),
  base: new fields.NumberField({ initial: 0 }),
  modificator: new fields.NumberField({ initial: 0 }),
  line: new fields.NumberField({ initial: 0 }),
});

export interface Bag {
  type: string;
  content: string;
}

const bagSchema = () => ({
  type: new fields.StringField({ initial: "" }),
  content: new fields.StringField({ initial: "" }),
});

export interface Weapon {
  name: string;
  damage: number;
  properties: string;
}

const weaponSchema = () => ({
  name: new fields.StringField({ initial: "" }),
  damage: new fields.NumberField({ initial: 0 }),
  properties: new fields.StringField({ initial: "" }),
});

export interface Experience {
  current: number;
  total: number;
  spent: number;
}

const experienceSchema = () => ({
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

const armorSchema = () => ({
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

const spellSchema = () => ({
  name: new fields.StringField({ initial: "" }),
  difficulty: new fields.NumberField({ initial: 0 }),
  type: new fields.StringField({ initial: "" }),
  duration: new fields.NumberField({ initial: 0 }),
  range: new fields.NumberField({ initial: 0 }),
  resistance: new fields.StringField({ initial: "-" }),
  formula: new fields.StringField({ initial: "" }),
  description: new fields.StringField({ initial: "" }),
});

export interface BrigandyneActorSystem {
  carrier: string;
  virtue: string;
  vice: string;
  archetype: string;
  destiny: number;
  cover: number;
  protection: number;
  initiative: SimpleModeBase;
  health: VitalStat;
  composure: VitalStat;
  state: string;
  abilities: CaracModBaseCarr[];
  specialities: Speciality[];
  talents: Talent[];
  money: Money;
  weapons: Weapon[];
  armors: Armor[];
  bags: Bag[];
  notes: string;
  notes2: string;
  properties: string[];
  language: string;
  residual: number;
  crisis: number;
  experience: Experience;
  experienceDetails: string;
  experienceDetails2: string;
  smallDescription: string;
  origin: string;
  motivation: string;
  spells: Spell[];
}

export const brigandyneActorSchema = {
  carrier: new fields.StringField({ initial: "" }),
  virtue: new fields.StringField({ initial: "" }),
  vice: new fields.StringField({ initial: "" }),
  archetype: new fields.StringField({ initial: "" }),
  destiny: new fields.NumberField({ initial: 0 }),
  cover: new fields.NumberField({ initial: 0 }),
  protection: new fields.NumberField({ initial: 0 }),
  initiative: new fields.SchemaField(simpleModeBaseSchema()),
  health: new fields.SchemaField(vitalStatSchema()),
  composure: new fields.SchemaField(vitalStatSchema()),
  state: new fields.StringField({ initial: "" }),
  abilities: new fields.ArrayField(
    new fields.SchemaField(caracModeBaseCarrSchema()),
    {
      initial: abilities.map((name: string) => ({
        name: name,
        base: 0,
        modificator: 0,
        carrier: 0,
        carrierMax: 0,
      })),
    }
  ),
  specialities: new fields.ArrayField(
    new fields.SchemaField(specialitySchema()),
    {
      initial: Array(defaultLenght.speciality).fill({
        name: "",
        modifier: 0,
      }),
    }
  ),
  talents: new fields.ArrayField(new fields.SchemaField(talentSchema()), {
    initial: Array(defaultLenght.talent).fill({
      name: "",
      description: "",
    }),
  }),
  money: new fields.SchemaField(moneySchema()),
  weapons: new fields.ArrayField(new fields.SchemaField(weaponSchema()), {
    initial: Array(defaultLenght.weapons).fill({
      name: "",
      damage: -3,
      properties: "",
    }),
  }),
  armors: new fields.ArrayField(new fields.SchemaField(armorSchema()), {
    initial: armorTypes.map((type: string) => ({
      name: "",
      type: type,
      protection: 0,
      coverage: 0,
      properties: "",
    })),
  }),
  bags: new fields.ArrayField(new fields.SchemaField(bagSchema()), {
    initial: Array(defaultLenght.bags).fill({
      type: "",
      content: "",
    }),
  }),
  notes: new fields.StringField({ initial: "" }),
  notes2: new fields.StringField({ initial: "" }),
  properties: new fields.ArrayField(new fields.StringField(), {
    initial: Array(defaultLenght.properties).fill(""),
  }),
  language: new fields.StringField({ initial: "" }),
  residual: new fields.NumberField({ initial: 0 }),
  crisis: new fields.NumberField({ initial: 0 }),
  experience: new fields.SchemaField(experienceSchema(), {
    initial: {
      current: 0,
      total: 0,
      spent: 0,
    },
  }),
  experienceDetails: new fields.StringField({ initial: "" }),
  experienceDetails2: new fields.StringField({ initial: "" }),
  smallDescription: new fields.StringField({ initial: "" }),
  origin: new fields.StringField({ initial: "" }),
  motivation: new fields.StringField({ initial: "" }),
  spells: new fields.ArrayField(new fields.SchemaField(spellSchema()), {
    initial: [],
  }),
};

export type BrigandyneActorSchema = typeof brigandyneActorSchema;
