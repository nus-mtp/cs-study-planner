import { GraduationRequirements } from './graduationRequirement';

const DEFAULT_MODULE_STATE = false;

/** This method handles the creation of new graduation requirement document. It takes in two arguments
  * @param {String} name: name of the graduation requirement
  * @param {[String]} listOfRequiredModule: list of module that will fulfill the gradRequirement.
  */
export const createNewGradRequirement = function(name, listOfAcadYear, listOfRequiredModule) {
  const moduleObject = createModuleListObject(listOfRequiredModule);

  const gradRequirement = {
    requirementName : name,
    requirementModules: moduleObject,
    academicYearList: listOfAcadYear
  }

  GraduationRequirements.insert(gradRequirement);
}

/** This method handles the creation of object list that is  going to be stored in the graduation Requirement Document
  * The module that is stored in the graduation requirement need to be present in the module database
  * @param {[String]} moduleList: list of module that is going to be stored
  */
export const createModuleListObject = function(moduleList) {
  // TO-DO: Check for module validity
  const moduleToBeStored = {};

  for (module in moduleList){
    moduleToBeStored[module] = DEFAULT_MODULE_STATE;
  }

  return moduleToBeStored;
}

/**
  * Retrieves requirement modules given graduation id and name of requirement
  * @param {string}   unique id of graduation requirement document
  * @param {string}   name of graduation requirement document
  * @return {Object}  object of mappedModuleName-boolean key-pair values
  */
export const getGradRequirementModules = function getGradRequirements(gradRequirementID, name) {
  return GraduationRequirements.findOne(gradRequirementID, {requirementName: name}).requirementModules;
}