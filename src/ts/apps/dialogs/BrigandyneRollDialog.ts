import { moduleId } from "../../constants";
import BrigandyneActor from "../documents/BrigandyneActor";

export default class BrigandyneActorRollDialog extends Dialog {
  // ========================================
  // Constructor
  // ========================================
  constructor(
    actor: BrigandyneActor,
    abilityId: number,
    options: any = {},
    data: any = {}
  ) {
    // Call the parent constructor

    const _options = {
      ...options,
      ...{
        title: "Roll",
        buttons: {
          rollButton: {
            label: "Roll",
            callback: (html: JQuery) => {
              console.log("Roll");
              this._onRoll(html);
            },
            icon: '<i class="fas fa-dice"></i>',
          },
          cancelButton: {
            label: "Cancel",
            icon: '<i class="fa-solid fa-ban"></i>',
          },
        },
      },
    };

    super(_options, data);

    // Set the actor
    this.actor = actor;
    this.abilityId = abilityId;
  }

  // ========================================
  // Properties
  // ========================================
  public actor: BrigandyneActor;
  public abilityId: number;
  // public roll: CowboyBebopRoll | undefined;

  // Define the template to use for this sheet
  override get template() {
    return `systems/${moduleId}/templates/dialog/roll.hbs`;
  }

  // Data to be passed to the template when rendering
  override getData() {
    let data: any = super.getData();
    data.actor = this.actor;
    data.ability = this.actor.getAbility(this.abilityId);
    return data;
  }

  // ========================================
  // Actions
  // ========================================
  // Roll the dice
  private async _onRoll(html: JQuery) {
    // Roll the dice
    let modificator =
      parseInt(
        html.find("#brigandyne-dialog-modifier-modificator").val() as string
      ) ?? 0;
    let difficulty =
      parseInt(
        html.find("#brigandyne-dialog-modifier-difficulty").val() as string
      ) ?? 0;
    let advantage =
      parseInt(
        html.find("#brigandyne-dialog-modifier-advantage").val() as string
      ) ?? 0;

    await this.actor.rollAbility(
      this.abilityId,
      isNaN(advantage) ? 0 : advantage,
      isNaN(difficulty) ? 0 : difficulty,
      isNaN(modificator) ? 0 : modificator
    );
  }
}
