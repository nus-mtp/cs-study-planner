import { assert, expect } from 'meteor/practicalmeteor:chai';
import { GraduationRequirements} from './graduationRequirement';
import { createNewGradRequirement,
         getGradRequirementModules,
         getGradRequirementMCs } from './methods';

describe(" graduation requirement test", function() {
  const graduationName = ['Foundation', 'IT professionalism'];
  const foundationModuleList = ['CS1010', 'CS1020', 'CS1231', 'CS2105', 'CS2106', 'CS2100', 'CS2102','CS2010'];
  const ITProfModuleList = ['IS1103','CS2101', 'ES2660'];
  const storeID = [];
  const foundationRequirementMCs = 36;
  const ITRequirementMCs = 12;

  beforeEach( function() {
    if(Meteor.isServer){
      GraduationRequirements.remove({});
    }
    let result1 = createNewGradRequirement(graduationName[0], foundationModuleList, foundationRequirementMCs);
    storeID.push(result1);
    let result2 = createNewGradRequirement(graduationName[1], ITProfModuleList, ITRequirementMCs);
    storeID.push(result2);

    assert.equal(GraduationRequirements.find({}).fetch().length, 2);
  });

  afterEach( function() {

    for ( var i = 0; i < storeID.length; i++){
      GraduationRequirements.remove({_id:storeID[i]});
    }
    while(storeID.length > 0){
      storeID.pop();
    }
  });

  it('should not have an empty moduleListing', function() {
    const foundationList = GraduationRequirements.findOne({_id:storeID[0]});
    assert.equal(Object.keys(foundationList.requirementModules).length, foundationModuleList.length);
    const professionalList = GraduationRequirements.findOne({_id:storeID[1]});
    assert.equal(Object.keys(professionalList.requirementModules).length, ITProfModuleList.length);
  });

  it ('should return list of graduation requirement mapping', function()  {
    const gradRequirements = getGradRequirementModules(storeID);
    assert.equal(Object.keys(gradRequirements).length, storeID.length);
    assert.equal(Object.keys(gradRequirements[graduationName[0]]).length, foundationModuleList.length);
    assert.equal(Object.keys(gradRequirements[graduationName[1]]).length, ITProfModuleList.length);
  });

  it ('should return requirement MCS', function()  {
    const gradRequirementMCs = getGradRequirementMCs(storeID);
    assert.equal(Object.keys(gradRequirementMCs).length, storeID.length);
    assert.equal(gradRequirementMCs[graduationName[0]], foundationRequirementMCs);
    assert.equal(gradRequirementMCs[graduationName[1]], ITRequirementMCs);
  });
});
