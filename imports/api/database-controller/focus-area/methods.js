import { FocusArea } from './focusArea';
import { searchByModuleCode } from '../module/methods';


/** This Method handles the creation of new Focus Area Document
  *@param {String} name : Name of the Focus Area
  *@param {[String]} listOfPrimary: list of primary module in the focus area
  *@param {[String]} listOfFourThousands: list of level four thousand modules in the focus Area
  *@param {[String]} listOfNonPrimary: list of module that is related to the focus area but is not part of primary module
  *@return undefined
  *
  * In the process itself, the module will be filtered and check if the same modulecode actually
  * exists in the database. If not, the module will be removed from the lists.
  */
export const createNewFocusArea = function(name, listOfPrimary, listOfFourThousands, listOfNonPrimary){
  checkedListPrimary = consolidateModuleArrayValidity(listOfPrimary);
  checkedListFourThousands = consolidateModuleArrayValidity(listOfFourThousands);
  checkedListNonPrimary = consolidateModuleArrayValidity(listOfNonPrimary);

  const newFocusAreaObject = {
    name : name,
    moduleListPrimary : checkedListPrimary,
    moduleListFourThousands: checkedListFourThousands,
    moduleListNonPrimary: checkedListNonPrimary
  }

  FocusArea.insert(newFocusAreaObject);
}

/** This method handles the checking of the module validity.
  * For a module to be valid, it needs to be inside the module database
  * @param {String} moduleCode: Code of the module that is going to be included in the focus area document
  */
export const consolidateModuleCodeValidity = function(moduleCode) {
  const validationResult = searchByModuleCode(moduleCode);

  if (validationResult === {}){ return false;}
  return true;
}

/** This method handles the checking of the list of module validity.
  * For a module to be valid, it needs to be inside the module database
  * @param {[String]} moduleArray: array of module code that is going to be included in the focus area document
  */
export const consolidateModuleArrayValidity = function(moduleArray) {
  for (moduleCode in moduleArray){
    const isValidModule = consolidateModuleCodeValidity(moduleCode);

    if(!isValidModule){
      console.log('The following module cannot be found in database: ' + moduleCode);
      moduleIndex  = moduleArray.indexOf(moduleCode);
      moduleArray.splice(moduleIndex,1);
    }
  }
}
