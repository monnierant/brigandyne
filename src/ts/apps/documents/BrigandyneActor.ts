import TypeDataModel = foundry.abstract.TypeDataModel;
import {
  BrigandyneActorSchema,
  brigandyneActorSchema,
} from "../schemas/BrigandyneActorSchema";

export default class BrigandyneActor extends TypeDataModel<
  BrigandyneActorSchema,
  Actor
> {
  static override defineSchema() {
    return brigandyneActorSchema;
  }
}
