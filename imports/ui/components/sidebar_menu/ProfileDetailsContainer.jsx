import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { getStudentAcademicCohort,
         getStudentPreviousEducation,
         updateStudentAcademicCohort,
         updateStudentPreviousEducation } from '../../../api/profile/student/methods.js';
import { updateStudentPlannerAcademicYear} from '../../../api/student-logic-controller/crud-controller/planner/methods.js'
import InlineEdit from 'react-edit-inline';
import ProfileDetails from './ProfileDetails.jsx';
import Select from 'react-select';

const PREV_EDUCATION = [
  { label: 'Junior College', value:'jc' },
  { label: 'Polytechnic', value: 'poly' },
  { label: 'Others', value: 'others'}
]

const ACAD_COHORT = [
  { label: 'AY 2014/2015', value:'AY 2014/2015' },
  { label: 'AY 2015/2016', value:'AY 2015/2016' },
  { label: 'AY 2016/2017', value:'AY 2016/2017' }
]

getLabelFromValue = function(value){
  for(i in PREV_EDUCATION)
    if(PREV_EDUCATION[i].value === value)
     return PREV_EDUCATION[i].label;
  return "";
}

const updateAcademicCohort = function updateAcademicCohort(data) {
  updateStudentAcademicCohort(data);
  updateStudentPlannerAcademicYear(data);
}

export default ProfileDetailsContainer = createContainer((props) => {
  const studentInfoType = props.studentInfoType;
  const displayType = "header";
  var text = "no data";
  var onChange;

  switch(studentInfoType){
    case 'PrevEdu':
      info = getStudentPreviousEducation();
      text = getLabelFromValue(info);
      options = PREV_EDUCATION;
      onChange = function(data){
        updateStudentPreviousEducation(data.value)
      };
    break;
    case 'AcadCohort':
      info = getStudentAcademicCohort();
      text = info;
      options = ACAD_COHORT;
      onChange = function(data){
        updateAcademicCohort(data.value);
      };
    break;
  }

  return { displayType, info, text, options, onChange };

}, ProfileDetails);
