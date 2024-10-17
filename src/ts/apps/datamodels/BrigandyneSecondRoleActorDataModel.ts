import TypeDataModel = foundry.abstract.TypeDataModel;
import {
  BrigandyneSecondRoleActorSchema,
  brigandyneSecondRoleActorSchema,
} from "../schemas/BrigandyneSecondRoleActorSchema";
import BrigandyneActor from "../documents/BrigandyneActor";

export default class BrigandyneSecondRoleActorDataModel extends TypeDataModel<
  BrigandyneSecondRoleActorSchema,
  BrigandyneActor
> {
  static override defineSchema() {
    return brigandyneSecondRoleActorSchema;
  }
}
