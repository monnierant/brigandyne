import { BrigandyneActorSystem } from "../schemas/BrigandyneActorSchema";

import { Spell, CaracModBaseCarr } from "../schemas/commonSchema";

import BrigandyneActorRollDialog from "../dialogs/BrigandyneRollDialog";
import { moduleId } from "../../constants";
import { StatHelpers } from "../helpers/StatHelpers";

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
    difficulty: number,
    modificator: number
  ) {
    const ability = this.getAbility(abilityId);
    const value =
      this.getAbilityValue(ability) + modificator + advantage + difficulty;
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
        difficulty: difficulty,
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

  public async updateXp(xp: number) {
    const syst: BrigandyneActorSystem = this
      .system as any as BrigandyneActorSystem;

    if (syst.experience.current + xp < 0) {
      return;
    }

    await this.update({
      system: {
        experience: {
          current: syst.experience.current + xp,
          total: Math.max(syst.experience.total + xp, syst.experience.total),
          spent: Math.max(
            syst.experience.spent + xp * -1,
            syst.experience.spent
          ),
        },
      },
    });
  }

  public async addSpell(spell: Spell) {
    const syst: BrigandyneActorSystem = this
      .system as any as BrigandyneActorSystem;

    await this.update({
      system: {
        spells: [...syst.spells, spell],
      },
    });
  }

  public async deleteSpell(spellId: number) {
    const syst: BrigandyneActorSystem = this
      .system as any as BrigandyneActorSystem;

    console.log("spellId", spellId);
    console.log(
      syst.spells.filter((spell: Spell, index: number) =>
        spell ? index !== spellId : true
      )
    );
    await this.update({
      system: {
        spells: syst.spells.filter((spell: Spell, index: number) =>
          spell ? index !== spellId : true
        ),
      },
    });
  }

  public async moveSpell(spellId: number, direction: number) {
    const syst: BrigandyneActorSystem = this
      .system as any as BrigandyneActorSystem;

    if (spellId + direction < 0 || spellId + direction >= syst.spells.length) {
      return;
    }

    let spells = [...syst.spells];
    const spell = spells[spellId];
    spells[spellId] = spells[spellId + direction];
    spells[spellId + direction] = spell;

    await this.update({
      system: { spells: spells },
    });
  }

  public async updateHealth(health: number) {
    const syst: BrigandyneActorSystem = this
      .system as any as BrigandyneActorSystem;

    const healthValue = Math.clamp(
      syst.health.current + health,
      0,
      StatHelpers.calculateActorHealth(this).max
    );

    await this.update({
      system: {
        controllers: { health: 1 },
        health: { current: healthValue },
      },
    });
  }

  public async updateComposure(composure: number) {
    const syst: BrigandyneActorSystem = this
      .system as any as BrigandyneActorSystem;

    const composureValue = Math.clamp(
      syst.composure.current + composure,
      0,
      StatHelpers.calculateActorComposure(this).max
    );

    await this.update({
      system: {
        controllers: { composure: 1 },
        composure: { current: composureValue },
      },
    });
  }
}
