import { assert, expect } from 'meteor/practicalmeteor:chai';
import { populateModuleFixture,
         dePopulateModuleFixture } from '../../../../../../../test-fixtures/modules';
import { populatePlannerFixture,
         dePopulatePlannerFixture } from '../../../../../../../test-fixtures/planner';
import { populateModuleFulfilmentFixture,
         dePopulateModuleFulfilmentFixture } from '../../../../../../../test-fixtures/moduleFulfilment';
import { populateGraduationRequirementsFixture,
         dePopulateGraduationRequirementsFixture } from '../../../../../../../test-fixtures/graduationRequirements';

import { getGradRequirementModules } from '../../../../../../../database-controller/graduation-requirement/methods';
import { getAllSemestersInPlanner } from '../../../../../../../crud-controller/semester/methods';

import { findITProfessionalismModules } from './methods';

describe('grad-checker-foundation', function()  {
  let plannerIDs = [];
  let graduationIDs = [];
  let fulfilmentIDs = [];

  beforeEach(function (done)  {
    populateModuleFixture();
    plannerIDs = populatePlannerFixture();
    graduationIDs = populateGraduationRequirementsFixture();
    fulfilmentIDs = populateModuleFulfilmentFixture();
    done();
  });

  afterEach(function (done) {
    dePopulateModuleFixture();
    dePopulatePlannerFixture(plannerIDs);
    dePopulateGraduationRequirementsFixture(graduationIDs);
    dePopulateModuleFulfilmentFixture(fulfilmentIDs);
    done();
  });

  it ('checks if find modules correct boolean values', function() {
    const modules = ['IS1103', 'CS2101', 'ES2660'];
    const academicCohort = 'AY 2016/2017';
    const requirementName = 'IT Professionalism';
    const allSemesters = getAllSemestersInPlanner(plannerIDs[2]);
    const ITProfessionalismModules = getGradRequirementModules(graduationIDs)[requirementName];

    const markedITProfessionalismModulesAndMCs = findITProfessionalismModules(academicCohort, allSemesters, ITProfessionalismModules, {}, {});
    assert.isTrue(markedITProfessionalismModulesAndMCs.markedITProfessionalismModules[modules[0]], 'IS1103 fulfiled');
    assert.isTrue(markedITProfessionalismModulesAndMCs.markedITProfessionalismModules[modules[1]], 'CS2101 fulfiled');
    assert.isFalse(markedITProfessionalismModulesAndMCs.markedITProfessionalismModules[modules[2]], 'ES2660 not fulfiled');

    assert.equal(markedITProfessionalismModulesAndMCs.totalModuleMCs, 8);
  })

});