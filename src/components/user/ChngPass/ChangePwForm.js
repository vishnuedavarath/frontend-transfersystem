import React, { Component } from "react";

import { connect } from "react-redux";

import { userActions } from "../../../__actions/userActions";
// require('../../../assets/changepass/css/chngpwform.css')
import styles from "../../../assets/changepass/css/chngpwform";

class ChangePwForm extends Component {
  constructor(props) {
    super(props);
    // console.log(this.state);
    this.state = {
      password: "",
      newPassword: "",
      rePassword: "",
      submitted: false
    };
    // console.log(this.state);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { password, newPassword, rePassword } = this.state;
    const { dispatch } = this.props;
    if (password && newPassword && rePassword) {
      dispatch(userActions.passchng(newPassword));
      // dispatch(userActions.getfirst());
    }
  }

  render() {
    console.log();
    const { password, newPassword, rePassword } = this.state;
    return (
      <div style={styles.ChngPgDiv1}>
        <div style = {styles.ChngPgDiv2}>
          <h1 style={styles.ChngPgH}>Change Password </h1><br/>
          <form
            name="form"
            styles={styles.ChngPgForm1}
            onSubmit={this.handleSubmit}
          >
            <div>
              {/* <label htmlFor="password">Current Password:</label> */}
              <input
                type="password"
                style={styles.ChngPgInput}
                name="password"
                value={password}
                placeholder = "Current Password"
                onChange={this.handleChange}
              />
            </div>

            <div>
              {/* <label htmlFor="newPassword">New Password</label> */}
              <input
                type="password"
                style={styles.ChngPgInput}
                name="newPassword"
                value={newPassword}
                placeholder = "New Password"
                onChange={this.handleChange}
              />
            </div>

            <div>
              {/* <label htmlFor="rePassword">Retype New Password</label> */}
              <input
                type="password"
                style={styles.ChngPgInput}
                name="rePassword"
                value={rePassword}
                placeholder = "Retype New Password"
                onChange={this.handleChange}
              />
            </div>

            <div>
              <button style = {styles.ChngPgButton}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingin } = state.authentication;
  return {
    loggingin
  };
}

export default connect(mapStateToProps)(ChangePwForm);
