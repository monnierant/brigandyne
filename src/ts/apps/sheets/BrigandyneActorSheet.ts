import { moduleId } from "../../constants";

export default class BrigandyneItemSheet extends ActorSheet {
  constructor(object: any, options = {}) {
    super(object, { ...options, width: 620 });
  }

  // Define the template to use for this sheet
  override get template() {
    return `systems/${moduleId}/templates/sheets/actor/actor-sheet.hbs`;
  }
}
