import TypeDataModel = foundry.abstract.TypeDataModel;
import {
  BrigandyneFirstRoleActorSchema,
  brigandyneFirstRoleActorSchema,
} from "../schemas/BrigandyneFirstRoleActorSchema";
import BrigandyneActor from "../documents/BrigandyneActor";

export default class BrigandyneFirstRoleActorDataModel extends TypeDataModel<
  BrigandyneFirstRoleActorSchema,
  BrigandyneActor
> {
  static override defineSchema() {
    return brigandyneFirstRoleActorSchema;
  }
}
