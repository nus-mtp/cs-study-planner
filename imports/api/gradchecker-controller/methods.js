import { getStudentAcademicCohort,
         getStudentExemptedModules,
         getStudentWaivedModules } from '../database-controller/student/methods';
import { AY1617CSGradChecker } from '../logic/grad-checker/faculty/computing/computer-science/AY-1617/AY1617GradCheckerHandler.js';

export const getGraduationRequirements = function getGraduationRequirements(studentSemesters)  {
  // optional security check to see if studentplannerid can be found in the current user's planners
  const studentAcademicCohort = getStudentAcademicCohort();
  const studentExemptedModules = getStudentExemptedModules();
  const studentWaivedModules = getStudentWaivedModules();
  let graduationRequirements = {};

  // currently assumes only computing students
  switch (studentAcademicCohort)  {
    case 'AY 2016/2017':
    graduationRequirements = AY1617CSGradChecker(studentSemesters, studentAcademicCohort, studentExemptedModules, studentWaivedModules);
    break;
  }

  return graduationRequirements;
}
