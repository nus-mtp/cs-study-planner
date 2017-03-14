import { Modules } from './module';
import { Meteor } from 'meteor/meteor';

// The following component handles the available method of interaction with the Module Collections
export const createNewModuleDocument = function createModuleDocument() {
}

export const addNewTermFromModuleDocument = function updateTermModule(moduleCode, newTermOffered) {
  const a = searchByModuleCode(moduleCode);
  const termArray = a.termOffered;

  termArray.push(newTermOffered);
  Modules.update({moduleCode: moduleCode},{$set: {termOffered: termArray}});
}

// to check if the reference to module collection has been made
export const isExistModuleCollection = function checkForCollection() {
  if (typeof Modules != 'undefined'){
    return true;
  }

  return false;
}


// This method try to find module in the collection by the moduleCode
export const searchByModuleCode = function retrieveMod(modCode) {
  const searchResult = Modules.findOne({ moduleCode: modCode });
  if (!searchResult) {
    return {};
  }

  const returnPackage = {
    moduleCode: searchResult.moduleCode,
    moduleID: searchResult._id,
    moduleMC: searchResult.moduleMC,
    moduleDescription: searchResult.moduleDescription
  };

  return returnPackage;
};

// This method finds all module codes with matching substring
export const searchByModuleCodeAndNameRegex = function searchByModuleCodeAndNameRegex(string) {
  // search by module code
  const searchResult =
    Modules.find({$or: [
                        { moduleCode: { $regex: string, $options: 'i' } },
                        { moduleName: { $regex: string, $options: 'i' } }
                       ]
                 }).fetch();

  const resultArray = [];
  // wrap into module name and id

  for (var i=0; i<searchResult.length; i++) {
    const returnPackage = {
      moduleCode: searchResult[i].moduleCode,
      moduleName: searchResult[i].moduleName,
      moduleID: searchResult[i]._id,
    };
    resultArray.push(returnPackage);
  }

  return resultArray;
};

// check if the collection of module is empty
export const isEmptyModuleCollection = function checkForAnyContent() {
  const searchResult = Modules.find({}).fetch();
  if (searchResult.length == 0) {
    return true;
  }
  return false;
};

export const removeAllModule = function removeAllModule() {
  return Modules.remove({});
};

// insert one new module collection to the Module Database
export const insertToModuleCollection = function insertToModuleCollection(object) {
  Modules.insert(object);
  // TO DO:return success/ failure message
};

export const retrieveAllModule = function findAll() {
  return Modules.find({}).fetch();
};
