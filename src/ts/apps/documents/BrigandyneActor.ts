import {
  BrigandyneActorSystem,
  CaracModBaseCarr,
} from "../schemas/BrigandyneActorSchema";

import BrigandyneActorRollDialog from "../dialogs/BrigandyneRollDialog";
import { moduleId } from "../../constants";

export default class BrigandyneActor extends Actor {
  public constructor(data: any, context: any) {
    super(data, context);
  }

  public getAbilityValue(ability: CaracModBaseCarr) {
    return ability.base + ability.modificator + ability.carrier * 5;
  }

  public getAbilityValueById(abilityId: number) {
    return this.getAbilityValue(this.getAbility(abilityId));
  }

  public getAbility(id: number) {
    return (this.system as any as BrigandyneActorSystem).abilities[id];
  }

  public async rollDialog(abilityId: number) {
    const dialog = new BrigandyneActorRollDialog(this, abilityId);
    dialog.render(true);
  }

  public async rollAbility(
    abilityId: number,
    advantage: number,
    modificator: number
  ) {
    const ability = this.getAbility(abilityId);
    const value = this.getAbilityValue(ability) + modificator + advantage;
    const roll = await new Roll(`1d100`).roll();
    const success = roll.total <= value;
    const content = await renderTemplate(
      `systems/${moduleId}/templates/chat/roll.hbs`,
      {
        actor: this,
        ability: ability,
        base: this.getAbilityValue(ability),
        modificator: modificator,
        advantage: advantage,
        result: roll,
        limit: value,
        success: success,
      }
    );

    roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: content,
    });
  }

  public test() {
    return "test";
  }
}
