// Do not remove this import. If you do Vite will think your styles are dead
// code and not include them in the build output.
import "../styles/style.scss";

import BrigandyneActorSheet from "./apps/sheets/BrigandyneActorSheet";

import { moduleId } from "./constants";
import { range } from "./handlebarsHelpers/range";
import { calculateAbility } from "./handlebarsHelpers/CalculateValues";
import { brigandyneActorSchema } from "./apps/schemas/BrigandyneActorSchema";
import BrigandyneActorDataModel from "./apps/datamodels/BrigandyneActorDataModel";
import BrigandyneActor from "./apps/documents/BrigandyneActor";
import { concat } from "./handlebarsHelpers/concat";
import { ternary } from "./handlebarsHelpers/ternary";
import { calculateVital } from "./handlebarsHelpers/CalculateVital";
import { calculateLine } from "./handlebarsHelpers/Vitals/calculateLine";
import { calculateComposure } from "./handlebarsHelpers/Vitals/calculateComposure";
import { calculateVitality } from "./handlebarsHelpers/Vitals/calculateVitality";
import { calculateInstability } from "./handlebarsHelpers/Vitals/calculateInstability";
import BrigandyneFirstRoleActorDataModel from "./apps/datamodels/BrigandyneFirstRoleActorDataModel";
import BrigandyneSecondRoleActorDataModel from "./apps/datamodels/BrigandyneSecondRoleActorDataModel";
import BrigandyneExtraActorDataModel from "./apps/datamodels/BrigandyneExtraActorDataModel";
import { tooltip } from "./handlebarsHelpers/tooltip";

declare global {
  interface DocumentClassConfig {
    Actor: typeof BrigandyneActor;
  }

  interface DataModelConfig {
    Actor: {
      character: typeof BrigandyneActorDataModel;
      firstrole: typeof BrigandyneFirstRoleActorDataModel;
      secondrole: typeof BrigandyneSecondRoleActorDataModel;
      extra: typeof BrigandyneExtraActorDataModel;
    };
  }

}

async function preloadTemplates(): Promise<any> {
  const templatePaths = [
    `systems/${moduleId}/templates/partials/actor/header.hbs`,
    `systems/${moduleId}/templates/partials/actor/headerNpc.hbs`,
    `systems/${moduleId}/templates/partials/actor/hpmpbar.hbs`,
    `systems/${moduleId}/templates/partials/actor/pannels/abilities.hbs`,
    `systems/${moduleId}/templates/partials/actor/pannels/inventory.hbs`,
    `systems/${moduleId}/templates/partials/actor/pannels/spells.hbs`,
    `systems/${moduleId}/templates/partials/actor/pannels/histo.hbs`,
    `systems/${moduleId}/templates/partials/actor/npc/extra/abilities.hbs`,
    `systems/${moduleId}/templates/partials/actor/npc/secondrole/abilities.hbs`,
    `systems/${moduleId}/templates/partials/actor/npc/firstrole/abilities.hbs`,
    `systems/${moduleId}/templates/partials/actor/npc/firstrole/spells.hbs`,
  ];

  return loadTemplates(templatePaths);
}

Hooks.once("init", () => {
  console.log(`Initializing ${moduleId}`);

  console.log("brigandyneActorSchema", brigandyneActorSchema);

  Handlebars.registerHelper("range", range);
  Handlebars.registerHelper("tooltip", tooltip);
  Handlebars.registerHelper("concat", concat);
  Handlebars.registerHelper("ternary", ternary);
  Handlebars.registerHelper("calculateAbility", calculateAbility);
  Handlebars.registerHelper("calculateVital", calculateVital);
  Handlebars.registerHelper("calculateVitality", calculateVitality);
  Handlebars.registerHelper("calculateLine", calculateLine);
  Handlebars.registerHelper("calculateComposure", calculateComposure);
  Handlebars.registerHelper("calculateInstability", calculateInstability);

  Handlebars.registerHelper("divide", function (a: number, b: number) {
    return a / b;
  });

  CONFIG.Actor.dataModels.character = BrigandyneActorDataModel;
  CONFIG.Actor.dataModels.firstrole = BrigandyneFirstRoleActorDataModel;
  CONFIG.Actor.dataModels.secondrole = BrigandyneSecondRoleActorDataModel;
  CONFIG.Actor.dataModels.extra = BrigandyneExtraActorDataModel;
  CONFIG.Actor.documentClass = BrigandyneActor;

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet(moduleId, BrigandyneActorSheet, { makeDefault: true });

  preloadTemplates();
});
