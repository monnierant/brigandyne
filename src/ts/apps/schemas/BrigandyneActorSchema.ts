// The import = is important so that `CaracModBaseCarr` works.
import { abilities, armorTypes, defaultLenght } from "../../constants";
import fields = foundry.data.fields;
import {
  Armor,
  armorSchema,
  Bag,
  bagSchema,
  CaracModBaseCarr,
  caracModeBaseCarrSchema,
  Controllers,
  controllersSchema,
  Experience,
  experienceSchema,
  Money,
  moneySchema,
  Speciality,
  specialitySchema,
  Spell,
  spellSchema,
  Talent,
  talentSchema,
  VitalStat,
  vitalStatSchema,
  Weapon,
  weaponSchema,
} from "./commonSchema";

export interface BrigandyneActorSystem {
  type: string;
  carrier: string;
  virtue: string;
  vice: string;
  archetype: string;
  destiny: number;
  cover: number;
  protection: number;
  initiative: number;
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
  controllers: Controllers;
}

export const brigandyneActorSchema = {
  type: new fields.StringField({ initial: "character" }),
  carrier: new fields.StringField({ initial: "" }),
  virtue: new fields.StringField({ initial: "" }),
  vice: new fields.StringField({ initial: "" }),
  archetype: new fields.StringField({ initial: "" }),
  destiny: new fields.NumberField({ initial: 0 }),
  cover: new fields.NumberField({ initial: 0 }),
  protection: new fields.NumberField({ initial: 0 }),
  initiative: new fields.NumberField({ initial: 0 }),
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
  controllers: new fields.SchemaField(controllersSchema()),
};

export type BrigandyneActorSchema = typeof brigandyneActorSchema;
