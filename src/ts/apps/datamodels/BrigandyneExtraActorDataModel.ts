import TypeDataModel = foundry.abstract.TypeDataModel;
import {
  BrigandyneExtraActorSchema,
  brigandyneExtraActorSchema,
} from "../schemas/BrigandyneExtraActorSchema";
import BrigandyneActor from "../documents/BrigandyneActor";

export default class BrigandyneExtraActorDataModel extends TypeDataModel<
  BrigandyneExtraActorSchema,
  BrigandyneActor
> {
  static override defineSchema() {
    return brigandyneExtraActorSchema;
  }
}
