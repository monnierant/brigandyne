// Do not remove this import. If you do Vite will think your styles are dead
// code and not include them in the build output.
import "../styles/style.scss";

// import DogBrowser from "./apps/dogBrowser";
import BrigandyneItemSheet from "./apps/sheets/BrigandyneItemSheet";
import BrigandyneActorSheet from "./apps/sheets/BrigandyneActorSheet";

import { moduleId } from "./constants";
import { range } from "./handlebarsHelpers/range";
import { calculateAbility } from "./handlebarsHelpers/CalculateValues";
// import brigandyneRoll from "./apps/rolls/cowboybebopRoll";
// import brigandyneResultRollMessageData from "./apps/messages/cowboybebopResultRollMessageData";
import { brigandyneActorSchema } from "./apps/schemas/BrigandyneActorSchema";
import BrigandyneActorDataModel from "./apps/datamodels/BrigandyneActorDataModel";
import BrigandyneActor from "./apps/documents/BrigandyneActor";
import { concat } from "./handlebarsHelpers/concat";

declare global {
  interface DocumentClassConfig {
    Actor: BrigandyneActor;
  }

  // interface DataModelConfig {
  //   Actor: {
  //     someActorSubtype: SomeActorSubtypeDataModel;
  //     anotherActorSubtype: AnotherActorSubtypeDataModel;
  //   };
  // }
}

async function preloadTemplates(): Promise<any> {
  const templatePaths = [
    `systems/${moduleId}/templates/partials/actor/header.hbs`,
    `systems/${moduleId}/templates/partials/actor/pannels/abilities.hbs`,
    `systems/${moduleId}/templates/partials/actor/pannels/inventory.hbs`,
    `systems/${moduleId}/templates/partials/actor/pannels/spells.hbs`,
    `systems/${moduleId}/templates/partials/actor/pannels/histo.hbs`,
  ];

  return loadTemplates(templatePaths);
}

Hooks.once("init", () => {
  console.log(`Initializing ${moduleId}`);

  console.log("brigandyneActorSchema", brigandyneActorSchema);

  Handlebars.registerHelper("range", range);
  Handlebars.registerHelper("concat", concat);
  Handlebars.registerHelper("calculateAbility", calculateAbility);

  Handlebars.registerHelper("divide", function (a: number, b: number) {
    return a / b;
  });

  CONFIG.Actor.dataModels.character = BrigandyneActorDataModel;
  CONFIG.Actor.documentClass = BrigandyneActor;
  // CONFIG.ChatMessage.dataModels.rollMessage = brigandyneResultRollMessageData;

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet(moduleId, BrigandyneItemSheet, { makeDefault: true });

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet(moduleId, BrigandyneActorSheet, { makeDefault: true });

  preloadTemplates();
});
