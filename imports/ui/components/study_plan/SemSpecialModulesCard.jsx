import React from 'react';
// Import React Components
import Module from './Module.jsx';
import VirtualizedSelect from 'react-virtualized-select';

import { insertOneModuleInSemester } from '../../../api/crud-controller/module/methods.js';
import { deleteOneModuleInSemester } from '../../../api/crud-controller/module/methods.js';
import { sendQuery } from '../../../api/searcher-controller/controller.js'

export default class SemSpecialModulesCard extends React.Component {
  constructor() {
      super();
  }

  /**
   * Handles the event when a module is added
   **/
  handleAddModule(moduleCode) {
    insertOneModuleInSemester(this.props.semesterIndex, moduleCode,  this.props.plannerID);
  }

  /**
   * Handles the event when a module is deleted
   */
  handleDeleteModule(moduleCode) {
    deleteOneModuleInSemester(this.props.semesterIndex, moduleCode, this.props.plannerID);
  }

  /**
   * Handles the event when a user selects a module code from the dropdown.
   * Even if the user presses Enter, an appropriate module code, the module
   * code sent by the server itself, will be added to the study plan.
   *
   * @param input {[String]}    User's input. Updates as the user types.
   * @param callback {[func]}    Callback to invoke once async call is done.
   */
  getModulesListFromDB(input, callback) {
    input = input.trim().toLowerCase();

    let fetchedListOfModulesFromDB = [];
    if (input.length !== 0) { // Only fetch if user typed in something
      // Get suggestions from modules DB which best matches input
      fetchedListOfModulesFromDB = sendQuery(input);
    }

    // Callback for an async call. This tells us we're done with the call,
    // and ready to pass VirtualizedSelect the search options to render
    callback(null, {
      options: fetchedListOfModulesFromDB,
      complete: true
    });
  }

  /**
   * Handles the event when a user selects a module code from the dropdown.
   * Even if the user presses Enter, an appropriate module code, the module
   * code sent by the server itself, will be added to the study plan.
   *
   * @param {[Object]}    Module object containing valid fields
   */
  handleSelectModuleCode(moduleObj) {
    if (moduleObj) {
      this.handleAddModule(moduleObj.moduleCode);
    }
  }

  render() {
    const specialSemModules = this.props.specialSemModules;

    return (
      <div className="card-grid-col">
				<article className="card-typical"
            style={{
              WebkitBoxShadow: '3px 3px 23px -6px rgba(0,0,0,0.35)',
              MozBoxShadow: '3px 3px 23px -6px rgba(0,0,0,0.35)',
              BoxShadow: '3px 3px 23px -6px rgba(0,0,0,0.35)'}}>
              <div className="card-typical-section card-typical-content"
                   style={{padding: '0.75em'}}>
                <div style={{paddingBottom: '0.75em'}}>
                  {/* Renders all modules from the user's study plan */}
                  {Object.keys(specialSemModules).map((moduleCode, index) => {
                    return <Module key={index} moduleCode={moduleCode}
                                   handleDeleteModule={
                                     this.handleDeleteModule.bind(this, moduleCode)} />;
                  })}
                </div>

                {/* Async Search bar to retrieve thousands of records  */}
                <VirtualizedSelect searchable async clearable={false}
                  labelKey="moduleCode" placeholder="Add a module..."
                  loadOptions={this.getModulesListFromDB.bind(this)}
                  onChange={this.handleSelectModuleCode.bind(this)} />

              </div>

					<div className="card-typical-section">
						<div className="card-typical-linked">
              {this.props.specialSem}
            </div>
					</div>

				</article>
			</div>
    );
  }
}

SemSpecialModulesCard.propTypes = {
  specialSem: React.PropTypes.string,
  specialSemModules: React.PropTypes.object
}