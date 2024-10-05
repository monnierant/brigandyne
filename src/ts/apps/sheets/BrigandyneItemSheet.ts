import { moduleId } from "../../constants";

export default class BrigandyneItemSheet extends ItemSheet {
  override get template() {
    return `systems/${moduleId}/templates/sheets/item/item-sheet.hbs`;
  }
}
