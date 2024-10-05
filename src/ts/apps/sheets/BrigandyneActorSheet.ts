import { moduleId } from "../../constants";

export default class BrigandyneItemSheet extends ActorSheet {
  // Define the template to use for this sheet
  override get template() {
    return `systems/${moduleId}/templates/sheets/actor/actor-sheet.hbs`;
  }
}
