// The import = is important so that `CaracModBaseCarr` works.
import { abilities } from "../../constants";
import fields = foundry.data.fields;

const caracModeBaseCarrSchema = {
  name: new fields.StringField({ required: true }),
  base: new fields.NumberField({ initial: 0 }),
  modificator: new fields.NumberField({ initial: 0 }),
  carrier: new fields.NumberField({ initial: 0 }),
};

export type CaracModBaseCarrSchema = typeof caracModeBaseCarrSchema;

export const brigandyneActorSchema = {
  destiny: new fields.NumberField({ initial: 0 }),
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
};

export type BrigandyneActorSchema = typeof brigandyneActorSchema;
