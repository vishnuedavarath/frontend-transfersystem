import React, { Component } from "react";
import { adminService } from "../../../../__services/adminService";
import "../../../../assets/password/css/password.css";

export default class UserPassword extends Component {
  constructor() {
    super();
    this.state = {
      penno: "",
      userId: "",
      userPenno: "",
      userName: "",
      newpassword: "",
      repassword: ""
    };
    this.handleSubmitUserSearch = this.handleSubmitUserSearch.bind(this);
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChangeUser(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmitUserSearch(e) {
    e.preventDefault();
    const { penno } = this.state;
    adminService.searchUser(penno).then(user => {
      this.setState({
        userName: user.user.name,
        userPenno: user.user.penno,
        userId: user.user._id
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    adminService.userPassword(this.state.userId, this.state.newpassword);
    window.location.reload(true);
  }
  render() {
    return (
      <div className="passwordMain">
        <header className="profileHeader">
          <h3 className="profileHeaderHead">Kerala Police</h3>
          <div className="profileRight">
            <span className="profileHeaderSpan">Hello, Admin&nbsp;&nbsp;</span>
            &nbsp;&nbsp;
            <button className="profileLogout" onClick={this.handleclickLogout}>
              Logout
            </button>
          </div>
        </header>
        <div className="passwordContent">
          <div className="passwordSearchDiv">
            <form onSubmit={this.handleSubmitUserSearch}>
              <input
                className="passwordInput"
                type="user"
                name="penno"
                value={this.state.penno}
                onChange={this.handleChangeUser}
              />
              <button className="passwordButton">Submit</button>
            </form>
          </div>
          <div className="passwordResults">
            {this.state.userId && (
              <div className="passwordResult">
                <span>PEN Number:{this.state.userPenno}</span>
                <br />
                <span>Name:{this.state.userName}</span>
                <br />
                <h3>Change Password</h3>
                <br />
                <form onSubmit={this.handleSubmit}>
                  <span>New Password:</span>
                  <br />
                  <input
                    className="passwordInput"
                    type="password"
                    name="newpassword"
                    value={this.state.newpassword}
                    onChange={this.handleChangeUser}
                  />
                  <br />
                  <span>Retype New Password:</span>
                  <br />
                  <input
                    className="passwordInput"
                    type="password"
                    name="repassword"
                    value={this.state.repassword}
                    onChange={this.handleChangeUser}
                  />
                  <br />
                  <button className = "passwordButton">Submit</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
