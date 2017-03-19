import { createNewModuleFulfilment } from '../database-controller/module-fulfilment/methods';
import { ModuleFulfilments } from '../database-controller/module-fulfilment/moduleFulfilment';

export const populateModuleFulfilmentCollection = function() {

  if (Meteor.isServer){
    // remove data from ModuleFulfilment
    ModuleFulfilments.remove({});
    
    const ModuleFulfilmentFile = 'ModuleFulfilment.json';
    const ModuleFulfilmentJSON = JSON.parse(Assets.getText(ModuleFulfilmentFile));


    // obtain data from the json
    const moduleFulfilmentArray = ModuleFulfilmentJSON["data"];

    for (var i = 0; i < moduleFulfilmentArray.length ; i++) {
      let currentModuleFulfilment = moduleFulfilmentArray[i];
      let currentModuleName = moduleFulfilmentArray[i]["moduleCode"];
      let currentModuleMapping = currentModuleFulfilment["moduleMapping"];
      let currentModuleMappingKey = Object.keys(currentModuleMapping);

      for (var j = 0; j < currentModuleMappingKey.length; j++){
        createNewModuleFulfilment(currentModuleMappingKey[j], currentModuleName, currentModuleMapping[currentModuleMappingKey[j]]["moduleEquivalent"]);
      }
    }
  }
}
