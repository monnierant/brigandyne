import { moduleId, tabs } from "../../constants";
import BrigandyneActor from "../documents/BrigandyneActor";
import { brigandyneActorSchema } from "../schemas/BrigandyneActorSchema";

export default class BrigandyneItemSheet extends ActorSheet {
  constructor(object: any, options = {}) {
    super(object, { ...options, width: 610, height: 750 });
  }

  private readonly tabs: string[] = tabs;
  private tab: string = "abilities";

  // Define the template to use for this sheet
  override get template() {
    return `systems/${moduleId}/templates/sheets/actor/actor-sheet.hbs`;
  }

  // Data to be passed to the template when rendering
  override getData() {
    const data: any = super.getData();
    // data.actor = this.actor as BrigandyneActor;
    data.tabs = this.tabs;
    data.tab = this.tab;
    return data;
  }

  // Event Listeners
  override activateListeners(html: JQuery) {
    super.activateListeners(html);
    // Roll handlers, click handlers, etc. would go here.
    html
      .find(".brigandyne-ability-roll")
      .on("click", this._onRollDice.bind(this));

    html.find(".brigandyne-tab").on("click", this._onTabChange.bind(this));

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
    await (this.actor as BrigandyneActor).rollDialog(abilityId);
  }

  private _onTabChange(event: JQuery.ClickEvent) {
    event.preventDefault();
    this.tab = event.currentTarget.dataset.tab;
    this.render();
  }
}
