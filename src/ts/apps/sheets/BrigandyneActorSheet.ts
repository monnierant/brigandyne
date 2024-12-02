import {
  abilities,
  moduleId,
  spellDifficulties,
  spellTypes,
  tabs,
} from "../../constants";
import BrigandyneActor from "../documents/BrigandyneActor";
import { StatHelpers } from "../helpers/StatHelpers";
import { Spell } from "../schemas/commonSchema";

export default class BrigandyneItemSheet extends ActorSheet {
  constructor(object: any, options = {}) {
    super(object, { ...options, width: 610, height: 750 });
    console.log("this.actor.type", this.actor.type);
  }

  // private readonly tabs: string[] = tabs;
  private tab: string = "abilities";

  // Define the template to use for this sheet
  override get template() {
    return `systems/${moduleId}/templates/sheets/actor/actor-sheet-${this.actor.system.type}.hbs`;
  }

  // Data to be passed to the template when rendering
  override getData() {
    const data: any = super.getData();
    data.tabs = tabs[this.actor.system.type as keyof typeof tabs];
    data.tab = this.tab;
    data.spellTypes = spellTypes;
    data.spellDifficulties = spellDifficulties;
    data.spellResistances = ["-", ...abilities];
    data.abilities = abilities;
    data.initiative = StatHelpers.calculateActorInit(
      this.actor as BrigandyneActor
    );
    if (["extra", "secondrole", "firstrole"].includes(this.actor.system.type)) {
      data.health = StatHelpers.calculateActorNpcHealth(
        this.actor as BrigandyneActor
      );
    }
    if (this.actor.system.type === "character") {
      data.health = StatHelpers.calculateActorHealth(
        this.actor as BrigandyneActor
      );
      data.composure = StatHelpers.calculateActorComposure(
        this.actor as BrigandyneActor
      );
    }
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

    console.log("this.actor", this.actor);
    console.log("this.actor.system", this.actor.system);
    console.log("this.actor.system.type", this.actor.system.type);

    if (this.actor.system.type === "character") {
      this.activateListenersPC(html);
    }
    if (this.actor.system.type === "extra") {
      this.activateListenersFirstSecondExtraRole(html);
    }
    if (this.actor.system.type === "secondrole") {
      this.activateListenersFirstSecondRole(html);
      this.activateListenersFirstSecondExtraRole(html);
    }
    if (this.actor.system.type === "firstrole") {
      this.activateListenersFirstRole(html);
      this.activateListenersFirstSecondRole(html);
      this.activateListenersFirstSecondExtraRole(html);
    }
  }

  private activateListenersPC(html: JQuery) {
    html.find(".brigandyne-xp").on("click", this._onUpdateXp.bind(this));
    html.find(".brigandyne-spell-add").on("click", this._onAddSpell.bind(this));
    html
      .find(".brigandyne-spell-delete")
      .on("click", this._onDeleteSpell.bind(this));
    html
      .find(".brigandyne-spell-move")
      .on("click", this._onMoveSpell.bind(this));
    html
      .find(".brigandyne-health-update")
      .on("click", this._onUpdateHealth.bind(this));
    html
      .find(".brigandyne-composure-update")
      .on("click", this._onUpdateComposure.bind(this));
  }

  private activateListenersFirstSecondExtraRole(html: JQuery) {
    html
      .find(".brigandyne-health-update")
      .on("click", this._onUpdateHealth.bind(this));
  }
  private activateListenersFirstSecondRole(html: JQuery) {
    html.find(".health");
  }
  private activateListenersFirstRole(html: JQuery) {
    html.find(".health");
    html.find(".brigandyne-spell-add").on("click", this._onAddSpell.bind(this));
    html
      .find(".brigandyne-spell-delete")
      .on("click", this._onDeleteSpell.bind(this));
    html
      .find(".brigandyne-spell-move")
      .on("click", this._onMoveSpell.bind(this));
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

  private async _onUpdateXp(event: JQuery.ClickEvent) {
    event.preventDefault();
    const parent = event.currentTarget.parentElement;
    const input = parent.querySelector("input[name='xp']") as HTMLInputElement;
    const mult = parseInt(event.currentTarget.dataset.mult) ?? 0;
    const xp = parseInt(input.value) ?? 0;

    await (this.actor as BrigandyneActor).updateXp(mult * xp);
    this.render();
  }

  private async _onAddSpell(event: JQuery.ClickEvent) {
    event.preventDefault();
    const spell: Spell = {
      name: "",
      description: "",
      difficulty: 0,
      duration: 0,
      formula: "",
      range: 0,
      resistance: "-",
      type: spellTypes[0],
    };
    await (this.actor as BrigandyneActor).addSpell(spell);
    this.render();
  }

  private async _onDeleteSpell(event: JQuery.ClickEvent) {
    event.preventDefault();
    const spellId = parseInt(event.currentTarget.dataset.spell) ?? -1;
    await (this.actor as BrigandyneActor).deleteSpell(spellId);
    this.render();
  }

  private async _onMoveSpell(event: JQuery.ClickEvent) {
    event.preventDefault();
    const spellId = parseInt(event.currentTarget.dataset.spell) ?? -1;
    const direction = parseInt(event.currentTarget.dataset.direction) ?? 1;
    await (this.actor as BrigandyneActor).moveSpell(spellId, direction);
    this.render();
  }

  private async _onUpdateHealth(event: JQuery.ClickEvent) {
    event.preventDefault();
    const parent = event.currentTarget.parentElement;
    const input = parent.querySelector(
      "input[name='system.controllers.health']"
    ) as HTMLInputElement;
    const mult = parseInt(event.currentTarget.dataset.mult) ?? 0;
    const health = parseInt(input.value) ?? 0;
    await (this.actor as BrigandyneActor).updateHealth(mult * health);
    this.render();
  }

  private async _onUpdateComposure(event: JQuery.ClickEvent) {
    event.preventDefault();
    const parent = event.currentTarget.parentElement;
    const input = parent.querySelector(
      "input[name='system.controllers.composure']"
    ) as HTMLInputElement;
    const mult = parseInt(event.currentTarget.dataset.mult) ?? 0;
    const composure = parseInt(input.value) ?? 0;
    await (this.actor as BrigandyneActor).updateComposure(mult * composure);
    this.render();
  }
}
