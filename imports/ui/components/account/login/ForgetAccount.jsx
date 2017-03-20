import { Meteor } from 'meteor/meteor';
import React from 'react';

// Import success and error notifications
import { successMsgs } from '../AccountAlerts.js';
import { errorMsgs } from '../AccountAlerts.js';

// Import React components
import Button from '../../common/Button.jsx';

import { Accounts } from 'meteor/accounts-base';

//import verfification from '../../server/send-verification'
/*
 To delete accounts,
 1) meteor mongo
 2) db.users.remove({_id:db.users.find()[0]._id})
 */

export default class ForgetAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleReset() {
    Accounts.forgotPassword({
      email: this.state.email
    }, (error) => {
      if (error) {
        // Variety of errors when entering email
        Bert.alert(error.reason, 'danger');
      } else {
        let userName = this.state.email;

        user = Meteor.call('resetpassword', userName);
        console.log(user);

        Bert.alert(successMsgs.SUCCESS_NEW_PASSWORD_SENT, 'success');
        this.props.onSuccess();
      }
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="box-typical box-typical-padding" style={{textAlign: 'center'}}>

          <h5 className="m-t-lg">
            <p>Forgot your password?</p>
            <p><strong>Fill in your NUS E-mail below:</strong></p>
          </h5>

          <div className="form-group">
            <div className="form-group">
              <input className="form-control" type="text"
                placeholder="NUS E-mail" value={this.state.value}
                onChange={this.handleEmailChange.bind(this)} />
            </div>
            <div className='form-group'>
              <Button buttonClass="btn btn-rounded btn-inline btn-warning-outline"
                      buttonText="RESET PASSWORD"
                      onButtonClick={this.handleReset.bind(this)} />
            </div>
          </div>
        </div>
        <div className="box-typical box-typical-padding" style={{textAlign: 'center'}}>
          <h5 className="m-t-lg">
            <p>Received token from your email?</p>
            <p><strong>Fill in your token and new password below!:</strong></p>
          </h5>

          <div className="form-group">
            <div className="form-group">
              <input className="form-control" type="text"
                placeholder="Token" value={this.state.value}
                onChange={this.handleEmailChange.bind(this)} />
            </div>
            <div className="form-group">
              <input className="form-control" type="password"
                placeholder="Password" value={this.state.value}
                onChange={this.handleEmailChange.bind(this)} />
            </div>
            <div className="form-group">
              <input className="form-control" type="password"
                placeholder="Re-enter Password" value={this.state.value}
                onChange={this.handleEmailChange.bind(this)} />
            </div>
            <div className='form-group'>
              <Button buttonClass="btn btn-rounded btn-inline btn-warning-outline"
                      buttonText="RESET PASSWORD"
                      onButtonClick={this.handleReset.bind(this)} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}
