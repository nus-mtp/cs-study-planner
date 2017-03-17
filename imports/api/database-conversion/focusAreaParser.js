
import{ createNewFocusArea } from '../database-controller/focus-area/methods';
import{ findModuleAvailability } from '../database-controller/module/methods';

const focusAreaFile = "FocusArea.json"
//Load focus area text
const focusAreaJSON = JSON.parse(Assets.getText(focusAreaFile));

//remove all focus area document

//obtain data
const focusAreaData = focusAreaJSON["data"];
//go through array of data
for(var i = 0 ; i < focusAreaData.length; i++){
    let currentFocusArea = focusAreaData[i];
    let currentID = createNewFocusArea(currentFocusArea["name"],currentFocusArea["moduleListPrimary"],currentFocusArea["moduleListFourThousands"],currentFocusArea["moduleListElectives"]);
    console.log(currentFocusArea["name"] + ": " + JSON.stringify(currentID) );
}
