import { Meteor } from 'meteor/meteor';
import React from 'react';

// Import success and error notifications
import { successMsgs,
         errorMsgs } from '../AccountAlerts.js'

// Import React components
var Loader = require('../../common/halogen/PulseLoader');
import Button from '../../common/Button.jsx';
import FormInput from '../../common/FormInput.jsx';
import FormInputErrorBox from '../../common/FormInputErrorBox.jsx';

export default class RegisterAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password:'',
      repassword:'',
      emailErrorObj: null,
      passwordErrorObj: null,
    };
  }

  //=============================================
  // EVENT HANDLERS
  //=============================================

  handleEmailChange(input) {
    this.setState({
      email: input,
      username: input
    });
  }

  handlePasswordChange(input) {
    this.setState({password: input});
  }

  handleRePasswordChange(input) {
    this.setState({repassword: input});
  }

  handleCloseLoader() {
    this.props.onLoadComplete();
  }

  /**
   * Handles a user sign up event.
   * Calls the appropriate method to register the user's NUS email and password
   * and sends the email verification letter to them..
   * Also displays appropriate alert messages.
   */
  handleSubmit(event) {
    // Prevent browser from refreshing the page, so that we can still see input validation alerts
    event.preventDefault();
    this.props.onSubmit();

    let user = {
      username: this.state.email,
      email: this.state.email,
      password: this.state.password,
      profile:  {
        hasSetup: false,
        accountLock: false
      }
    }

    Meteor.call('nusEmailVerifier', this.state.email, (emailErrorObj, validEmail) => {
      if (validEmail) {
        this.setState({ emailErrorObj: null });

        Meteor.call('nusPasswordVerifier',
                    this.state.password,
                    this.state.repassword,
                   (passwordErrorObj, isValidPassword) => {
          if (isValidPassword) {
            this.setState({ passwordErrorObj: null });

            Accounts.createUser(user, (error) => {
              if (error) {
                // Variety of Meteor Account errors when signing up
                if (error.reason == "Match failed") {
                  Bert.alert(errorMsgs.ERR_PASSWORD_NOT_ENTERED, 'danger');
                } else if (error.reason == "Incorrect password") {
                  Bert.alert(errorMsgs.ERR_INCORRECT_PASSWORD, 'danger');
                } else {
                  Bert.alert(error.reason, 'danger');
                }
                this.handleCloseLoader();
              } else {
                Meteor.call('sendVerificationLink', (error, response) => {
                  if (error) {
                    Bert.alert(error.reason, 'danger');
                    this.handleCloseLoader();
                  } else {
                    Bert.alert(successMsgs.SUCCESS_SIGNUP, 'success');
                    Meteor.logout();
                    this.props.onSuccess();
                  }
                });
              }
            });
          } else {
            // Prepare state for User Feedback for wrong password entered
            this.setState({ passwordErrorObj: passwordErrorObj.error });
            this.handleCloseLoader();
          }
        });
      } else {
        // Prepare state for User Feedback for wrong NUS E-mail entered
        this.setState({ emailErrorObj: emailErrorObj.error });
        this.handleCloseLoader();
      }
    });

  }

  /**
   * Renderer for NUS-email input validation
   *
   * @returns {Node} FormInputErrorBox component with the relevant error messages
   *                 passed into it
   */
  renderEmailErrorBlock() {
    let errorObj = this.state.emailErrorObj;
    let emailErrorMsgs = [];

    if (errorObj.incorrectDomain) {
      emailErrorMsgs.push(errorMsgs.ERR_EMAIL_ENTERED_INVALID_DOMAIN);
    }
    if (errorObj.incorrectFormat) {
      emailErrorMsgs.push(errorMsgs.ERR_EMAIL_ENTERED_INVALID_FORMAT);
    }

    return (
      <FormInputErrorBox
        title="NUS E-mail Errors" errorMsgList={emailErrorMsgs} />
    );
  }

  /**
   * Renderer for password input validation
   *
   * @returns {Node} FormInputErrorBox component with the relevant error messages
   *                 passed into it
   */
  renderPasswordErrorBlock() {
    let errorObj = this.state.passwordErrorObj;
    let passwordErrorMsgs = [];

    if (errorObj.hasNoLetter) {
      passwordErrorMsgs.push(errorMsgs.ERR_PASSWORDS_HAS_NO_LETTER);
    }
    if (errorObj.hasNoNumeric) {
      passwordErrorMsgs.push(errorMsgs.ERR_PASSWORDS_HAS_NO_NUMERIC);
    }
    if (errorObj.isNotMixCase) {
      passwordErrorMsgs.push(errorMsgs.ERR_PASSWORDS_IS_NOT_MIX_CASE);
    }
    if (errorObj.isLessThanSixChars) {
      passwordErrorMsgs.push(errorMsgs.ERR_PASSWORDS_TOO_SHORT);
    }
    if (errorObj.hasWhitespace) {
      passwordErrorMsgs.push(errorMsgs.ERR_PASSWORDS_HAS_WHITESPACE);
    }
    if (errorObj.passwordsNotMatch) {
      passwordErrorMsgs.push(errorMsgs.ERR_PASSWORDS_NOT_MATCH);
    }

    return (
      <FormInputErrorBox
        title="Password Errors" errorMsgList={passwordErrorMsgs} />
    );
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="box-typical box-typical-padding" style={{textAlign: 'center'}}>
          {/* Sign Up Heading */}
          <h4 className="m-t-lg">
            <strong>Sign Up for NUS Oracle</strong>
          </h4>

          <form className="form-group"
                onSubmit={this.handleSubmit.bind(this)}>
            {/* NUS Email Input Validation */}
            {this.state.emailErrorObj ? this.renderEmailErrorBlock() : null}

            <FormInput placeholder="NUS E-mail"
                       onChange={this.handleEmailChange.bind(this)} />

            {/* Password Input Validation */}
            {this.state.passwordErrorObj ? this.renderPasswordErrorBlock() : null}

            <FormInput type="password" placeholder="Password"
                       onChange={this.handlePasswordChange.bind(this)} />

            <FormInput type="password" placeholder="Re-enter Password"
                       onChange={this.handleRePasswordChange.bind(this)} />

            {/* Button Confirmation to Sign Up */}
            <Button buttonClass="btn btn-rounded btn-inline btn-warning-outline"
                    buttonText="SIGN UP"
                    onButtonClick={this.handleSubmit.bind(this)} />
          </form>

        </div>
      </div>
    );
  }
}
