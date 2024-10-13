import { moduleId } from "../../constants";
import BrigandyneActor from "../documents/BrigandyneActor";
import { brigandyneActorSchema } from "../schemas/BrigandyneActorSchema";

export default class BrigandyneItemSheet extends ActorSheet {
  constructor(object: any, options = {}) {
    super(object, { ...options, width: 620 });
  }

  // Define the template to use for this sheet
  override get template() {
    return `systems/${moduleId}/templates/sheets/actor/actor-sheet.hbs`;
  }

  // Event Listeners
  override activateListeners(html: JQuery) {
    super.activateListeners(html);
    // Roll handlers, click handlers, etc. would go here.
    html
      .find(".brigandyne-ability-roll")
      .on("click", this._onRollDice.bind(this));

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    if (typeof this.actor.system == typeof brigandyneActorSchema) {
      this.activateListenersPC(html);
    }
  }

  private activateListenersPC(html: JQuery) {
    html.find(".cowboy-admin-action-health");
    // .on("click", this._onDamage.bind(this));
  }

  // Event Handlers
  private async _onRollDice(event: JQuery.ClickEvent) {
    event.preventDefault();
    const abilityId = event.currentTarget.dataset.ability;
    console.log("abilityId", abilityId);
    console.log("this.actor", this.actor);
    console.log(
      "(this.actor as BrigandyneActor)",
      this.actor as BrigandyneActor
    );
    console.log(
      "(this.actor as BrigandyneActor).test()",
      (this.actor as BrigandyneActor).test()
    );
    await (this.actor as BrigandyneActor).rollDialog(abilityId);
  }
}
