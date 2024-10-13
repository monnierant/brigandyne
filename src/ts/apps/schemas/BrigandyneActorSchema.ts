// The import = is important so that `CaracModBaseCarr` works.
import { abilities, defaultLenght } from "../../constants";
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
  wound: number;
  state: string;
  job: string;
  abilities: CaracModBaseCarr[];
  specialities: Speciality[];
  talents: Talent[];
  money: Money;
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
  wound: new fields.NumberField({ initial: 0 }),
  state: new fields.StringField({ initial: "" }),
  job: new fields.StringField({ initial: "" }),
  abilities: new fields.ArrayField(
    new fields.SchemaField(caracModeBaseCarrSchema()),
    {
      initial: abilities.map((name: string) => ({
        name: name,
        base: 0,
        modificator: 0,
        carrier: 0,
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
};

export type BrigandyneActorSchema = typeof brigandyneActorSchema;
