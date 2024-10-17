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
  Money,
  moneySchema,
  Talent,
  talentSchema,
  VitalStat,
  vitalStatSchema,
  Weapon,
  weaponSchema,
} from "./commonSchema";

export interface BrigandyneSecondRoleActorSystem {
  type: string;
  action: number;
  cover: number;
  protection: number;
  initiative: number;
  health: VitalStat;
  state: string;
  money: Money;
  abilities: CaracModBaseCarr[];
  weapons: Weapon[];
  armors: Armor[];
  bags: Bag[];
  notes: string;
  notes2: string;
  talents: Talent[];
}

export const brigandyneSecondRoleActorSchema = {
  type: new fields.StringField({ initial: "secondrole" }),
  action: new fields.NumberField({ initial: 0 }),
  cover: new fields.NumberField({ initial: 0 }),
  protection: new fields.NumberField({ initial: 0 }),
  initiative: new fields.NumberField({ initial: 0 }),
  health: new fields.SchemaField(vitalStatSchema()),
  state: new fields.StringField({ initial: "" }),
  money: new fields.SchemaField(moneySchema()),
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

  // Second Role + First Role
  talents: new fields.ArrayField(new fields.SchemaField(talentSchema()), {
    initial: Array(defaultLenght.talent).fill({
      name: "",
      description: "",
    }),
  }),
};

export type BrigandyneSecondRoleActorSchema =
  typeof brigandyneSecondRoleActorSchema;
