// The import = is important so that `CaracModBaseCarr` works.
import { abilities, defaultLenght } from "../../constants";
import fields = foundry.data.fields;

const caracModeBaseCarrSchema = {
  name: new fields.StringField({ required: true }),
  base: new fields.NumberField({ initial: 0 }),
  modificator: new fields.NumberField({ initial: 0 }),
  carrier: new fields.NumberField({ initial: 0 }),
};

export type CaracModBaseCarrSchema = typeof caracModeBaseCarrSchema;

const specialitySchema = {
  name: new fields.StringField({ initial: "" }),
  modifier: new fields.NumberField({ initial: 0 }),
};

const talentSchema = {
  name: new fields.StringField({ initial: "" }),
  description: new fields.StringField({ initial: "" }),
};

export const brigandyneActorSchema = {
  carrier: new fields.StringField({ initial: "" }),
  virtue: new fields.StringField({ initial: "" }),
  vice: new fields.StringField({ initial: "" }),
  archetype: new fields.StringField({ initial: "" }),
  destiny: new fields.NumberField({ initial: 0 }),
  cover: new fields.NumberField({ initial: 0 }),
  protection: new fields.NumberField({ initial: 0 }),
  abilities: new fields.ArrayField(
    new fields.SchemaField(caracModeBaseCarrSchema),
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
    new fields.SchemaField(specialitySchema),
    {
      initial: Array(defaultLenght.speciality).fill({
        name: "",
        modifier: 0,
      }),
    }
  ),
  talents: new fields.ArrayField(new fields.SchemaField(talentSchema), {
    initial: Array(defaultLenght.talent).fill({
      name: "",
      description: "",
    }),
  }),
};

export type BrigandyneActorSchema = typeof brigandyneActorSchema;
