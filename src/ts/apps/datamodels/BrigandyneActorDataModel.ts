import TypeDataModel = foundry.abstract.TypeDataModel;
import {
  BrigandyneActorSchema,
  brigandyneActorSchema,
} from "../schemas/BrigandyneActorSchema";
import BrigandyneActor from "../documents/BrigandyneActor";

export default class BrigandyneActorDataModel extends TypeDataModel<
  BrigandyneActorSchema,
  BrigandyneActor
> {
  static override defineSchema() {
    return brigandyneActorSchema;
  }
}
